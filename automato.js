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
        console.log("letra="+letra+", index="+index);
        document.getElementById("inputPalavra").className = "inputText inputBlack";
        if (index >= 0) {
            let proximoIndex = estado[letra];
            console.log("proximoIndex="+proximoIndex);
            if (proximoIndex) {
                lastCellId = currentCellId;
                if (lastCellId.trim().length > 0) {
                    document.getElementById(lastCellId).classList.remove("cellHighlight");
                }
                currentCellId = "td"+String(indexEstado)+"."+String(index);

                console.log("lastCellId="+lastCellId+", currentCellId="+currentCellId);

                document.getElementById("tr"+indexEstado).className = "row";
                indexEstado = proximoIndex == -1 ? 0 : proximoIndex;

                if (indexEstado >= 0) {
                    document.getElementById(currentCellId).className = "cellHighlight";
                    document.getElementById("tr"+indexEstado).className = "rowHighlight";
                }
            } else
                document.getElementById("inputPalavra").className = "inputText inputRed";
        } else if (index == -65) {
            if (currentCellId.trim().length > 0)
                document.getElementById(currentCellId).classList.remove("cellHighlight");
            indexEstado = 0;
            lastCellId = "";
            currentCellId = "";
        }             
    } else {
        if (valor.trim().length == 0 || estados.length == 0){
            if (indexEstado > 0) {
                document.getElementById("inputPalavra").className = "inputText inputBlack";
                document.getElementById("tr"+indexEstado).className = "row";
            }
            if (lastCellId.length > 0)
                document.getElementById(lastCellId).classList.remove("cellHighlight");
            if (currentCellId.length > 0)
                document.getElementById(currentCellId).classList.remove("cellHighlight");
            
            indexEstado = 0;
            lastCellId = "";
            currentCellId = "";
        }
    }
}

function preencherLista(){
    var divTokens = document.getElementById("divTokens");
    while (divTokens.hasChildNodes()) {
        divTokens.removeChild(divTokens.lastChild);
    }
    document.getElementById("inputPalavra").className = "inputText inputBlack";

    indexEstado = 0;
    estados = new Array;
    estados[0] = {};
    let i= 0;
    for (i in listaTokens){
        let token = listaTokens[i];
        adicionarToken(token, divTokens);
        let estadosValor = criarAutomatoToken(token, estados);
        estados = inserirAutomatoNaLista(estadosValor, estados);
    }

    criarTabela();

    console.log(estados);
}

function adicionarToken(token, divTokens){
    let buttonItem = document.createElement("BUTTON");
    buttonItem.className = "btn";
    buttonItem.innerHTML = token;
    buttonItem.addEventListener("click", function(){
        listaTokens.splice(listaTokens.indexOf(token), 1);
        limparInput();
        preencherLista();
    });

    divTokens.appendChild(buttonItem);
}

function criarAutomatoToken(token, estadosArray){
    estadosValor = new Array(token.length);
    let i = 0;
    let lastIndex = estadosArray.length;
    for (i in token){
        let letra = token[i].toLowerCase();
        estadosValor[i] = {};
        if (i == token.length-1)
            estadosValor[i][letra] = -1;
        else
            estadosValor[i][letra] = lastIndex++;
    }
    return estadosValor;
}

function inserirAutomatoNaLista(estadosValor, estados){
    let i = 0;
    for (i in estadosValor){
        if (i == 0)
            estados[i] = Object.assign(estados[i], estadosValor[i]);
        else
            estados.push(estadosValor[i]);
    }
    return estados;
}

function criarTabela(){
    var tableAutomato = document.getElementById("tableAutomato");
    while (tableAutomato.hasChildNodes()) {
        tableAutomato.removeChild(tableAutomato.lastChild);
    }

    var header = tableAutomato.createTHead();
    var tableRow = header.insertRow(-1);
    for (i = 0; i < 27; i++){
        let cellHeader = document.createElement("th");
        cellHeader.className = "tg-fovp";
        if (i == 0)
            cellHeader.innerHTML = " ";
        else
            cellHeader.innerHTML = String.fromCharCode(96+i);
        tableRow.appendChild(cellHeader);
    }

    for (i in estados){
        let estado = estados[i];
        tableRow = tableAutomato.insertRow(-1);
        tableRow.id = "tr"+i;
        tableRow.className = "row";

        let tableCell = tableRow.insertCell(-1);
        let estadoFinal = false;
        for(var chave in estado) {
            if (estado[chave] == -1) {
                estadoFinal = true;
                break;
            }
        }
        
        if (estadoFinal)
            tableCell.innerHTML = "*q"+i;
        else
            tableCell.innerHTML = "q"+i;
        
        for (j = 0; j < 26; j++){
            tableCell = tableRow.insertCell(-1);
            tableCell.innerHTML = "-";
            let chave = String.fromCharCode(97+j);
            if (estado.hasOwnProperty(chave)) {
                let valor = estado[chave];
                if (valor == -1)
                    tableCell.innerHTML = "\u03B5";
                else if (valor)
                    tableCell.innerHTML = "q"+valor;
            }
            tableCell.id = "td"+i+"."+j;
        }
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
    }
    limparInput();
}

function limparInput(){
    document.getElementById("inputToken").value = "";
    document.getElementById("inputPalavra").value = "";
}

preencherLista();