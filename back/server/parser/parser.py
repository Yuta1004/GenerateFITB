import re
import MeCab

def gen_word_class_table(target):
    """
    単語と品詞の対応表を作成する

    Param
    -----
        - target:str => 対応表作成元となる文字列
    Returns
    -------
        - word_class_table:list(tuple(str, int)) => 単語と品詞IDの対応表
        - class_id_table:dict(str, int) => 品詞名と品詞IDの対応表
    Example
    -------
        ```
        target = "メロスは激怒した。必ず、かの邪智暴虐の王を除かなければならぬと決意した。"
        word_class_table, class_id_table = gen_word_class_table(target)
        ```
    """
    word_class_table = []
    class_id_table = {}

    parsed_obj = MeCab.Tagger().parse(target)

    for raw in parsed_obj.split("\n"):
        splitted_raw = re.split("[\t,]", raw)
        if len(splitted_raw) < 2:
            continue
        word = splitted_raw[0]
        _class = splitted_raw[1]
        if _class not in class_id_table.keys():
            class_id_table[_class] = len(class_id_table)
        word_class_table.append((word, class_id_table[_class]))

    return word_class_table, class_id_table
