import os
import json
import time
from crewai import Agent, Task, Crew, LLM
from crewai_tools import ScrapeWebsiteTool
from dotenv import load_dotenv
from pymongo import MongoClient

# 1. LOAD KEYS
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# 2. SETUP GEMINI (Using the alias valid for your account)
# We changed this from "gemini-1.5-flash" to "gemini-flash-latest"
my_llm = LLM(
    model="gemini/gemini-flash-latest",
    api_key=os.getenv("GOOGLE_API_KEY")
)

# Setup MongoDB
mongo_uri = os.getenv("MONGODB_URI")
if not mongo_uri:
    raise ValueError("MONGODB_URI not found in environment variables")

try:
    client = MongoClient(mongo_uri)
    # Explicitly use 'brainwave' database since URI doesn't specify one
    db = client["brainwave"] 
    collection = db["mocktest_data"]
    print("✅ Connected to MongoDB. Database: brainwave, Collection: mocktest_data")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")
    exit(1)

# 3. TARGETS
# netflix: https://www.simplilearn.com/netflix-interview-questions-article
targets = [
    {"company": "Meta", "profile": "Frontend Engineer", "url": "https://www.geeksforgeeks.org/meta-interview-questions/"},
    {"company": "Amazon", "profile": "SDE / Data Analyst", "url": "https://www.simplilearn.com/tutorials/data-analytics-tutorial/amazon-data-analyst-interview-questions"},
    {"company": "Apple", "profile": "Software Engineer", "url": "https://www.geeksforgeeks.org/apple-interview-questions/"},
    {"company": "Netflix", "profile": "Senior Software Engineer", "url": "https://www.simplilearn.com/netflix-interview-questions-article"},
    {"company": "Google", "profile": "SDE Intern", "url": "https://www.geeksforgeeks.org/top-25-interview-questions-for-google-sde-internship/"}
]

print(f"🚀 Starting PATIENT AI Scraper (Agent Mode)...")
print(f"ℹ️  Note: This will take a few minutes to avoid hitting API limits.")

