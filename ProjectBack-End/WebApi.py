from WebApiModels import DatasetSummaryModel
import WebApiML as wml
from flask import Flask, escape, request
import json
import sklearn
from flask_cors import CORS


app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})


@app.route("/DatasetProfiling")
def DatasetProfiling():
    profileData = wml.PerformInitalProfiling()
    jsonResult = json.dumps(profileData.__dict__) 
    return jsonResult

@app.route("/GetTagPrediction",methods=['POST'])
def GetTagPrediction():
    '''
    if first tag is empty it means that we should use our general model,
    if not we can use our specified model for that tag
    '''
    first_tag = request.get_json()
    predictedTags = wml.PredictTags(first_tag)
    jsonResult = json.dumps(predictedTags.__dict__)
    return jsonResult

@app.route("/GetUserTags")
def GetUserTags():
    userId = request.args.get('userid')
    tags = wml.GetUserTags_Id(userId)
    jsonResult = json.dumps(tags)
    return jsonResult

@app.route("/GetUserTagsUn")
def GetUserTagsUn():
    username = request.args.get('username')
    tags = wml.GetUserTags_un(username)
    jsonResult = json.dumps(tags)
    return jsonResult

if __name__ == '__main__':

    def space_tokenize(text):
        return text.split()
    def comma_tokenize(text):
        return text.split(',')
    wml.LoadDataSets()
    version = sklearn.__version__
    app.debug = True
    app.run(use_reloader=False)