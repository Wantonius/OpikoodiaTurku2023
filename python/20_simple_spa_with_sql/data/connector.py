import sqlite3

create_table_sql = """CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(20),
    lastname VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(20)
)"""

def get_connection():
    conn = None
    try:
        conn = sqlite3.connect("database.db")
        return conn
    except:
        print("Failed to connect to database")
    return conn
    
def create_contact_table():
    conn = get_connection()
    if conn == None :
        return None
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
        print("Success in create contact table")
    except:
        print("Failed to create table")