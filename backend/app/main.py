from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import get_connection

app = FastAPI()  # ← primero

origins = [
    "http://localhost:5173",  # URL del frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API funcionando"}

@app.get("/countries")
def get_items():

    """paises"""

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT c.code, cn.name
        FROM countries c
        JOIN country_names cn
            ON cn.country_id = c.id
    """)
    
    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = {}

    for code, name in rows:
        result.setdefault(code, {"code": code, "name": []})["name"].append(name)

    return list(result.values())
