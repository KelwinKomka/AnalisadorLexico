var listaTokens = new Array;
var estados = new Array;
var indexEstado = -1;

function palavraChange(valor) {
    if (valor.length > 2)
        document.getElementById("inputPalavra").style.color = "red";
    else
        document.getElementById("inputPalavra").style.color = "#444";
}

function preencherLista(){
    var divTokens = document.getElementById("divTokens");
    while (divTokens.hasChildNodes()) {
        divTokens.removeChild(divTokens.lastChild);
    }
    var i = 0;

    estados = new Array;
    for (i in listaTokens){
        var token = listaTokens[i];
        var buttonItem = document.createElement("BUTTON");
        buttonItem.className = "btn";
        buttonItem.innerHTML = token;
        buttonItem.addEventListener("click", function(){
            listaTokens.splice(listaTokens.indexOf(token), 1);
            preencherLista();
        });

        divTokens.appendChild(buttonItem);

        var estadosValor = new Array(token.length);
        var j = 0;
        for (j in token){
            var letra = token[j].toLowerCase();
            var letraIndex = letra.charCodeAt() - 97;
            estadosValor[j] = new Array(26);
            if (j == token.length-1)
                estadosValor[j][letraIndex] = -1;
            else
                estadosValor[j][letraIndex] = Number(j)+1;
        }
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
        var estado = estados[i];
        tableRow = document.createElement("tr");

        var tableCell = document.createElement("td");
        tableCell.innerHTML = "q"+i;
        tableRow.appendChild(tableCell);
        
        for (j = 0; j < 26; j++){
            tableCell = document.createElement("td");
            var valor = estado[j];
            tableCell.innerHTML = "-";
            if (valor == -1)
                tableCell.innerHTML = "\u03B5";
            else if (valor)
                tableCell.innerHTML = "q"+valor;
            tableRow.appendChild(tableCell);
        }
        tableAutomato.appendChild(tableRow);
    }
}

function adicionarListaTokens(valor){
    if (valor && valor.trim().length > 0 && listaTokens.indexOf(valor) == -1){
        listaTokens.push(valor);
        preencherLista();
    }
    document.getElementById("inputToken").value = "";
}