# Construção do Analisador Léxico

## Ambiente de teste

https://kelwinkomka.github.io/AnalisadorLexico/

## Informações

A construção do Analisador Léxico tem por objetivo mostrar aos alunos da disciplina de Linguagens Formais a aplicação prática dos Autômatos Finitos, mecanismos reconhecedores de Linguagens Regulares.

Pretende-se com isso, transcender os conhecimentos teóricos vistos em aula até o momento, através da implementação do Analisador Léxico.

Implementação mínima: montar um Analisador Léxico que reconheça 10 tokens pré-estabelecidos (comandos de uma linguagem de programação qualquer), sendo que:

1. Alfabeto = {a,b,c...z}.

2. Separador = (branco/espaço).

3. Tokens = Palavras reservadas do Java, C++ ou outra linguagem qualquer, com o tamanho mínimo de 5 (cinco) símbolos. No mínimo 3 (três) dos 10 (dez) tokens devem iniciar pelo mesmo símbolo.

1. Durante a digitação do token, o autômato deve concomitantemente reconhecer os símbolos e realizar a troca dos estados. Após ser teclado o espaço, o token digitado é indicado como reconhecido ou rejeitado.

2. As interfaces apresentadas nos programas exemplos, podem servir como sugestões para a implementação do trabalho, mas lembre-se de que as telas do analisador também serão avaliadas.

### Dicas para a construção e funcionamento do autômato:
1. Iniciar uma matriz de ESTADOS X SÍMBOLOS com o estado final e de erro.
2. Preencher as células da matriz com uma estrutura do tipo: **M[1, t] := 2** sendo:

    M -> nome da matriz
    
    1 -> o estado atual
    
    t -> símbolo lido
    
    2 -> o novo estado

3. Acessar a STRING (o token informado) símbolo a símbolo, e a cada separador verificar o estado atual do autômato, mostrando o resultado (reconhecido ou não) na tela.

* Para montar o autômato:
1. Inicialmente construa gramáticas regulares para cada palavra.
2. Após construa um autômato para cada gramática.
3. Junte todos os autômatos em um só.
4. Determinize o autômato.
5. Minimize o autômato.
6. Utilize o AFDM para a implementação.
