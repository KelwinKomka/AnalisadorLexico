var listaTokens = new Array;
var estados = new Array;
var indexEstado = 0;
var lastCellId = "";
var currentCellId = "";

function palavraChange(valor) {
    if (valor.trim().length > 0 && estados.length > 0){
        var letra = valor[valor.length - 1].toLowerCase();
        var estado = estados[indexEstado];
        var index = letra.charCodeAt() - 97;
        console.log("letra="+letra+", estado="+estado+", index="+index);
        document.getElementById("inputPalavra").style.color = "black";
        if (index >= 0) {
            let proximoIndex = estado[index];
            console.log("proximoIndex="+proximoIndex);
            if (proximoIndex) {
                lastCellId = currentCellId;
                if (lastCellId.trim().length > 0) {
                    document.getElementById(lastCellId).style.backgroundColor = "#EBF5FF";
                }
                currentCellId = "td"+String(indexEstado)+"."+String(index);

                console.log("lastCellId="+lastCellId+", currentCellId="+currentCellId);

                indexEstado = proximoIndex == -1 ? 0 : proximoIndex;

                if (indexEstado >= 0) {
                    document.getElementById(currentCellId).style.backgroundColor = "#99ccff";
                }
            } else
                document.getElementById("inputPalavra").style.color = "red";
        } else if (index == -65) {
            if (currentCellId.trim().length > 0)
                document.getElementById(currentCellId).style.backgroundColor = "#EBF5FF";
            indexEstado = 0;
            lastCellId = "";
            currentCellId = "";
        }             
    } else {
        document.getElementById("inputPalavra").style.color = "black";
        indexEstado = 0;
        document.getElementById(lastCellId).style.backgroundColor = "#EBF5FF";
        document.getElementById(currentCellId).style.backgroundColor = "#EBF5FF";
        lastCellId = "";
        currentCellId = "";
    }
}

function preencherLista(){
    var divTokens = document.getElementById("divTokens");
    while (divTokens.hasChildNodes()) {
        divTokens.removeChild(divTokens.lastChild);
    }
    var i = 0;

    document.getElementById("inputPalavra").style.color = "black";
    indexEstado = 0;
    estados = new Array;
    for (i in listaTokens){
        let token = listaTokens[i];
        let buttonItem = document.createElement("BUTTON");
        buttonItem.className = "btn";
        buttonItem.innerHTML = token;
        buttonItem.addEventListener("click", function(){
            listaTokens.splice(listaTokens.indexOf(token), 1);
            preencherLista();
        });

        divTokens.appendChild(buttonItem);

        let estadosValor = new Array(token.length);
        let j = 0;
        for (j in token){
            var letra = token[j].toLowerCase();
            var letraIndex = letra.charCodeAt() - 97;
            estadosValor[j] = new Array(26);
            if (j == token.length-1)
                estadosValor[j][letraIndex] = -1;
            else
                estadosValor[j][letraIndex] = Number(j)+1;
        }

        // for (j in estadosValor){
        //     var estado = estadosValor[j];
        // }
        estados = estadosValor;
    }

    var tableAutomato = document.getElementById("tableAutomato");
    var tableRow = document.createElement("tr");
    var tableHeader = document.createElement("th");

    while (tableAutomato.hasChildNodes()) {
        tableAutomato.removeChild(tableAutomato.lastChild);
    }
    for (i = 0; i < 27; i++){
        tableHeader = document.createElement("th");
        tableHeader.className = "tg-fovp";
        if (i == 0)
            tableHeader.innerHTML = " ";
        else
            tableHeader.innerHTML = String.fromCharCode(96+i);
        tableRow.appendChild(tableHeader);
    }
    tableAutomato.appendChild(tableRow);

    for (i in estados){
        let estado = estados[i];
        tableRow = document.createElement("tr");
        tableRow.id = "tr"+i;

        let tableCell = document.createElement("td");
        tableCell.innerHTML = "q"+i;
        tableRow.appendChild(tableCell);
        
        for (j = 0; j < 26; j++){
            tableCell = document.createElement("td");
            let valor = estado[j];
            tableCell.innerHTML = "-";
            if (valor == -1)
                tableCell.innerHTML = "\u03B5";
            else if (valor)
                tableCell.innerHTML = "q"+valor;
            tableCell.id = "td"+i+"."+j
            tableRow.appendChild(tableCell);
        }
        tableAutomato.appendChild(tableRow);
    }
}

function adicionarListaTokens(valor){
    if (valor && valor.trim().length > 0 && 
            listaTokens.indexOf(valor) == -1 && 
            valor.search(/[^a-zA-Z]+/) === -1){
        listaTokens.push(valor);
        preencherLista();
    } else {
        alert("Apenas letras de \"a\" a \"z\" são permitidas!");
        document.getElementById("inputToken").value = "";
    }
}

preencherLista();