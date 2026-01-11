// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import path from 'path';

// // Load env vars
// dotenv.config({ path: path.join(__dirname, '../.env') });

// import { connectDB } from './config/db';
// import authRoutes from './routes/auth.routes';
// import protectedRoutes from './routes/protected.routes';
// import jobSeekerRoutes from './routes/jobSeeker.routes';
// import uploadRoutes from './routes/upload.routes';
// import ondemandRoutes from './routes/ondemand.routes';
// import employerRoutes from './routes/employer.routes';
// import jobRoutes from './routes/job.routes';
// import recommendationRoutes from './routes/recommendation.routes';

// import { createServer } from 'http';
// import { socketService } from './services/socket.service';

// // Connect to MongoDB
// connectDB();

// const app = express();
// const httpServer = createServer(app); // Wrap express
// const PORT = process.env.PORT || 5000;

// // Init Socket.io
// socketService.init(httpServer);

// // Middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Serve Static Files
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/auth', authRoutes);
// app.use('/api', protectedRoutes);
// app.use('/api/job-seeker', jobSeekerRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/ondemand', ondemandRoutes);
// app.use('/api/employer', employerRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/recommendations', recommendationRoutes);

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// httpServer.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs'; // <--- Added this import

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';
import jobSeekerRoutes from './routes/jobSeeker.routes';
import uploadRoutes from './routes/upload.routes';
import ondemandRoutes from './routes/ondemand.routes';
import employerRoutes from './routes/employer.routes';
import jobRoutes from './routes/job.routes';
import recommendationRoutes from './routes/recommendation.routes';

import { createServer } from 'http';
import { socketService } from './services/socket.service';

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app); // Wrap express
const PORT = process.env.PORT || 5000;

// Init Socket.io
socketService.init(httpServer);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve Static Files
app.use('/uploads', express.static('uploads'));

// --- NEW PUBLIC ROUTE FOR QUESTIONS ---
// This must be BEFORE the 'protectedRoutes' so it stays public
app.get('/api/pyqs', (req, res) => {
    try {
        // Locate the file in backend/data/faang_questions.json
        const filePath = path.join(process.cwd(), 'data', 'faang_questions.json');
        
        console.log("📂 Serving questions from:", filePath);

        if (!fs.existsSync(filePath)) {
            console.error("❌ File not found at:", filePath);
            return res.status(404).json({ error: "Questions file not found" });
        }

        const fileData = fs.readFileSync(filePath, 'utf8');
        const questions = JSON.parse(fileData);
        
        res.status(200).json(questions);
    } catch (error) {
        console.error("❌ Error serving questions:", error);
        res.status(500).json({ error: "Failed to load questions" });
    }
});
// --------------------------------------

// Routes
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/job-seeker', jobSeekerRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ondemand', ondemandRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});