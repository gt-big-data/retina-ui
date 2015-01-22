import pymongo
from bson.objectid import ObjectId

class UserRecommendation():

    def __init__(self):
        self.m = pymongo.MongoClient("146.148.59.202", 27017)
        self.db = self.m.big_data
        self.categories = {}
        self.user = {}
        self.listOfArticles = []

    def setUser(self, name):
        query = {"name" : name}
        userCursor = self.db.users.find(query)
        for c in userCursor:
            self.user = c

    def getUser(self):
        if self.user != None:
            print("User not set")
        else:
            return self.user["name"]

    def getUserArticles(self):
        query = {"uid" : self.user["uid"]}
        projection = {"articles" : 1, "_id" : 0}
        userCursor = self.db.users.find(query, projection)
        for c in userCursor:
            self.listOfArticles = (c["articles"])
        for a in self.listOfArticles:
            articleCursor = self.db.articles.find({"_id" : ObjectId(a), "v" : "0.0.6"})
            for article in articleCursor:
                if article["categories"] != None:
                    for category in article["categories"]:
                        if category in self.categories:
                            self.categories[category] += 1
                        else:
                            self.categories[category] = 1

    def writeToFile(self):
        filename = self.user["name"] + "_rec.txt"
        f = open(filename, "w")
        f.write(self.user["name"] + "\n")
        for key in self.categories:
            f.write(key + ": " + str(self.categories[key]) + "\n")

    def writeToDB(self):
        query = {"uid" : self.user["uid"]}
        projection = {"categories" : 1, "_id" : 0}
        catCursor = self.db.users.find(query, projection)
        for cat in catCursor:
            curCat = cat;
        for key in self.categories:
            if key not in curCat:
                self.db.users.update(query,
                    {"$addToSet" : {"categories" : {key : self.categories[key]}}})
            else:
                catField = "categories." + key
                self.db.users.update(query, {"$inc" : {catField : 1}})

u = UserRecommendation()
u.setUser("Matt Ersted")
u.getUserArticles()
u.writeToDB()