from flask import Flask, render_template, request
import sqlite3



app = Flask(__name__)


@app.route("/")
def index():
	return render_template("index.html")

@app.route("/tramites/")
def procedures():
	return render_template("procedures.html")

@app.route("/noticias/")
def news():

	# Getting news
	conn = get_db()
	rows = conn.execute("SELECT * FROM news").fetchall()
	conn.close()

	news = {
		"news": []
	}

	for item in rows:
		news["news"].append({"id": item["id"], "created": item["created"], "title": item["title"], "content": item["content"]})

	return render_template("news.html", news=news["news"])

@app.route("/contacto/")
def contact():
	return render_template("contact.html")

@app.route("/noticias/crear/")
def create_new():
	return render_template("create_new.html")


# Database

def get_db():
	conn = sqlite3.connect"/home/canawop400/absch/database.db")
	conn.row_factory = sqlite3.Row

	return conn


# API

@app.post("/api/news/")
def post_news():

	title = request.form["title"]
	content = request.form["content"]

	if title == "" or content == "":
		return ({"error": "Ninguno de los campos puede estar vacio"}, 400)
	
	# WARNING: This is vulnerable to Sql Injection
	# See: https://owasp.org/www-community/attacks/SQL_Injection
	conn = get_db()
	conn.execute(f"INSERT INTO news (title, content) VALUES ('{title}', '{content}');")
	conn.commit()
	conn.close()

	return ({"mensaje": "La noticia se creo correctamente"}, 200)
