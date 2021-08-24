from WebApiModels import DatasetSummaryModel, DatasetOverViewTable, Chart2D, PredictionModel
from WebApiMlHelper import CleareText
from threading import Thread
from datetime import datetime

import collections
import numpy as np
import pandas as pd
import joblib
import json

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import SGDClassifier
from sklearn import metrics
from sklearn.metrics import f1_score,precision_score,recall_score


df_orig = pd.DataFrame()
df_cleaned = pd.DataFrame()
df_tag_sorted = pd.DataFrame()

tag_coverage = []
Vectorizer = None
Multilabel_y = None

main_clfr = None
csharp_clfr = None
js_clfr = None
java_clfr = None
sql_clfr = None

tags_sorted = None
charp_tags_sorted = None

freq_vectorizer = None
csharp_freq_vectorizer = None

csharp_collection = ['c#','.net','wpf','asp.net','asp.net-mvc', 'linq']
java_collection = ['java','android']
js_collection = ['c++', 'cpp']
sql_collection = ['sql', 'mysql', 'sql-server', 'postgresql', 'sqlite']



def LoadDataSets():
    '''
    load dataset and models
    '''
    global df_orig
    global df_cleaned
    global df_tag_sorted
    global tag_coverage
    global Vectorizer
    global Multilabel_y
    global main_clfr
    global csharp_clfr
    global js_clfr
    global java_clfr
    global sql_clfr
    global freq_vectorizer
    global csharp_freq_vectorizer
    global tags_sorted
    global charp_tags_sorted

    df_orig = pd.read_csv('full-dataset.csv')
    df_orig = df_orig.drop('Unnamed: 0', 1)

    df_cleaned = pd.read_csv('users_question_final_processe.csv')

    df_tag_sorted = pd.read_csv('tags_counts.csv')

    f = open("tag-coverage.csv", "r")
    values = f.read().split(',')
    tag_coverage = [float(i) for i in values]

    Vectorizer = CountVectorizer(tokenizer = lambda x: x.split(','), binary='true')
    Multilabel_y = Vectorizer.fit_transform(df_cleaned['tags'])


    main_clfr = joblib.load('Ovr_SGD_classifier.joblib.pkl')
    csharp_clfr = joblib.load('C#_Classifier.joblib.pkl')
    # js_clfr = joblib.load('D:/Uni_DUE/First_Semester/Learning Analytics/Project/Js_Classifier.joblib.pkl')
    # java_clfr = joblib.load('D:/Uni_DUE/First_Semester/Learning Analytics/Project/java_Classifier.joblib.pkl')
    # sql_clfr = joblib.load('D:/Uni_DUE/First_Semester/Learning Analytics/Project/Sql_Classifier.joblib.pkl')

    freq_vectorizer = joblib.load('tfidfVectorizer.joblib.pkl')
    csharp_freq_vectorizer = joblib.load('c#_tfidfVectorizer.joblib.pkl')

    tags_sorted = pd.read_csv('tags_counts.csv')
    charp_tags_sorted = pd.read_csv('csharp_tags_sorted.csv')

def find_tags(result_matrix, result_list_proba) -> PredictionModel:
    '''
    Search through result_matrix (scipy.sparse.csr_matrix) and map it to the tags dataframe
    '''
    result = dict()
    wholeData = dict()
    for i in range(0, result_matrix.shape[1]):
        if result_list_proba[0][i] > 0.1:
            result[tags_sorted.iloc[i]['Tag']] = result_list_proba[0][i]
    for i in range(0, result_matrix.shape[1]):
        wholeData[tags_sorted.iloc[i]['Tag']] = result_list_proba[0][i]
    
    finalResult = PredictionModel(result, wholeData)
    return finalResult


def find_csharp_tags(result_matrix, result_list_proba) -> PredictionModel:
    '''
    Search through result_matrix (scipy.sparse.csr_matrix) and map it to the csharp tags dataframe
    '''
    result = dict()
    wholeData = dict()
    for i in range(0, result_matrix.shape[1]):
        if result_list_proba[0][i] > 0.1:
            result[charp_tags_sorted.iloc[i]['Tag']] = result_list_proba[0][i]
    for i in range(0, result_matrix.shape[1]):
        wholeData[charp_tags_sorted.iloc[i]['Tag']] = result_list_proba[0][i]
    
    finalResult = PredictionModel(result, wholeData)
    return finalResult

