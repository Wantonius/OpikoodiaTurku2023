from flask import Flask
from data.connector import create_contact_table

app = Flask(__name__,static_url_path="",static_folder="public")

create_contact_table()

app.run("127.0.0.1",port=8080)