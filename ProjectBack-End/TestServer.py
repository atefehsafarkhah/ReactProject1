from flask import Flask, escape, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app,resources={r"/*":{"Access-Control-Allow-Origin":"*","origins":"*"}})


@app.route("/GetTagPrediction",methods=['POST'])
def GetTagPrediction():
	return "Hello world"



if __name__ == '__main__':
    app.debug = True
    app.run(use_reloader=False)