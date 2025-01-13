from flask import Flask, request, render_template, jsonify
from password_strength import check_password_strength

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        password = request.form.get("password")
        result = check_password_strength(password)
        return render_template("result.html", result=result)
    return render_template("index.html")

@app.route("/check-live", methods=["POST"])
def check_live():
    data = request.get_json()
    password = data["password"]
    result = check_password_strength(password)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
