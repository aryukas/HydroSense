import sqlite3, os

DB_PATH = os.path.join(os.path.dirname(__file__), "../../database/history.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            NDVI REAL,
            Temperature REAL,
            Humidity REAL,
            WindSpeed REAL,
            SoilMoisture REAL,
            PrecipitationPrev REAL,
            PredictedRainfall REAL
        )
    """)
    conn.commit()
    conn.close()
