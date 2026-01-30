import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    """Retorna una conexión a la base de datos."""
    
    return psycopg2.connect(DATABASE_URL)
