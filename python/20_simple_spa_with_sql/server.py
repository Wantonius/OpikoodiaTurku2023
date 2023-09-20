from flask import Flask,jsonify,request
from data.connector import create_contact_table,get_contacts,add_new_contact

app = Flask(__name__,static_url_path="",static_folder="public")

create_contact_table()

@app.route("/api/contacts",methods=["GET","POST"])
def fetch_contacts():
    if request.method == "GET":
        contacts = get_contacts()
        print(contacts)
        if contacts == None:
            return "Internal Server Error",500
        return jsonify(contacts)
    else:
        data = request.json
        print(data)
        success = add_new_contact(data)
        if success == None:
            return "Internal Server Error",500
        return "Success",201
    
app.run("127.0.0.1",port=8080)