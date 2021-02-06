import json
from flask import Blueprint, jsonify, request

from server.parser.parser import gen_word_class_table


route_parse = Blueprint(__name__, "parse")


@route_parse.route("/parse", methods=["POST"])
def parse():
    target = request.get_data().decode()
    if len(target) == 0:
            return jsonify({"table": []})

    word_class_table, class_id_table = gen_word_class_table(target)

    noun_id = class_id_table["名詞"]
    words = [{"word": word, "is_noun": _id == noun_id} for word, _id in word_class_table]
    return jsonify({"table": words})

