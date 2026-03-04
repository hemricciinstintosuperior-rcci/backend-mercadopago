<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Calculadora Universal de Calorias</title>

<style>
body{
    font-family: Arial;
    background: #111;
    color: white;
    text-align: center;
    padding: 40px;
}
input, select{
    padding: 8px;
    margin: 10px;
    font-size: 16px;
}
#resultado{
    margin-top:20px;
    font-size:22px;
    font-weight:bold;
}
</style>
</head>

<body>

<h1>Calculadora Universal de Calorias</h1>

<input list="alimentos" id="nomeAlimento" placeholder="Digite o alimento">
<datalist id="alimentos"></datalist>

<br>

<input type="number" id="quantidade" placeholder="Quantidade">
<select id="unidade">
    <option value="g">Gramas (g)</option>
    <option value="kg">Quilogramas (kg)</option>
    <option value="mg">Miligramas (mg)</option>
    <option value="un">Unidade</option>
</select>

<br>

<button onclick="calcular()">Calcular</button>

<div id="resultado"></div>

<script>

// Banco de dados (kcal por 100g)
const banco = {
"arroz branco cozido":130,
"arroz integral cozido":124,
"feijao cozido":76,
"batata inglesa cozida":86,
"batata doce cozida":90,
"macarrao cozido":131,
"pao frances":265,
"pao integral":247,
"leite integral":60,
"leite desnatado":34,
"queijo mussarela":280,
"ovo cozido":155,
"ovo frito":196,
"frango grelhado":165,
"frango frito":240,
"carne bovina grelhada":250,
"carne suina":242,
"peixe tilapia":128,
"salmão":208,
"atum":132,
"banana":89,
"maca":52,
"pera":57,
"laranja":47,
"abacaxi":50,
"morango":32,
"melancia":30,
"abacate":160,
"tomate":18,
"alface":15,
"cenoura":41,
"brocolis":34,
"refrigerante":42,
"coca cola":42,
"hamburguer industrial":295,
"pizza mussarela":266,
"chocolate ao leite":535,
"sorvete":207,
"biscoito recheado":480,
"amendoim":567,
"castanha de caju":553,
"nozes":654,
"oleo de soja":884,
"azeite de oliva":884,
"manteiga":717,
"margarina":720
};

// Popular datalist
const datalist = document.getElementById("alimentos");
for(let item in banco){
    let option = document.createElement("option");
    option.value = item;
    datalist.appendChild(option);
}

// Unidades médias aproximadas
const unidadeMedia = {
"banana":120,
"maca":130,
"ovo cozido":50,
"pao frances":50
};

function calcular(){

let nome = document.getElementById("nomeAlimento").value.toLowerCase();
let qtd = parseFloat(document.getElementById("quantidade").value);
let unidade = document.getElementById("unidade").value;

if(!banco[nome]){
    document.getElementById("resultado").innerHTML = "Alimento não encontrado.";
    return;
}

let gramas = 0;

if(unidade === "g") gramas = qtd;
if(unidade === "kg") gramas = qtd * 1000;
if(unidade === "mg") gramas = qtd / 1000;
if(unidade === "un"){
    if(unidadeMedia[nome]){
        gramas = qtd * unidadeMedia[nome];
    } else {
        document.getElementById("resultado").innerHTML = "Unidade não cadastrada para esse alimento.";
        return;
    }
}

let kcal = (banco[nome] / 100) * gramas;

document.getElementById("resultado").innerHTML =
`${gramas.toFixed(2)} g = ${kcal.toFixed(2)} kcal`;

}

</script>

</body>
</html>