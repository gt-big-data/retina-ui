import pymongo
import json
import time
import datetime
import zerorpc

class CrawledArticlesTotal():
    def __init__(self):
        self.m = pymongo.MongoClient("146.148.59.202", 27017)
        self.db = self.m.big_data

    def getArticleCount(self, year, month, day):
        collection = self.db.articles
        start = datetime.datetime(year, month, day);
        end = start + datetime.timedelta(days=1)
        #end = datetime.datetime(year, month, day+1);
        c = collection.find({u'recent_pub_date': {"$gte": start, "$lt": end}});
        currentCount = 0
        for obj in c:
            currentCount += 1
        year = start.year
        month = start.month
        day = start.day
        d = {'Date': start, 'Count': currentCount}
        string = "Year:" + str(year) + " Month:" + str(month) + " Day:" + str(day) + " Count:" + str(currentCount)
        return d

    def getArray(self):
        collection = self.db.articles
        today = datetime.datetime.today()
        year = today.year
        month = today.month
        day = today.day

        end = datetime.datetime(year, month, day)
        start = end - datetime.timedelta(days=7)

        arr = []
        for num in range(7):
            current = start + datetime.timedelta(days=num)
            count = CrawledArticlesTotal().getArticleCount(current.year, current.month, current.day)
            arr.append(count)
        # outputString = ""
        # for obj in arr:
        #     outputString += obj + "\n"
        # outputString = outputString[:-1]
        d = {"Date": str(start), "Count": "1"}
        jsonstring = json.dumps(d)
        return jsonstring




count = CrawledArticlesTotal()
arr = count.getArray()

s = zerorpc.Server(CrawledArticlesTotal())
s.bind("tcp://0.0.0.0:4242")
s.run()
