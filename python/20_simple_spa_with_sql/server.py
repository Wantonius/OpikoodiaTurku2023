from flask import Flask,jsonify
from data.connector import create_contact_table,get_contacts

app = Flask(__name__,static_url_path="",static_folder="public")

create_contact_table()

@app.route("/api/contacts")
def fetch_contacts():
    contacts = get_contacts()
    print(contacts)
    if contacts == None:
        return "Internal Server Error",500
    return jsonify(contacts)
    
app.run("127.0.0.1",port=8080)