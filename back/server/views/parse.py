import json
from flask import Blueprint, jsonify, request

from server.parser.parser import gen_word_class_table


route_parse = Blueprint(__name__, "parse")


@route_parse.route("/parse")
def parse():
    if "target" not in request.args:
        return jsonify({"table": []})

    target = request.args.get("target")
    word_class_table, class_id_table = gen_word_class_table(target)

    noun_id = class_id_table["名詞"]
    words = [{"word": word, "is_noun": _id == noun_id} for word, _id in word_class_table]
    return jsonify({"table": words})
