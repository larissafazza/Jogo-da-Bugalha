const jogo = {
    jogadores: [
        {
            id: 0,
            tabuleiro: [[]],
            pontuacao:[],
            total:0
        },
        {
            id: 1,
            tabuleiro: [[]],
            pontuacao: [],
            total : 0
        }
    ],
    'turno': 0,
    'colNumb' : -1,
    'valor' : 0
}

document.getElementById('novoJogoBtn').addEventListener('click', iniciarJogo);

document.getElementById('sorteio-0-btn').addEventListener('click', iniciarRodada);
document.getElementById('sorteio-1-btn').addEventListener('click', iniciarRodada);

document.getElementById('button-left').addEventListener('click', function(){~
    alteraColuna('e');
});
document.getElementById('button-right').addEventListener('click', function(){
    alteraColuna('d');
});
document.getElementById('button-select').addEventListener('click',fazerJogada);

function formatarJogo(){
    jogo.turno = 0;
    jogo.colNumb = -1;
    for(i=0;i<3;i++){

        jogo.jogadores[0].tabuleiro[i] = [];
        jogo.jogadores[1].tabuleiro[i] = [];
        
        for(j=0;j<3;j++){
            jogo.jogadores[0].tabuleiro[i][j] = 0;
            jogo.jogadores[1].tabuleiro[i][j] = 0;
        }
        jogo.jogadores[0].pontuacao[i] = 0;
        jogo.jogadores[1].pontuacao[i] = 0;
    }
}

function iniciarJogo(){
    formatarJogo();
    atualizaTabuleiroUsuario();
    alteraBtn();
}

function alteraBtn(){
    let sorteioBtnId = 'sorteio-' + jogo.turno + '-btn';
    let btnSorteio = document.getElementById(sorteioBtnId);
    if(jogo.turno == 1){
        if(btnSorteio.hasAttribute('hidden'))
            btnSorteio.removeAttribute('hidden');  
        else
            btnSorteio.setAttribute('hidden', 'true');
    }
    if(jogo.turno == 0){
        atualizaTabuleiroUsuario();
        alert("vez do bot");
        rodadaBot();
    }
}

function alteraColuna(sentido){

    var col = jogo.colNumb;
    if(col == 0){
        if(sentido === 'd'){
            limparColuna(col);
            jogo.colNumb = 1;
            escolherColuna(jogo.colNumb);
        }
    }

    if(col == 1){
        if(sentido === 'e'){
            limparColuna(col);
            jogo.colNumb = 0;
            escolherColuna(jogo.colNumb);
        }
        if(sentido === 'd'){
            limparColuna(col);
            jogo.colNumb = 2;
            escolherColuna(jogo.colNumb);
        }
    }
    if(col == 2){
        if(sentido === 'e'){
            limparColuna(col);
            jogo.colNumb = 1;
            escolherColuna(jogo.colNumb);
        }
    }
}

function iniciarRodada () {
    jogo.valor = Math.floor((Math.random() * 6) + 1);
    let idBoxJogador = "player" + jogo.turno + "box";
    var boxJogador = document.getElementById(idBoxJogador);
    boxJogador.innerHTML = '<p class="sorted-number">' +  jogo.valor + '</p>';
    alteraBtn();
    document.getElementById("col-buttons").removeAttribute('hidden');
    jogo.colNumb = 0;
    escolherColuna(jogo.colNumb);  
}

function rodadaBot(){
    jogo.valor = Math.floor((Math.random() * 6) + 1);
    let idBoxJogador = "player0box";
    var boxJogador = document.getElementById(idBoxJogador);
    boxJogador.innerHTML = '<p class="sorted-number">' +  jogo.valor + '</p>';
    // alteraBtn();
    // document.getElementById("col-buttons").removeAttribute('hidden');
    jogo.colNumb = Math.floor((Math.random() * 3) + 1);
    while(verificaColunaCheia()){
        jogo.colNumb = Math.floor((Math.random() * 3) + 1);
    }
    fazerJogada();
}

function escolherColuna(col){
    let colClassName = "coluna" + col + jogo.turno;
    var coluna = document.getElementsByClassName(colClassName);
    for (var i = 0; i < coluna.length; i++) {
        coluna[i].style.border = '3px solid red';
    }
    
}

function limparColuna(col){
    let colClassName = "coluna" + col + jogo.turno;
    var coluna = document.getElementsByClassName(colClassName);
    for (var i = 0; i < coluna.length; i++) {
        coluna[i].style.border = 'none';
    }
    
}

function verificaColunaCheia(){
    var coluna = jogo.colNumb;
    var player = jogo.turno;
    for(var i=0;i<3;i++){
        if(jogo.jogadores[player].tabuleiro[i][coluna] == 0){
            return false;
        }
    }
    return true;
}

