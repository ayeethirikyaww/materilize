from flask import Flask, render_template, url_for
app = Flask(__name__)

@app.route('/')

def home():
    return render_template('navbar.html')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

if __name__ == "__main__":
    app.debug = True
    app.run()
