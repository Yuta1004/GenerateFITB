function step1() {
    let text = document.getElementById("text").value;
    if(text.length == 0) {
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', location.protocol+"//"+location.host+"/back/parse?target="+text);
    request.send(null);
    request.onreadystatechange = function () {
        if(request.status == 200) {
            try {
                document.getElementById("selectNoun").innerHTML = "";

                let word_class_table = JSON.parse(request.responseText)["table"]
                                        .filter(elem => elem["is_noun"])
                                        .filter((elem, idx, self) => self.findIndex(e => e["word"] === elem["word"]) == idx);

                for(var idx = 0; idx < word_class_table.length; ++ idx) {
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "nouns";
                    checkbox.value = word_class_table[idx]["word"];
                    var namelabel = document.createElement("label");
                    namelabel.innerHTML = word_class_table[idx]["word"]+"<br>";

                    document.getElementById("selectNoun").appendChild(checkbox);
                    document.getElementById("selectNoun").appendChild(namelabel);
                }
            } catch (e) {}
        }
    };
}