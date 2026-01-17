import { useState, useEffect } from 'react';
import { ArrowRight, Building2, ChevronRight, Timer, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// --- TYPES ---
interface MCQ {
  question: string;
  options: string[];
  answer: string;
}

interface CompanyData {
  company: string;
  profile: string;
  questions: MCQ[]; 
  source: string;
}

// --- CONSTANTS ---
const CATEGORIES = ["Tech", "Management", "General"];

// UPDATED LOGOS: Using SimpleIcons for reliability (No more broken images)
const MOCK_TESTS_UI = [
  // --- TECH ---
  { 
<<<<<<< HEAD
    id: 'meta', company: 'Meta', role: 'Frontend Engineer', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/meta/0668E1', color: 'bg-blue-50'
  },
  { 
    id: 'amazon', company: 'Amazon', role: 'SDE / Data Analyst', category: 'Tech',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg', color: 'bg-orange-50'
  },
  { 
    id: 'apple', company: 'Apple', role: 'Software Engineer', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/apple/000000', color: 'bg-gray-50'
  },
  { 
    id: 'netflix', company: 'Netflix', role: 'Senior Engineer', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/netflix/E50914', color: 'bg-red-50'
  },
  { 
    id: 'google', company: 'Google', role: 'SDE Intern', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/google/4285F4', color: 'bg-green-50'
  },
  { 
    id: 'microsoft', company: 'Microsoft', role: 'Full Stack Engineer', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/microsoft/00A4EF', color: 'bg-blue-50'
  },
  { 
    id: 'adobe', company: 'Adobe', role: 'Product Developer', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/adobe/FF0000', color: 'bg-red-50'
  },
  { 
    id: 'uber', company: 'Uber', role: 'Backend Engineer', category: 'Tech',
    logo: 'https://cdn.simpleicons.org/uber/000000', color: 'bg-gray-50'
  },

  // --- MANAGEMENT ---
  { 
    id: 'mckinsey', company: 'McKinsey', role: 'Business Analyst', category: 'Management',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/McKinsey_%26_Company_Shield_Logo.svg', color: 'bg-blue-900'
  },
  { 
    id: 'bcg', company: 'BCG', role: 'Associate Consultant', category: 'Management',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Boston_Consulting_Group_2020_logo.svg', color: 'bg-green-50'
  },
  { 
    id: 'goldman', company: 'Goldman Sachs', role: 'Operations Analyst', category: 'Management',
    logo: 'https://cdn.simpleicons.org/goldmansachs/7399C6', color: 'bg-blue-50'
  },
  { 
    id: 'hul', company: 'HUL', role: 'Brand Manager', category: 'Management',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Hindustan_Unilever_Logo.svg/1200px-Hindustan_Unilever_Logo.svg.png', color: 'bg-blue-50'
  },
  { 
    id: 'pg', company: 'P&G', role: 'Supply Chain Manager', category: 'Management',
    logo: 'https://cdn.simpleicons.org/procterandgamble/00377A', color: 'bg-blue-100'
  },
  { 
    id: 'jpmorgan', company: 'JPMorgan', role: 'Financial Analyst', category: 'Management',
    logo: 'https://cdn.simpleicons.org/jpmorganchase/117ACA', color: 'bg-blue-50'
  },
  { 
    id: 'deloitte', company: 'Deloitte', role: 'Risk Advisory', category: 'Management',
    logo: 'https://cdn.simpleicons.org/deloitte/86BC25', color: 'bg-green-50'
  },
  { 
    id: 'reliance', company: 'Reliance', role: 'Management Trainee', category: 'Management',
    logo: 'https://upload.wikimedia.org/wikipedia/en/9/99/Reliance_Industries_Logo.svg', color: 'bg-red-50'
  },

  // --- GENERAL ---
  { 
    id: 'tcs', company: 'TCS', role: 'NQT / Ninja', category: 'General',
    logo: 'https://cdn.simpleicons.org/tata/5F68C3', color: 'bg-blue-50'
  },
  { 
    id: 'infosys', company: 'Infosys', role: 'System Engineer', category: 'General',
    logo: 'https://cdn.simpleicons.org/infosys/007CC3', color: 'bg-blue-50'
  },
  { 
    id: 'accenture', company: 'Accenture', role: 'Application Analyst', category: 'General',
    logo: 'https://cdn.simpleicons.org/accenture/A100FF', color: 'bg-purple-50'
  },
  { 
    id: 'wipro', company: 'Wipro', role: 'Project Engineer', category: 'General',
    logo: 'https://cdn.simpleicons.org/wipro/000000', color: 'bg-gray-50'
  },
  { 
    id: 'cognizant', company: 'Cognizant', role: 'GenC Developer', category: 'General',
    logo: 'https://cdn.simpleicons.org/cognizant/0033A0', color: 'bg-blue-50'
  },
  { 
    id: 'capgemini', company: 'Capgemini', role: 'Senior Analyst', category: 'General',
    logo: 'https://cdn.simpleicons.org/capgemini/0070AD', color: 'bg-blue-50'
  },
  { 
    id: 'sbi', company: 'SBI', role: 'Probationary Officer', category: 'General',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg', color: 'bg-blue-100'
  },
  { 
    id: 'ibm', company: 'IBM', role: 'Associate Developer', category: 'General',
    logo: 'https://cdn.simpleicons.org/ibm/052FAD', color: 'bg-blue-50'
=======
    id: 'meta', 
    company: 'Meta', 
    role: 'Frontend Engineer', 
    category: 'Tech',
    logo: 'https://cdn.simpleicons.org/meta/0668E1', 
    color: 'bg-blue-50 dark:bg-blue-500/10'
  },
  { 
    id: 'amazon', 
    company: 'Amazon', 
    role: 'SDE / Data Analyst', 
    category: 'Tech',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg', 
    color: 'bg-orange-50 dark:bg-orange-500/10'
  },
  { 
    id: 'apple', 
    company: 'Apple', 
    role: 'Software Engineer', 
    category: 'Tech',
    logo: 'https://cdn.simpleicons.org/apple/white', // Use white logo for better contrast or handle separately? The default black apple path might be hard to see on dark. Let's stick with specific icon or handle inversion. Using standard for now.
    // Actually simpleicons has hex. 000000. On dark mode that's invisible if transparency.
    // Let's use a conditional filter or just a different bg.
    color: 'bg-gray-50 dark:bg-gray-800/50'
  },
  { 
    id: 'netflix', 
    company: 'Netflix', 
    role: 'Senior Engineer', 
    category: 'Tech', 
    logo: 'https://cdn.simpleicons.org/netflix/E50914', 
    color: 'bg-red-50 dark:bg-red-500/10',
  },
  { 
    id: 'google', 
    company: 'Google', 
    role: 'SDE Intern', 
    category: 'Tech', 
    logo: 'https://cdn.simpleicons.org/google/4285F4', 
    color: 'bg-green-50 dark:bg-green-500/10',
>>>>>>> 83979d235bc88348ac26e27a53e2fc86c86b2e5d
  }
];

export const Upskill = () => {
  // --- STATE ---
  const [view, setView] = useState<'dashboard' | 'test' | 'result'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState("Tech");
  const [availableData, setAvailableData] = useState<CompanyData[]>([]);
  
  // Test Execution State
  const [activeTest, setActiveTest] = useState<CompanyData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [score, setScore] = useState(0);

  // --- 1. FETCH DATA ON LOAD ---
  useEffect(() => {
    fetch('http://localhost:5000/api/pyqs')
      .then(res => res.json())
      .then((data) => {
        console.log("✅ Questions Loaded:", data.length);
        setAvailableData(data);
      })
      .catch(err => console.error("❌ Failed to load questions. Is backend running?", err));
  }, []);

  // --- 2. TIMER LOGIC ---
  useEffect(() => {
    if (view === 'test' && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && view === 'test') {
      handleSubmitTest();
    }
  }, [view, timeLeft]);

  // --- HANDLERS ---
  const handleStartTest = (companyName: string) => {
    // Check if we have data for this company
    const foundData = availableData.find(d => 
      d.company.toLowerCase().includes(companyName.toLowerCase()) || 
      companyName.toLowerCase().includes(d.company.toLowerCase())
    );

    if (!foundData) {
      toast.error(`Questions not found for ${companyName}`, {
        description: "Please run 'python scripts/scraper.py' in the backend first.",
      });
      return;
    }

    if (!foundData.questions || foundData.questions.length === 0) {
      toast.error(`Empty data for ${companyName}`, {
        description: "The scraper found no questions. Try running it again.",
      });
      return;
    }

    setActiveTest(foundData);
    setView('test');
    setTimeLeft(900);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    toast.success(`Started ${companyName} Assessment`);
  };

  const handleAnswerSelect = (option: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;
    let calcScore = 0;
    activeTest.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) calcScore++;
    });
    setScore(calcScore);
    setView('result');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- RENDER: RESULTS VIEW ---
  if (view === 'result' && activeTest) {
    const percentage = Math.round((score / activeTest.questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto p-8 animate-fade-in text-center min-h-[60vh] flex flex-col justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="mb-6 flex justify-center">
            {percentage >= 70 ? (
              <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
            ) : (
              <AlertCircle className="w-24 h-24 text-orange-500" />
            )}
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Test Completed!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-xl">
            You scored <span className="font-bold text-slate-900 dark:text-white">{score}</span> out of <span className="font-bold text-slate-900 dark:text-white">{activeTest.questions.length}</span>
          </p>
          
          <div className="flex justify-center gap-4">
             <Button size="lg" onClick={() => setView('dashboard')} className="rounded-full px-8">
               Back to Dashboard
             </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: TEST VIEW ---
  if (view === 'test' && activeTest) {
    const currentQ = activeTest.questions[currentQuestionIndex];
    return (
      <div className="max-w-5xl mx-auto p-6 animate-fade-in flex flex-col h-[calc(100vh-100px)]">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{activeTest.company} Assessment</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
              <span>Question {currentQuestionIndex + 1} of {activeTest.questions.length}</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${timeLeft < 60 ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 mb-6 overflow-y-auto">
          <h3 className="text-2xl font-medium text-slate-800 dark:text-white mb-8 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option, idx) => {
               const isSelected = userAnswers[currentQuestionIndex] === option;
               return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  className={`
                    p-5 text-left rounded-xl border-2 transition-all duration-200 flex items-center group relative overflow-hidden
                    ${isSelected 
                      ? 'border-primary bg-primary/5 dark:bg-primary/20 shadow-md' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center mr-5 font-bold text-sm shrink-0 transition-colors
                    ${isSelected 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 group-hover:border-slate-400 dark:group-hover:border-slate-500'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg ${isSelected ? 'font-medium text-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="text-slate-500 dark:text-slate-400"
            >
              Previous
            </Button>

            {currentQuestionIndex === activeTest.questions.length - 1 ? (
              <Button size="lg" onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700 px-10 rounded-full">
                Submit Test
              </Button>
            ) : (
              <Button size="lg" onClick={() => setCurrentQuestionIndex(prev => prev + 1)} className="px-10 rounded-full">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD VIEW (Default) ---
  const filteredTests = selectedCategory === "All" 
    ? MOCK_TESTS_UI 
    : MOCK_TESTS_UI.filter(test => test.category === selectedCategory || selectedCategory === "All"); // Fix for "Tech" default

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10 p-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-l-4 border-primary pl-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2 text-slate-900 dark:text-white">Company Mock Tests</h1>
          <p className="text-muted-foreground text-lg">Unlock 360° prep with realistic, AI-powered mock exams.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${availableData.length > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${availableData.length > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              {availableData.length > 0 ? "System Online" : "Backend Offline"}
           </div>
           <Button variant="outline" className="rounded-full" onClick={() => window.location.reload()}>
             <RefreshCw className="w-4 h-4 mr-2" /> Refresh
           </Button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3">
        {["Tech", "Management", "General", "All"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border
              ${selectedCategory === category 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md transform scale-105" 
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTests.map((test) => (
          <div 
            key={test.id} 
            className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[320px] backdrop-blur-sm"
          >
            {/* Logo Area */}
            <div className={`h-32 rounded-xl ${test.color} flex items-center justify-center mb-4 relative overflow-hidden transition-colors`}>
               <div className="absolute w-24 h-24 bg-white/50 dark:bg-white/5 rounded-full blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
               <img 
                 src={test.logo} 
                 alt={`${test.company} Logo`} 
                 className={`w-16 h-16 object-contain relative z-10 ${test.id === 'apple' ? 'dark:invert' : ''}`}
               />
            </div>

            {/* Text Content */}
            <div className="space-y-1 mb-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                {test.role}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {test.company}
              </p>
            </div>

            {/* Button */}
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-slate-300 dark:border-slate-700 hover:bg-slate-900 dark:hover:bg-primary hover:text-white hover:border-slate-900 dark:hover:border-primary transition-all group-hover:shadow-lg dark:bg-transparent dark:text-slate-300"
              onClick={() => handleStartTest(test.company)}
            >
              Start Test
            </Button>
          </div>
        ))}
        
        {/* Next Arrow */}
        <div className="hidden lg:flex items-center justify-center">
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary hover:scale-110 transition-all">
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};

// import { useState } from 'react';
// import { ArrowRight, Building2, Code, Briefcase, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';

// // 1. Define the Categories based on your image
// const CATEGORIES = ["Tech", "Management", "General"];

// // 2. Create Mock Data for the Companies (TCS, Infosys, Wipro, Accenture)
// const MOCK_TESTS = [
//   {
//     id: 'meta', 
//     company: 'Meta', 
//     role: 'Frontend Engineer', 
//     category: 'Tech',
//     logo: 'https://logo.clearbit.com/meta.com', 
//     color: 'bg-blue-50'
//   },
//   {
//     id: 'amazon', 
//     company: 'Amazon', 
//     role: 'SDE / Data Analyst', 
//     logo: 'https://logo.clearbit.com/amazon.com', 
//     category: 'Tech',
//     color: 'bg-orange-50'
//   },
//   {
//     id: 'apple', 
//     company: 'Apple', 
//     role: 'Software Engineer', 
//     logo: 'https://logo.clearbit.com/apple.com', 
//     category: 'Tech',
//     color: 'bg-gray-50'
//   },
//   {
//     id: 'netflix', 
//     company: 'Netflix', 
//     role: 'Senior Engineer', 
//     logo: 'https://logo.clearbit.com/netflix.com', 
//     color: 'bg-red-50',
//     category: 'Management'
//   },
//   // Added a management example to make filters work
//   {
//     id: 'google', 
//     company: 'Google', 
//     role: 'SDE Intern', 
//     logo: 'https://logo.clearbit.com/google.com', 
//     color: 'bg-green-50',
//     category: 'Management'
//   }
// ];

// export const Upskill = () => {
//   const [selectedCategory, setSelectedCategory] = useState("Tech");

//   // Filter logic
//   const filteredTests = selectedCategory === "All" 
//     ? MOCK_TESTS 
//     : MOCK_TESTS.filter(test => test.category === selectedCategory);

//   const handleStartTest = (company: string, role: string) => {
//     toast.success(`Starting Assessment`, {
//       description: `Launching mock test for ${company} - ${role}`,
//     });
//     // Navigate to actual test page logic here later
//   };

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10 p-6">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-l-4 border-primary pl-4">
//         <div>
//           <h1 className="font-display text-3xl font-bold mb-2 text-slate-900">Company Mock Tests</h1>
//           <p className="text-muted-foreground text-lg">Unlock 360° prep with realistic, AI-powered mock exams.</p>
//         </div>
//         <Button variant="outline" className="gap-2 text-blue-600 rounded-full hover:bg-blue-50">
//           View All <ArrowRight className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* Category Pills */}
//       <div className="flex flex-wrap gap-3">
//         {CATEGORIES.map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             className={`
//               px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border
//               ${selectedCategory === category 
//                 ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105" 
//                 : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"}
//             `}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredTests.length > 0 ? (
//           filteredTests.map((test) => (
//             <div 
//               key={test.id} 
//               className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[320px]"
//             >
//               {/* Logo Area */}
//               <div className={`h-32 rounded-xl ${test.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
//                  {/* Decorative background circle */}
//                  <div className="absolute w-24 h-24 bg-white/50 rounded-full blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                 
//                  <img 
//                    src={test.logo} 
//                    alt={`${test.company} Logo`} 
//                    className="w-16 h-16 object-contain relative z-10 mix-blend-multiply"
//                    onError={(e) => {
//                      // Fallback if logo fails
//                      (e.target as HTMLImageElement).style.display = 'none';
//                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
//                    }}
//                  />
//                  <Building2 className="w-10 h-10 text-slate-400 hidden" />
//               </div>

//               {/* Text Content */}
//               <div className="space-y-1 mb-6">
//                 <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-primary transition-colors">
//                   {test.role}
//                 </h3>
//                 <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
//                   {test.company}
//                 </p>
//               </div>

//               {/* Button */}
//               <Button 
//                 variant="outline" 
//                 className="w-full rounded-xl border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all group-hover:shadow-lg"
//                 onClick={() => handleStartTest(test.company, test.role)}
//               >
//                 Start Test
//               </Button>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full py-12 text-center text-muted-foreground bg-slate-50 rounded-2xl border border-dashed border-slate-300">
//             <div className="flex justify-center mb-4">
//                <Briefcase className="w-10 h-10 text-slate-300" />
//             </div>
//             <p>No mock tests found for this category yet.</p>
//           </div>
//         )}

//         {/* "Next" Arrow Card (Visual cue from your design) */}
//         <div className="hidden lg:flex items-center justify-center">
//             <button className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:scale-110 transition-all">
//                 <ChevronRight className="w-6 h-6" />
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { useState } from 'react';
// import { BookOpen, Video, Globe, Award, TrendingUp, PlayCircle, Filter } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';

// const SKILL_PATHS = [
//   // Technology
//   {
//     title: 'Advanced React Patterns',
//     category: 'Technology',
//     subcategory: 'Frontend Development',
//     progress: 45,
//     modules: 12,
//     difficulty: 'Advanced',
//     color: 'from-blue-500 to-cyan-500'
//   },
//   {
//     title: 'System Design for Interviews',
//     category: 'Technology',
//     subcategory: 'Architecture',
//     progress: 10,
//     modules: 8,
//     difficulty: 'Intermediate',
//     color: 'from-orange-500 to-amber-500'
//   },
//   // Business
//   {
//     title: 'Digital Marketing Mastery',
//     category: 'Business',
//     subcategory: 'Marketing',
//     progress: 0,
//     modules: 20,
//     difficulty: 'Beginner',
//     color: 'from-emerald-500 to-green-500'
//   },
//   {
//     title: 'Agile Project Management',
//     category: 'Business',
//     subcategory: 'Management',
//     progress: 0,
//     modules: 10,
//     difficulty: 'Intermediate',
//     color: 'from-slate-500 to-zinc-500'
//   },
//   // Design
//   {
//     title: 'UI/UX Design Fundamentals',
//     category: 'Design',
//     subcategory: 'Product Design',
//     progress: 5,
//     modules: 15,
//     difficulty: 'Beginner',
//     color: 'from-pink-500 to-rose-500'
//   },
//   {
//     title: 'Motion Graphics with After Effects',
//     category: 'Design',
//     subcategory: 'Animation',
//     progress: 0,
//     modules: 18,
//     difficulty: 'Intermediate',
//     color: 'from-purple-500 to-violet-500'
//   },
//    // Finance
//   {
//     title: 'Financial Modeling & Valuation',
//     category: 'Finance',
//     subcategory: 'Analysis',
//     progress: 0,
//     modules: 14,
//     difficulty: 'Advanced',
//     color: 'from-yellow-500 to-amber-500'
//   }
// ];

// const RESOURCES = [
//   {
//     type: 'Video Course',
//     title: 'Understanding Next.js App Router',
//     provider: 'YuvaSetu Academy',
//     duration: '2h 15m',
//     icon: Video,
//     image: 'https://cdn.dribbble.com/users/5031392/screenshots/15467520/media/c36b3b15b25b1e190d081f954363401c.png?resize=400x300&vertical=center'
//   },
//   {
//     type: 'Article',
//     title: 'Top 50 Frontend Interview Challenges',
//     provider: 'DevResources',
//     duration: '15 min read',
//     icon: BookOpen,
//      image: 'https://cdn.dribbble.com/users/1355613/screenshots/15462768/media/682b1897c558c704f5e884170e5b7c7b.png?resize=400x300&vertical=center'
//   },
//   {
//     type: 'Interactive',
//     title: 'Accessibility(A11y) Masterclass',
//     provider: 'WebStandards',
//     duration: '4h Course',
//     icon: Globe,
//      image: 'https://cdn.dribbble.com/users/1615584/screenshots/15414341/media/06771d9d448625db164536761d763806.jpg?resize=400x300&vertical=center'
//   }
// ];

// const CATEGORIES = ["All", "Technology", "Business", "Design", "Finance"];

// export const Upskill = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const filteredPaths = selectedCategory === "All" 
//     ? SKILL_PATHS 
//     : SKILL_PATHS.filter(path => path.category === selectedCategory);

//   const handleEnroll = (courseTitle: string) => {
//     toast.success("Enrolled Successfully!", {
//       description: `You have started the course: ${courseTitle}`,
//       duration: 3000,
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10">
//       <div className="flex flex-col md:flex-row justify-between items-end gap-4">
//         <div>
//           <h1 className="font-display text-3xl font-bold mb-2">Upskill & Grow</h1>
//           <p className="text-muted-foreground">Recommended learning paths to boost your profile match.</p>
//         </div>
//       </div>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-2">
//         {CATEGORIES.map((category) => (
//           <Button
//             key={category}
//             variant={selectedCategory === category ? "default" : "outline"}
//             onClick={() => setSelectedCategory(category)}
//             className="rounded-full"
//           >
//             {category}
//           </Button>
//         ))}
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {filteredPaths.map((path) => (
//           <div key={path.title} className="relative group overflow-hidden bg-card border border-border rounded-2xl p-6 transition-all hover:shadow-card flex flex-col justify-between h-full">
//             <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${path.color} opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />
            
//             <div>
//               <div className="flex justify-between items-start mb-4">
//                 <Badge variant="outline">{path.difficulty}</Badge>
//                 <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center text-white shadow-lg`}>
//                   <TrendingUp className="w-5 h-5" />
//                 </div>
//               </div>

//               <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
//               <p className="text-sm text-muted-foreground mb-4">{path.subcategory} • {path.modules} Modules</p>

//               <div className="space-y-2 mb-6">
//                 <div className="flex justify-between text-xs">
//                   <span className="font-medium">{path.progress > 0 ? `${path.progress}% Completed` : 'Not Started'}</span>
//                 </div>
//                 <Progress value={path.progress} className="h-2" />
//               </div>
//             </div>

//             <div className="pt-4 border-t border-border flex justify-between items-center mt-auto">
//               <Button 
//                 size="sm" 
//                 variant={path.progress > 0 ? "secondary" : "outline"} 
//                 className="w-full"
//                 onClick={() => handleEnroll(path.title)}
//               >
//                 {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="font-bold text-2xl pt-4">Featured Resources</h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {RESOURCES.map((resource) => (
//           <div key={resource.title} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
//              <div className="h-40 bg-muted overflow-hidden relative">
//                <img src={resource.image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
//                   <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
//                </div>
//              </div>
//              <div className="p-5 space-y-3">
//                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
//                  <resource.icon className="w-3 h-3" />
//                  {resource.type}
//                </div>
//                <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">{resource.title}</h3>
//                <div className="flex justify-between text-sm text-muted-foreground pt-2">
//                  <span>{resource.provider}</span>
//                  <span>{resource.duration}</span>
//                </div>
//              </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

