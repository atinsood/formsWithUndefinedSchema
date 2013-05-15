#!/usr/bin/python
import tornado.httpserver
import tornado.ioloop
import tornado.web
from  tornado.escape import json_decode
from  tornado.escape import json_encode

schemas = []


class DynamicUIRequestHandler(tornado.web.RequestHandler):

    def prepare(self):
        if self.request.headers.get("Content-Type") == "application/json":
            print("Received json content")
            self.json_args = json_decode(self.request.body)
        else:
            #FIXME This is a hack, need to fix the request to be json always
            print('non json content')
            if self.request.body:
                self.json_args = json_encode(self.request.body)

    def post(self):
        self.addHeadersForCORS()
        print(" Here in post ")
        print(self.json_args)
        self.workWithSchema()

    def get(self):
        print('Printing schemas')
        print(schemas)
        self.write(json_encode(schemas))

    def options(self):
        """
        CORS invokes options method, which writes the correct headers to the request
        """
        self.addHeadersForCORS()

    def addHeadersForCORS(self):
        self.set_header('Content-Type', 'application/json')
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Allow-Headers",
                        "Content-Type, Depth, User-Agent,"
                        " X-File-Size, X-Requested-With, "
                        "X-Requested-By, If-Modified-Since,"
                        " X-File-Name, Cache-Control")

    def workWithSchema(self):
        import avro.schema
        schema = avro.schema.parse(json_decode(self.json_args))
        print schema
        #Once we have the avro schema from UI we need to work with it
        schemas.append(json_decode(self.json_args))


application = tornado.web.Application([
    (r'/dynamicUI', DynamicUIRequestHandler),
])


if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
