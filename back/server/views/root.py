from flask import Blueprint


route_root = Blueprint(__name__, "top")


@route_root.route("/")
def toppage():
    return "Hello BackServer!"

