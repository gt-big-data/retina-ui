import webapp2
import logging
import json

with open("stub.json","r") as f:
    stub = json.load(f)
    
class MainPage(webapp2.RequestHandler):
    
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

class Stub(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/javascript'
        self.response.write(json.dumps(stub[:5))

application = webapp2.WSGIApplication([
    ('/api/hello', MainPage),
    ('/api/stub',Stub),
], debug=True)