def tags_to_choose(n):
    t = Multilabel_y.sum(axis=0).tolist()[0]
    sorted_tags_i = sorted(range(len(t)), key=lambda i: t[i], reverse=True)
    multilabel_yn = Multilabel_y[:,sorted_tags_i[:n]]
    return multilabel_yn

def questions_explained_fn(n):
    multilabel_yn = tags_to_choose(n)
    x= multilabel_yn.sum(axis=1)
    return (np.count_nonzero(x==0))


def CalcTagToQuestionCoverage():
    
    questions_explained = []
    total_tags=Multilabel_y.shape[1]
    total_qs=df_cleaned.shape[0]
    for i in range(0, total_tags, 100):
        questions_explained.append(np.round(((total_qs-questions_explained_fn(i))/total_qs)*100,3))


def PerformInitalProfiling() -> DatasetSummaryModel:
    global df_orig
    global df_cleaned
    global df_tag_sorted
    global tag_coverage
    '''
    Summary of first 5 rows or original dataset
    '''
    df_orig_columns =  df_orig.columns.tolist()
    df_orig_rows =  df_orig.head(2).values.tolist()
    orig_overview = DatasetOverViewTable(df_orig_columns, df_orig_rows)

    '''
    Summary of first 5 rows or cleaned dataset
    '''
    df_cleand_columns =  df_cleaned.columns.tolist()
    df_cleand_rows =  df_cleaned.head(5).values.tolist()
    cleand_overview = DatasetOverViewTable(df_cleand_columns, df_cleand_rows)

    '''
    tag-number to  tag-frquency in 3 resolution
    '''
    tag_freq_high_res = df_tag_sorted['Counts'].tolist()[0:1000]
    tag_freq_med_res = df_tag_sorted['Counts'].tolist()[0:500]
    tag_freq_low_res = df_tag_sorted['Counts'].tolist()[0:100]

    '''
    tag-name to tag-frq for top 30
    '''
    name_frq_x = df_tag_sorted['Tag'].tolist()[0:100]
    name_frq_y = df_tag_sorted['Counts'].tolist()[0:100]
    name_frq_chart = Chart2D(name_frq_x, name_frq_y)

    '''
    tag-number to question coverage
    '''
    question_coverage = tag_coverage
    
    model = DatasetSummaryModel(orig_overview.__dict__, cleand_overview.__dict__,
                                tag_freq_high_res, tag_freq_med_res, tag_freq_low_res,
                                name_frq_chart.__dict__, question_coverage)

    return model

def PredictTags(req) -> list:
    tag = req['tag']
    title = req['title']
    body = req['body']
    cleaned = CleareText(title, body)
    
    if tag == "":
        print("Whole dataset model");
        prepared = freq_vectorizer.transform([cleaned])
        result = main_clfr.predict(prepared)
        result_ratio = main_clfr.predict_proba(prepared)
        predictedTags = find_tags(result, result_ratio.tolist())
        return predictedTags
    
    if tag.lower() in csharp_collection:
        print("Use C# model")
        prepared = csharp_freq_vectorizer.transform([cleaned])
        result = csharp_clfr.predict(prepared)
        result_ratio = csharp_clfr.predict_proba(prepared)
        predictedTags = find_csharp_tags(result, result_ratio.tolist())
        return predictedTags
    elif tag.lower() in java_collection:
        print("Use java model")
    elif tag.lower() == "python":
        print("Use java model")
    elif tag.lower() in cpp_collection:
        print("Use cpp model")
    elif tag.lower() in sql_collection:
        print("Use sql model")
    
    return []

def GetUserTags_Id(userId: str) -> dict:
    global df_orig
    newdf = df_orig[df_orig['UserId'] == int(userId)]
    allTags = ''
    for index, row in newdf.iterrows():
        allTags = allTags + row['Tags'] + ','
    userTags = allTags.split(',')
    Occurance_dict = collections.Counter(userTags)
    Occurance_dict = {k: v for k, v in sorted(Occurance_dict.items(), key=lambda item: item[1], reverse=True)}
    print("Get tag from userid")
    return Occurance_dict

def GetUserTags_un(username: str) -> dict:
    global df_orig
    newdf = df_orig[df_orig['Name'].str.contains(username, na=False, case=False)]
    allTags = ''
    for index, row in newdf.iterrows():
        allTags = allTags + row['Tags'] + ','
    userTags = allTags.split(',')
    Occurance_dict = collections.Counter(userTags)
    Occurance_dict = {k: v for k, v in sorted(Occurance_dict.items(), key=lambda item: item[1], reverse=True)}
    return Occurance_dict