var word_class_table_orig;

function step1() {
    let text = document.getElementById("text").value;
    if(text.length == 0) {
        return;
    }

    var request = new XMLHttpRequest();
    request.open('POST', location.protocol+"//"+location.host+"/back/parse");
    request.setRequestHeader("Content-Type", "text/plain");
    request.send(text);
    request.onreadystatechange = function () {
        if(request.status == 200) {
            try {
                document.getElementById("selectNoun").innerHTML = "";

                word_class_table_orig = JSON.parse(request.responseText)["table"];
                let word_class_table = word_class_table_orig
                                        .filter(elem => elem["is_noun"])
                                        .filter((elem, idx, self) => self.findIndex(e => e["word"] === elem["word"]) == idx);

                for(var idx = 0; idx < word_class_table.length; ++ idx) {
                    let word = word_class_table[idx]["word"];
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "nouns";
                    checkbox.id = word;
                    checkbox.value = word;
                    var namelabel = document.createElement("label");
                    namelabel.htmlFor = word;
                    namelabel.innerHTML = " "+word+"<br>";

                    document.getElementById("selectNoun").appendChild(checkbox);
                    document.getElementById("selectNoun").appendChild(namelabel);
                }
            } catch (e) {}
        }
    };
}

function step2() {
    var ng_words = []
    let checkboxes = document.getElementsByName("nouns");
    for(var idx = 0; idx < checkboxes.length; ++ idx) {
        if(checkboxes[idx].checked) {
            ng_words.push(checkboxes[idx].value);
        }
    }

    var result = "";
    for(var idx = 0; idx < word_class_table_orig.length; ++ idx) {
        let word = word_class_table_orig[idx]["word"];
        result += ng_words.includes(word) ? "___" : word;
    }
    document.getElementById("result").value = result;
}