function fazerJogada() {
    var coluna = jogo.colNumb;
    if(!verificaColunaCheia()){
        limparColuna(coluna);
        document.getElementById("col-buttons").setAttribute('hidden', 'true');
        let idBoxJogador = "player" + jogo.turno + "box";
        var boxJogador = document.getElementById(idBoxJogador);
        boxJogador.innerHTML = '';
        atualizaJogo();
        if(verificarFimJogo()){
            if(jogo.jogadores[0].total > jogo.jogadores[1].total){
                alert("FIM DE JOGO!\n O Jogador 0 ganhou com " + jogo.jogadores[0].total + "pontos!");
            }
            else{
                alert("FIM DE JOGO!\n 1 Jogador 0 ganhou com " + jogo.jogadores[1].total + "pontos!");
            }
            formatarJogo();
        }
        else{
            passarAVez();
        }
    }
}

function passarAVez(){
    if(jogo.turno == 0){
        jogo.turno = 1;
    }
    else{
        jogo.turno = 0;
    }
    alteraBtn();
    jogo.valor = 0;
    jogo.colNumb = -1;
}

function verificarFimJogo() {
    var preenchido = 0;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(jogo.jogadores[0].tabuleiro[i][j] != 0){
                preenchido += 1;
            }
        }
    }

    if(preenchido == 9){
        return true;
    }
    preenchido = 0;

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(jogo.jogadores[1].tabuleiro[i][j] != 0){
                preenchido++;
            }
        }
    }
    if(preenchido == 9){
        return true;
    }

    return false;
}

function atualizaJogo () {
    var player2;
    if(jogo.turno == 1){
        player2 = 0;
    } else{
        player2 = 1;
    }

    for(var i=0;i<3;i++){
        if(jogo.jogadores[jogo.turno].tabuleiro[i][jogo.colNumb] == 0){
            jogo.jogadores[jogo.turno].tabuleiro[i][jogo.colNumb] = jogo.valor;
            //tira o do coleguinha
            for(var j=0;j<3;j++){
                if(jogo.jogadores[player2].tabuleiro[j][jogo.colNumb] == jogo.valor){
                    jogo.jogadores[player2].tabuleiro[j][jogo.colNumb] = 0;
                }
            }
            atualizaTabuleiroUsuario();

            for(var k=0;k<2;k++){
                if(jogo.jogadores[player2].tabuleiro[k][jogo.colNumb] == 0 && jogo.jogadores[player2].tabuleiro[k+1][jogo.colNumb] != 0){
                    jogo.jogadores[player2].tabuleiro[k][jogo.colNumb] = jogo.jogadores[player2].tabuleiro[k+1][jogo.colNumb];
                    jogo.jogadores[player2].tabuleiro[k+1][jogo.colNumb] = 0;
                }
            }
            break;
        }
    }

    
    jogo.jogadores[0].total = calcularPontuacao(0);
    jogo.jogadores[1].total = calcularPontuacao(1);
    atualizaTabuleiroUsuario();
}

function atualizaTabuleiroUsuario(){
    for(var i=0;i<3;i++){
        let id1 = "soma" + i + '1'; // i=coluna
        let id0 = "soma" + i + '0';
        document.getElementById(id1).innerHTML = jogo.jogadores[1].pontuacao[i];
        document.getElementById(id0).innerHTML = jogo.jogadores[0].pontuacao[i];
    }

    for(var j=0;j<3;j++){
        for(var k =0;k<3;k++){
            var id = "box" + j + k + "0";
            if(jogo.jogadores[0].tabuleiro[j][k] != 0)
                document.getElementById(id).innerHTML =  '<p class="sorted-number">' +  jogo.jogadores[0].tabuleiro[j][k] + '</p>';
            var id = "box" + j + k + "1";
            if(jogo.jogadores[1].tabuleiro[j][k] != 0)
                document.getElementById(id).innerHTML =  '<p class="sorted-number">' +  jogo.jogadores[1].tabuleiro[j][k] + '</p>';
        }
    }

}

function calcularPontuacao(id) {
    let total = 0;
    let soma = 0;

    for(var i=0;i<3;i++){ // coluna
        for(var k=0; k<3;k++){ // 
            soma += jogo.jogadores[id].tabuleiro[k][i];
        }

        if((jogo.jogadores[id].tabuleiro[0][i] == jogo.jogadores[id].tabuleiro[1][i] 
            || jogo.jogadores[id].tabuleiro[0][i] == jogo.jogadores[id].tabuleiro[2][i]
            || jogo.jogadores[id].tabuleiro[1][i] == jogo.jogadores[id].tabuleiro[2][i])
            && jogo.jogadores[id].tabuleiro[1][i] != 0){
            soma = soma * 2;
        }
        else if(jogo.jogadores[id].tabuleiro[0][j] == jogo.jogadores[id].tabuleiro[1][j] 
            && jogo.jogadores[id].tabuleiro[1][j] == jogo.jogadores[id].tabuleiro[2][j]
            && jogo.jogadores[id].tabuleiro[1][j] == 0){
            soma = soma * 3;
        }

        jogo.jogadores[id].pontuacao[i] = soma;
        total = total + soma;
        soma = 0;
    }

    return total;
}
