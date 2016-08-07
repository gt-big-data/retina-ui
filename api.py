from pymongo import MongoClient
import pymongo

client = MongoClient('mongodb://localhost:27017/')
db = client['BigData']

def getRecentArticles(number):
    cursor = db.articles.find().sort([("download_date", pymongo.DESCENDING), ("pub_date",pymongo.DESCENDING)]).limit(number)
    if cursor.count() <= 0:
        return {
            "error": "Error: No articles found."
        }
    articles = []
    for article in cursor:
        articles.append(article)
    return articles

def getArticlesByKeyword(keyword):
    cursor = db.articles.find({keywords: keyword}).sort([("download_date", pymongo.DESCENDING), ("pub_date",pymongo.DESCENDING)])
    if cursor.count() <= 0:
        return {
            "error": "Error: No articles found."
        }
    articles = []
    for article in cursor:
        articles.append(article)
    return articles

def getArticlesInDateRange(start, end):
    cursor = db.articles.find({date: {$gte: start, $lte: end}}).sort([("download_date", pymongo.DESCENDING), ("pub_date",pymongo.DESCENDING)])
    if cursor.count() <= 0:
        return {
            "error": "Error: No articles found."
        }
    articles = []
    for article in cursor:
        articles.append(article)
    return articles