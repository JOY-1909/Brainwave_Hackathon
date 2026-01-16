import os
import json
import time
import re
from crewai import Agent, Task, Crew, LLM
from crewai_tools import ScrapeWebsiteTool
from dotenv import load_dotenv
from pymongo import MongoClient

# 1. LOAD KEYS
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# 2. SETUP GEMINI
my_llm = LLM(
    # Switching to the 'Lite' model to bypass the strict limit on 2.5
    model="gemini/gemini-2.0-flash-lite-preview-02-05", 
    api_key=os.getenv("GOOGLE_API_KEY")
)

# 3. SETUP MONGODB
mongo_uri = os.getenv("MONGODB_URI")
if not mongo_uri:
    print("⚠️  Warning: MONGODB_URI not set. Data will not be saved to DB.")
    collection = None
else:
    try:
        client = MongoClient(mongo_uri)
        db = client["brainwave"]
        collection = db["mocktest_data"]
        print("✅ Connected to MongoDB.")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")
        collection = None

# 4. HELPER: Extract JSON from messy text
def extract_json_array(text):
    """
    Finds the first [...] block in the text using Regex.
    This fixes issues where the AI says 'Here is your JSON: [...]'
    """
    try:
        # Regex to find a JSON list: starts with [ and ends with ]
        match = re.search(r'\[.*\]', text, re.DOTALL)
        if match:
            return json.loads(match.group())
        else:
            # Fallback: Try standard cleanup
            clean_text = text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
    except Exception:
        return None

# 5. TARGETS
targets = [
    {"company": "Meta", "profile": "Frontend Engineer", "url": "https://www.geeksforgeeks.org/meta-interview-questions/"},
    {"company": "Amazon", "profile": "SDE / Data Analyst", "url": "https://www.simplilearn.com/tutorials/data-analytics-tutorial/amazon-data-analyst-interview-questions"},
    {"company": "Apple", "profile": "Software Engineer", "url": "https://www.geeksforgeeks.org/apple-interview-questions/"},
    {"company": "Netflix", "profile": "Senior Software Engineer", "url": "https://www.simplilearn.com/netflix-interview-questions-article"},
    {"company": "Google", "profile": "SDE Intern", "url": "https://www.geeksforgeeks.org/top-25-interview-questions-for-google-sde-internship/"}
]

print(f"🚀 Starting ROBUST AI Scraper...")

for i, target in enumerate(targets):
    print(f"\n------------------------------------------------")
    print(f"[{i+1}/{len(targets)}] Processing: {target['company']}...")
    
    success = False
    attempts = 0
    
    while not success and attempts < 3:
        try:
            scrape_tool = ScrapeWebsiteTool(website_url=target['url'])

            extractor = Agent(
                role='Technical Recruiter',
                goal='Create technical MCQs.',
                backstory='You extract technical questions from text and format them as strict JSON.',
                tools=[scrape_tool],
                llm=my_llm,
                verbose=False
            )

            task = Task(
                description=f"""
                Read {target['url']}.
                Extract exactly 15 Technical/DSA MCQs.
                
                CRITICAL INSTRUCTION:
                Return ONLY a valid JSON list. Do NOT return URLs. Do NOT return "Repaired JSON".
                
                Format:
                [
                    {{ "question": "...", "options": ["A", "B", "C", "D"], "answer": "..." }}
                ]
                """,
                expected_output='A JSON List.',
                agent=extractor
            )

            crew = Crew(agents=[extractor], tasks=[task])
            result = crew.kickoff()
            
            # --- ROBUST PARSING LOGIC ---
            raw_output = str(result)
            parsed_questions = extract_json_array(raw_output)

            if not parsed_questions or not isinstance(parsed_questions, list):
                raise ValueError("AI returned invalid JSON format.")

            if collection:
                data_entry = {
                    "company": target['company'],
                    "profile": target['profile'],
                    "questions": parsed_questions,
                    "source": target['url'],
                    "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S")
                }
                collection.update_one(
                    {"company": target['company'], "profile": target['profile']},
                    {"$set": data_entry},
                    upsert=True
                )
                print(f"✅ Success! Saved {len(parsed_questions)} questions to DB.")
            else:
                print(f"✅ Extracted {len(parsed_questions)} questions (DB Mode Off).")

            success = True

        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg:
                print(f"⚠️  Rate Limit Hit. Waiting 60s...")
                time.sleep(60)
                attempts += 1
            elif "Expecting value" in error_msg or "JSON" in error_msg:
                print(f"⚠️  JSON Parse Error on attempt {attempts+1}. Retrying...")
                attempts += 1
            else:
                print(f"❌ Error on {target['company']}: {e}")
                break 

    # Safety Pause
    if i < len(targets) - 1:
        print("⏳ Pausing 15s...")
        time.sleep(15)

print(f"\n🎉 Scraper Finished!")



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