for i, target in enumerate(targets):
    print(f"\n------------------------------------------------")
    print(f"[{i+1}/{len(targets)}] Agent working on: {target['company']}...")
    
    success = False
    attempts = 0
    
    # Retry Loop: If 429 error happens, wait and try again
    while not success and attempts < 3:
        try:
            scrape_tool = ScrapeWebsiteTool(website_url=target['url'])

            # The Agent
            extractor = Agent(
                role='Technical Interview Creator',
                goal='Extract exactly 15 MCQs from the webpage.',
                backstory='You are an expert recruiter who creates precise JSON datasets.',
                tools=[scrape_tool],
                llm=my_llm,
                verbose=False
            )

            # The Task
            task = Task(
                description=f"""
                Read {target['url']}.
                Create exactly 15 Multiple Choice Questions (MCQs).
                
                STRICT JSON OUTPUT RULES:
                1. Return ONLY a raw JSON list.
                2. No markdown, no '```json', just the list.
                3. Structure: [{{ "question": "...", "options": ["A","B","C","D"], "answer": "..." }}]
                """,
                expected_output='A raw JSON list of 15 MCQs.',
                agent=extractor
            )

            crew = Crew(agents=[extractor], tasks=[task])
            result = crew.kickoff()

            # Clean & Parse
            raw_text = str(result).replace("```json", "").replace("```", "").strip()
            # Try to fix common JSON errors if agent added extra text
            if raw_text.startswith("Here is"): 
                start_index = raw_text.find("[")
                if start_index != -1:
                    raw_text = raw_text[start_index:]
            
            parsed_questions = json.loads(raw_text)

            data_entry = {
                "company": target['company'],
                "profile": target['profile'],
                "questions": parsed_questions,
                "source": target['url'],
                "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            
            # Insert into MongoDB
            collection.insert_one(data_entry)
            
            print(f"✅ Success! Extracted {len(parsed_questions)} questions and saved to MongoDB.")
            success = True

        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "Resource exhausted" in error_msg:
                print(f"⚠️  Rate Limit Hit (429). Cooling down for 60 seconds...")
                time.sleep(60) # Wait 1 minute before retrying
                attempts += 1
            elif "404" in error_msg:
                 print(f"❌ Model Not Found Error: {e}")
                 break
            else:
                print(f"❌ Error: {e}")
                break # Non-limit error, skip to next company

    # Safety Pause between companies even on success
    if i < len(targets) - 1:
        print("⏳ Pausing 20s for API safety...")
        time.sleep(20)

print(f"\n🎉 ALL DONE! Data saved to MongoDB collection 'mocktest_data'")



# import os
# import json
# import time
# from crewai import Agent, Task, Crew, LLM
# from crewai_tools import ScrapeWebsiteTool
# from dotenv import load_dotenv

# # 1. LOAD KEYS
# load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# # 2. SETUP GEMINI
# # We use the "Lite" preview model which often has better rate limits than 2.5
# my_llm = LLM(
#     model="gemini/gemini-2.0-flash-lite-preview-02-05",
#     api_key=os.getenv("GOOGLE_API_KEY")
# )

# # 3. FAANG TARGET LINKS
# targets = [
#     {
#         "company": "Meta",
#         "profile": "Frontend Engineer",
#         "url": "https://www.geeksforgeeks.org/meta-interview-questions/"
#     },
#     {
#         "company": "Amazon",
#         "profile": "SDE / Data Analyst",
#         "url": "https://www.simplilearn.com/tutorials/data-analytics-tutorial/amazon-data-analyst-interview-questions"
#     },
#     {
#         "company": "Apple",
#         "profile": "Software Engineer",
#         "url": "https://www.geeksforgeeks.org/apple-interview-questions/"
#     },
#     {
#         "company": "Netflix",
#         "profile": "Senior Software Engineer",
#         "url": "https://www.simplilearn.com/netflix-interview-questions-article"
#     },
#     {
#         "company": "Google",
#         "profile": "SDE Intern",
#         "url": "https://www.geeksforgeeks.org/top-25-interview-questions-for-google-sde-internship/"
#     }
# ]

# # Path to save data
# current_dir = os.path.dirname(os.path.abspath(__file__))
# output_file_path = os.path.join(current_dir, '../data/faang_questions.json')

# all_data = []

# print(f"🚀 Starting AI Scraper (With rate-limit protection)...")

# for i, target in enumerate(targets):
#     print(f"\n[{i+1}/{len(targets)}] Processing: {target['company']}...")
    
#     try:
#         scrape_tool = ScrapeWebsiteTool(website_url=target['url'])

#         # Agent
#         extractor = Agent(
#             role='Technical Exam Creator',
#             goal='Create challenging multiple-choice quizzes.',
#             backstory='You are an expert at converting technical interview topics into Multiple Choice Questions (MCQs).',
#             tools=[scrape_tool],
#             llm=my_llm,
#             verbose=False
#         )

#         # Task
#         task = Task(
#             description=f"""
#             Go to {target['url']} and identify the key technical topics.
#             Based on these topics, GENERATE exactly 15 Multiple Choice Questions (MCQs).
            
#             STRICT JSON OUTPUT RULES:
#             1. Return a raw JSON list.
#             2. Structure: [{{"question": "...", "options": ["A", "B", "C", "D"], "answer": "..."}}]
#             """,
#             expected_output='A JSON list containing 15 MCQs.',
#             agent=extractor
#         )

#         crew = Crew(agents=[extractor], tasks=[task])
#         result = crew.kickoff()

#         # Parse JSON
#         raw_text = str(result)
#         clean_text = raw_text.replace("```json", "").replace("```", "").strip()
        
#         try:
#             parsed_questions = json.loads(clean_text)
#         except:
#             parsed_questions = clean_text # Fallback

#         all_data.append({
#             "company": target['company'],
#             "profile": target['profile'],
#             "questions": parsed_questions,
#             "source": target['url']
#         })
#         print(f"✅ Saved {target['company']}")

#     except Exception as e:
#         print(f"❌ Failed to process {target['company']}: {e}")
#         print("Skipping to next...")

#     # PAUSE to prevent 429 Errors
#     if i < len(targets) - 1:
#         print("⏳ Cooling down for 15 seconds to respect API limits...")
#         time.sleep(15)

# # Save to JSON
# try:
#     with open(output_file_path, 'w') as f:
#         json.dump(all_data, f, indent=4)
#     print(f"\n🎉 DONE! Data saved to: {output_file_path}")
# except Exception as e:
#     print(f"❌ Error saving file: {e}")


# import os
# import json
# from crewai import Agent, Task, Crew, LLM
# from crewai_tools import ScrapeWebsiteTool
# from dotenv import load_dotenv

# # 1. LOAD KEYS
# load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# # 2. SETUP GEMINI (Using the stable model)
# my_llm = LLM(
#     model="gemini/gemini-flash-latest",
#     api_key=os.getenv("GOOGLE_API_KEY")
# )

# # 3. FAANG TARGET LINKS
# targets = [
#     {
#         "company": "Meta", # Facebook
#         "profile": "Frontend Engineer",
#         "url": "https://www.geeksforgeeks.org/meta-interview-questions/"
#     },
#     {
#         "company": "Amazon",
#         "profile": "SDE / Data Analyst",
#         "url": "https://www.simplilearn.com/tutorials/data-analytics-tutorial/amazon-data-analyst-interview-questions"
#     },
#     {
#         "company": "Apple",
#         "profile": "Software Engineer",
#         "url": "https://www.geeksforgeeks.org/apple-interview-questions/"
#     },
#     {
#         "company": "Netflix",
#         "profile": "Senior Software Engineer",
#         "url": "https://www.simplilearn.com/netflix-interview-questions-article"
#     },
#     {
#         "company": "Google",
#         "profile": "SDE Intern",
#         "url": "https://www.geeksforgeeks.org/top-25-interview-questions-for-google-sde-internship/"
#     }
# ]

# # Path to save data
# current_dir = os.path.dirname(os.path.abspath(__file__))
# output_file_path = os.path.join(current_dir, '../data/faang_questions.json')

# all_data = []

# print(f"🚀 Starting AI Scraper for FAANG (Generating 15 MCQs each)...")

# for target in targets:
#     print(f"--> Processing: {target['company']}...")
    
#     scrape_tool = ScrapeWebsiteTool(website_url=target['url'])

#     # Agent
#     extractor = Agent(
#         role='Technical Exam Creator',
#         goal='Create challenging multiple-choice quizzes.',
#         backstory='You are an expert at converting technical interview topics into Multiple Choice Questions (MCQs).',
#         tools=[scrape_tool],
#         llm=my_llm,
#         verbose=False
#     )

#     # Task - STRICT JSON FORMAT
#     task = Task(
#         description=f"""
#         Go to {target['url']} and identify the key technical topics (e.g., Arrays, SQL, Python, System Design).
        
#         Based on these topics, GENERATE exactly 15 Multiple Choice Questions (MCQs).
        
#         STRICT OUTPUT RULES:
#         1. Create exactly 15 questions.
#         2. Each question must have 4 options (A, B, C, D).
#         3. Clearly mark the correct answer.
#         4. Return the result as a raw JSON list.
        
#         REQUIRED JSON STRUCTURE:
#         [
#             {{
#                 "question": "What is the time complexity of binary search?",
#                 "options": ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
#                 "answer": "O(log n)"
#             }},
#             ... (14 more)
#         ]
#         """,
#         expected_output='A JSON list containing 15 MCQs with question, options, and answer.',
#         agent=extractor
#     )

#     crew = Crew(agents=[extractor], tasks=[task])
#     result = crew.kickoff()

#     # Parse JSON
#     try:
#         raw_text = str(result)
#         # Clean markdown code blocks if present
#         clean_text = raw_text.replace("```json", "").replace("```", "").strip()
#         parsed_questions = json.loads(clean_text)
#     except:
#         # Fallback if AI messes up format
#         parsed_questions = str(result)

#     all_data.append({
#         "company": target['company'],
#         "profile": target['profile'],
#         "questions": parsed_questions,
#         "source": target['url']
#     })

# # Save to JSON
# try:
#     with open(output_file_path, 'w') as f:
#         json.dump(all_data, f, indent=4)
#     print(f"✅ Success! FAANG Data saved to: {output_file_path}")
# except Exception as e:
#     print(f"❌ Error saving file: {e}")


