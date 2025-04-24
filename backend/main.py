import asyncio
from fastapi import FastAPI, File, UploadFile, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import json
import os
from form_recognition import process_upload

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# CORS erlauben für localhost:3000 (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/get-started/")
async def upload_data(university: str = Form(...), files: List[UploadFile] = File(...)):
    uploaded_files = []
    for file in files:
        await file.read()
        uploaded_files.append(file.filename)
    await asyncio.sleep(10)
    return {"uploaded_files": uploaded_files, "university": university}


UPLOAD_DIR = "tmp"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/getstarted/pdf-geek/")
async def pdf_receive(background_process: BackgroundTasks, metadata: str = Form(...), files: List[UploadFile] = File(...)):
    try:
        # JSON-String zu Python-Dict konvertieren
        metadata_dict = json.loads(metadata)
        filenames = metadata_dict.get("filenames", [])

        if len(filenames) != len(files):
            return JSONResponse(
                status_code=400,
                content={
                    "error": "Anzahl der Dateinamen stimmt nicht mit der Anzahl der Dateien uberein."
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
        background_process.add_task(process_upload, saved_files)
        return {
            "message": "Upload erfolgreich!",
            "saved_files": saved_files,
        }

    except json.JSONDecodeError:
        return JSONResponse(
            status_code=400, content={"error": "Ungultiges JSON im Feld 'metadata'."}
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
