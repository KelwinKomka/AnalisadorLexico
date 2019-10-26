var listaTokens = new Array;
var estados = new Array;

function palavraChange(valor) {

    document.getElementById("pageHeader").innerHTML = valor;
}

function preencherLista(){
    var divTokens = document.getElementById("divTokens");
    while (divTokens.hasChildNodes()) {
        divTokens.removeChild(divTokens.lastChild);
    }
    var i = 0;
    for (i in listaTokens){
        var token = listaTokens[i];
        var divItem = document.createElement("div");
        var textItem = document.createTextNode(token);
        var buttonItem = document.createElement("BUTTON");
        buttonItem.innerHTML = "Remover";
        buttonItem.addEventListener("click", function(){
            console.log("removendo token="+token);
            listaTokens.splice(listaTokens.indexOf(token), 1);
            preencherLista();
        });

        divItem.appendChild(textItem);
        divItem.appendChild(buttonItem);

        divTokens.appendChild(divItem);
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
        console.log("i="+i+", estado="+estado);
        tableRow = document.createElement("tr");

        var tableCell = document.createElement("td");
        tableCell.innerHTML = "q"+i;
        tableRow.appendChild(tableCell);
        
        for (j = 0; j < 26; j++){
            tableCell = document.createElement("td");
            var valor = estado[j];
            console.log("j="+j+", valor="+valor);
            tableCell.innerHTML = "-";
            if (valor)
                tableCell.innerHTML = "q"+valor;
            tableRow.appendChild(tableCell);
        }
        tableAutomato.appendChild(tableRow);
    }
}

function adicionarListaTokens(valor){
    if (valor && valor.trim().length > 0 && listaTokens.indexOf(valor) == -1){
        listaTokens.push(valor);
        var estadosValor = new Array(valor.length);
        var i = 0;
        for (i in valor){
            var letra = valor[i].toLowerCase();
            var letraIndex = letra.charCodeAt() - 97;
            estadosValor[i] = new Array(26);
            estadosValor[i][letraIndex] = Number(i)+1;
        }
        estados = estadosValor;
        preencherLista();
    }
    document.getElementById("inputToken").value = "";
}