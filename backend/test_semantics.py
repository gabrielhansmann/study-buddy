from form_recognition import process_upload
from document_classification import agent

from dotenv import load_dotenv
load_dotenv()

# filenames = ["cv_bsc_2019_po.pdf"]
# process_upload(filenames)

# deployment_name = "gpt-4o-mini, gpt-4.5-preview"

with open("tmp/cv_bsc_2019_po.pdf.extract", "r") as f:
    po = f.read()

with open("tmp/cv_bsc_2019_curriculum.pdf.extract", "r") as f:
    curriculum = f.read()

# print(curriculum)

prompt = f"""
    You are a uni planer assistant. You help students to plan their studies.
    This students want to study the following program and wants to do 20 ECTS per semester.
    What courses do you recommend to finish the program? These are informations that
    you can use to recommend courses, but you have to find out yourself what they are:
    ---
    {curriculum}
    ---
    {po}
"""

dedicated_questions_prompt="""
Sieht die Studienordnung ein {Grund,Haupt}studium vor?
Ist eine Regelstudienzeit erkennbar?
Gibt es eine maximal mögliche Studienzeit?
Gibt es eine Mindestanzahl an ECTS-Punkten, die pro Semester erreicht werden müssen?

---

Format fuer Studienverlaufsplan...

"""

input(f"Token count: {len(prompt.split())}, press enter to continue...")

result = agent(
    deployment_name="gpt-4.5-preview",
    prompt=prompt,
    max_tokens=25000,
)
    
# print(result)