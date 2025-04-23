import asyncio
import os

from dotenv import load_dotenv
load_dotenv()

from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer import DocumentAnalysisClient


endpoint = "https://qhack6-form-recognizer.cognitiveservices.azure.com/"
key = os.environ["AZURE_FORM_RECOGNIZER_API_KEY"]

credential = AzureKeyCredential(key)
client = DocumentAnalysisClient(endpoint=endpoint, credential=credential)

current_dir = os.path.dirname(os.path.abspath(__file__))
curriculum = os.path.join(current_dir, "storage", "cv_bsc_2019_curriculum.pdf")

with open(curriculum, "rb") as f:
    poller = client.begin_analyze_document(
        model_id="prebuilt-layout",
        document=f,
    )
result = poller.result()

for page in result.pages:
    print(f"Page {page.page_number}:")
    for line in page.lines:
        print("  ", line.content)