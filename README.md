# Tag Recommencdation System

In the websites like StackOverflow (StackExchange), everybody can ask questions and with the help of community get a proper result for his/her question. one thing that is very important for this process is that you can set proper tag to your question in order to make it more visible and searchable for the community. and it is hard for beginners.

This project aims to help beginners to select best tags for their Title and body of the Question.

We downloaded our dataset from StackExchange API. this api has a limited access so if you need to get a lot of data just create an API-Key and your access will be almost limitless.

We made dataset clean using NLTK toolkit and created our features using TF-IDF vectorizer. Then we create a Multi-label Classification model in order to solve this problem.

## Architecture a
This project is using **React** as Front-End framework and **flask** as back end framework.

The back-end will starts automatically at port 5000 and front-end starts at port 3000.

The serialization between these two part is Json.


## Run Back-End

Back-end is in the **ProjectBack-End** folder and you can open this folder using VsCode and run **WebApi.py** or run it separately though python from this directory.

**requirements**:
```bash
pip install numpy
pip install pandas
pip install joblib
pip install scikit-learn
pip install -U Flask
pip install Flask-Cors
pip install nltk
```

## Run Front-End
Got to ProjectFront-End folder and open cmd in this directory and run 
```bash
npm start
```
**requirements**:

jusr download and install **nodejs** from: [NodeJs website](https://nodejs.org/en/)


## Youtube Demo:

[Demo](https://youtu.be/bjasieNy36M)