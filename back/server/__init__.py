from flask import Flask

# APP Setup
app = Flask(__name__)

# Blueprint
from server.views.root import route_root
from server.views.parse import route_parse

app.register_blueprint(route_root)
app.register_blueprint(route_parse)
