var listaTokens = new Array;
var estados = new Array;
var indexEstado = 0;
var lastCellId = "";
var currentCellId = "";

function palavraChange(valor) {
    if (valor.trim().length > 0 && estados.length > 0){
        var letra = valor[valor.length - 1].toLowerCase();
        var estado = estados[indexEstado];
        var index = (letra.charCodeAt() - 96);
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
        } else if (index == -64) {
            if (currentCellId.trim().length > 0)
                document.getElementById(currentCellId).classList.remove("cellHighlight");
            document.getElementById("tr"+indexEstado).className = "row";
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
        let estadosValor = criarAutomatoToken(token);
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

function criarAutomatoToken(token){
    estadosValor = new Array(token.length);
    let i = 0;
    for (i in token){
        let letra = token[i].toLowerCase();
        estadosValor[i] = {};
        estadosValor[i][letra] = parseInt(i)+1;
        if (i == token.length-1) 
            estadosValor[parseInt(i)+1] = {"&": 0};
    }
    console.log(estadosValor);
    return estadosValor;
}

function inserirAutomatoNaLista(estadosValor, estados){
    let i = 0;
    let indexLetra = 0;
    for (i in estadosValor){
        let chave = Object.keys(estadosValor[i])[0];
        let last = i == (estadosValor.length - 1);
        if (estados[indexLetra] && estados[indexLetra].hasOwnProperty(chave)){
            indexLetra = estados[indexLetra][chave];
        } else if (estados[indexLetra]) {
            if (last)
                estados[indexLetra][chave] = -1;
            else
                estados[indexLetra][chave] = ++indexLetra;
        } else {
            if (last) {
                estados[indexLetra] = {};
                estados[indexLetra][chave] = -1;
            } else {
                estados[indexLetra] = {};
                estados[indexLetra][chave] = ++indexLetra;
            }
        }
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
    for (i = 0; i < 28; i++){
        let cellHeader = document.createElement("th");
        cellHeader.className = "tg-fovp";
        if (i == 0)
            cellHeader.innerHTML = " ";
        else if (i == 1)
            cellHeader.innerHTML = "\u03B5";
        else
            cellHeader.innerHTML = String.fromCharCode(95+i);
        tableRow.appendChild(cellHeader);
    }

    for (i in estados){
        let estado = estados[i];
        tableRow = tableAutomato.insertRow(-1);
        tableRow.id = "tr"+i;
        tableRow.className = "row";

        let tableCell = tableRow.insertCell(-1);
        if (estado.hasOwnProperty("&"))
            tableCell.innerHTML = "*q"+i;
        else
            tableCell.innerHTML = "q"+i;
        
        for (j = 0; j < 27; j++){
            tableCell = tableRow.insertCell(-1);
            tableCell.innerHTML = "-";
            let chave = String.fromCharCode(96+j);
            if (estado.hasOwnProperty(chave)) {
                let valor = estado[chave];
                if (valor)
                    tableCell.innerHTML = "q"+valor;
            } else if (j == 0 && estado.hasOwnProperty("&"))
                tableCell.innerHTML = "\u03B5";
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