import webapp2
import logging

with open("stub.json","r") as f:
    stub = f.read()
    
    

class MainPage(webapp2.RequestHandler):
    
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

class Stub(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/javascript'
        self.response.write(str(stub))

application = webapp2.WSGIApplication([
    ('/api/hello', MainPage),
    ('/api/stub',Stub),
], debug=True)