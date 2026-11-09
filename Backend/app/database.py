import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "productos.db"


def conectar():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with conectar() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                descripcion TEXT,
                precio REAL NOT NULL,
                stock INTEGER NOT NULL,
                categoria TEXT NOT NULL,
                fecha_creacion TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)