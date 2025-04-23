from fastapi import FastAPI, File, UploadFile, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import List
import json
import os

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

UPLOAD_DIR = "tmp"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class UploadPayload(BaseModel):
    metadata: str = Form(...)
    files: List[UploadFile] = File(...)


@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/getstarted/pdf-geek/")
async def pdf_receive(payload: UploadPayload, background_process: BackgroundTasks):
    try:
        # JSON-String zu Python-Dict konvertieren
        metadata_dict = json.loads(payload.metadata)
        filenames = metadata_dict.get("filenames", [])

        if len(filenames) != len(payload.files):
            return JSONResponse(
                status_code=400,
                content={
                    "error": "Anzahl der Dateinamen stimmt nicht mit der Anzahl der Dateien überein."
                },
            )

        saved_files = []

        for i, file in enumerate(payload.files):
            if file.content_type != "application/pdf":
                return JSONResponse(
                    status_code=400,
                    content={"error": f"{file.filename} ist keine PDF-Datei."},
                )

            new_filename = filenames[i]
            file_path = os.path.join(UPLOAD_DIR, new_filename)

            with open(file_path, "wb") as f:
                f.write(await file.read())

            saved_files.append(new_filename)
            from form_recognition import process_upload
        background_process.add_task(process_upload, saved_files)
        return {
            "message": "Upload erfolgreich!",
            "saved_files": saved_files,
        }

    except json.JSONDecodeError:
        return JSONResponse(
            status_code=400, content={"error": "Ungültiges JSON im Feld 'metadata'."}
        )


@app.post("/upload-example/")
async def upload_data(metadata: str = Form(...), files: List[UploadFile] = File(...)):
    try:
        # JSON-String zu Python-Dict konvertieren
        metadata_dict = json.loads(metadata)
        filenames = metadata_dict.get("filenames", [])

        if len(filenames) != len(files):
            return JSONResponse(
                status_code=400,
                content={
                    "error": "Anzahl der Dateinamen stimmt nicht mit der Anzahl der Dateien überein."
                },
            )

        saved_files = []

        for i, file in enumerate(files):
            if file.content_type != "application/pdf":
                return JSONResponse(
                    status_code=400,
                    content={"error": f"{file.filename} ist keine PDF-Datei."},
                )

            new_filename = filenames[i]
            file_path = os.path.join(UPLOAD_DIR, new_filename)

            with open(file_path, "wb") as f:
                f.write(await file.read())

            saved_files.append(new_filename)

        return {
            "message": "Upload erfolgreich!",
            "saved_files": saved_files,
        }

    except json.JSONDecodeError:
        return JSONResponse(
            status_code=400, content={"error": "Ungültiges JSON im Feld 'metadata'."}
        )
