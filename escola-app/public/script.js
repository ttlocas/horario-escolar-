async function carregar(){

let r=await fetch("/horarios")
let dados=await r.json()

let tabela=document.getElementById("tabela")

let horas=["08:00","09:00","10:00","11:00","12:00"]

tabela.innerHTML=""

horas.forEach(h=>{

let linha="<tr><td>"+h+"</td>"

let dias=["Segunda","Terca","Quarta","Quinta","Sexta"]

dias.forEach(d=>{

let aula=dados.find(x=>x.hora==h && x.dia==d)

if(aula){
linha+=`<td>${aula.disciplina}<br>${aula.professor}</td>`
}else{
linha+="<td></td>"
}

})

linha+="</tr>"

tabela.innerHTML+=linha

})

}

async function add(){

let turma=document.getElementById("turma").value
let dia=document.getElementById("dia").value
let hora=document.getElementById("hora").value
let disciplina=document.getElementById("disciplina").value
let professor=document.getElementById("professor").value

await fetch("/horarios",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({turma,dia,hora,disciplina,professor})
})

carregar()

}

carregar()