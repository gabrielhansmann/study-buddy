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


class JobApplicationInput(BaseModel):
    message: str


@app.post("/job-application/")
async def receive_job_application(data: JobApplicationInput):
    print(f"Job application received: {data.message}")
    await asyncio.sleep(5)

    suggestions = [
        {
            "title": "Frontend Developer Praktikum im Bereich Computervisualistik und UX-Design",
            "companies": ["SAP", "Bosch", "BMW Group", "andere Technologieunternehmen"],
            "description": (
                "Du arbeitest in einem interdisziplinären Team, das innovative Nutzeroberflächen "
                "und visuelle Anwendungen entwickelt. Deine Kenntnisse in Frontend-Development "
                "und Softwareergonomie helfen dir, intuitive und benutzerfreundliche Interfaces "
                "zu gestalten. Dabei setzt du modernste Web-Technologien und Frameworks "
                "(z.B. React, Angular oder Vue.js) ein."
            ),
            "reason": (
                "Du hast exzellente Noten im Bereich Computervisualistik und Softwareergonomie "
                "und großes Interesse an Frontend-Entwicklung. Dieses Praktikum bietet dir die "
                "Möglichkeit, deine Fähigkeiten praxisnah einzusetzen und gleichzeitig kreative "
                "Lösungen im Bereich UX/UI-Design zu erarbeiten."
            ),
        },
        {
            "title": "Frontend Engineer im Bereich Multimedia/Streaming",
            "companies": [
                "ZDF Digital",
                "ProSiebenSat.1 Media SE",
                "RTL Group",
                "Netflix",
                "Amazon Prime Video",
            ],
            "description": (
                "Du entwickelst und optimierst Frontend-Anwendungen für Online-Streaming-Plattformen "
                "oder Multimedia-Portale. Dabei arbeitest du in kleinen, agilen Teams an spannenden "
                "Projekten rund um Serien, Filme und Medieninhalte. Du gestaltest aktiv die "
                "Nutzererfahrung und hilfst, innovative Streaming-Lösungen umzusetzen."
            ),
            "reason": (
                "Deine Freizeitinteressen (Serien und Filme) passen perfekt zur Tätigkeit bei einem "
                "Medienunternehmen. Deine starken Fähigkeiten in der Frontend-Entwicklung und dein "
                "Verständnis für Nutzerfreundlichkeit sind hier sehr gefragt. Außerdem kannst du dein "
                "Interesse für visuelle Medien optimal mit deiner technischen Kompetenz verbinden."
            ),
        },
        {
            "title": "Praktikum im Bereich Innovation & Prototyping",
            "companies": [
                "Telekom TechBoost",
                "Porsche Digital Lab",
                "Hubraum",
                "Fraunhofer-Institut",
            ],
            "description": (
                "Du arbeitest in einem kleinen, dynamischen Team, das in kurzer Zeit innovative "
                "Prototypen entwickelt. In einem kreativen Umfeld kannst du deine Frontend-Fähigkeiten "
                "einsetzen, um schnell interaktive Prototypen zu realisieren, die auf Hackathons oder "
                "Innovationsveranstaltungen präsentiert werden."
            ),
            "reason": (
                "Du betonst, dass du gerne in kleinen Teams unter Zeitdruck arbeitest (z.B. in Hackathons). "
                "Ein Innovationslabor bietet dir genau diese Arbeitsumgebung: Kreative Herausforderungen, "
                "schnelle Entwicklung und Präsentation von Prototypen. Deine exzellenten Noten in Programmieren "
                "und Modellieren sowie deine Begeisterung für visuelle Gestaltung und Frontend-Technologien "
                "kommen hier optimal zum Einsatz."
            ),
        },
    ]

    return {
        "message": "Thanks for your interest! Based on your input, here are some matching internships:",
        "suggestions": suggestions,
        "echo": data.message,
    }


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


@app.post("/getstarted/pdf-geek/")
async def pdf_receive(
    background_process: BackgroundTasks,
    metadata: str = Form(...),
    files: List[UploadFile] = File(...),
):
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
