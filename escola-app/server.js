const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const app = express()
const db = new sqlite3.Database("escola.db")

app.use(express.json())
app.use(express.static("public"))

// criar tabelas
db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS professores(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS turmas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS horarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        turma TEXT,
        dia TEXT,
        hora TEXT,
        disciplina TEXT,
        professor TEXT
    )`)
})

// professores
app.get("/professores",(req,res)=>{
    db.all("SELECT * FROM professores",(e,r)=>res.json(r))
})
app.post("/professores",(req,res)=>{
    db.run("INSERT INTO professores(nome) VALUES(?)",[req.body.nome])
    res.json({ok:true})
})
app.delete("/professores/:id",(req,res)=>{
    const id=req.params.id
    db.run("DELETE FROM professores WHERE id=?",[id],function(err){
        if(err) return res.status(500).json({error: err.message})
        res.json({ok:true})
    })
})

// turmas
app.get("/turmas",(req,res)=>{
    db.all("SELECT * FROM turmas",(e,r)=>res.json(r))
})
app.post("/turmas",(req,res)=>{
    db.run("INSERT INTO turmas(nome) VALUES(?)",[req.body.nome])
    res.json({ok:true})
})
app.delete("/turmas/:id",(req,res)=>{
    const id=req.params.id
    db.run("DELETE FROM turmas WHERE id=?",[id],function(err){
        if(err) return res.status(500).json({error: err.message})
        res.json({ok:true})
    })
})

// horários
app.get("/horarios",(req,res)=>{
    db.all("SELECT * FROM horarios",(e,r)=>res.json(r))
})
app.post("/horarios",(req,res)=>{
    const {turma,dia,hora,disciplina,professor}=req.body
    db.run(
        `INSERT INTO horarios(turma,dia,hora,disciplina,professor)
         VALUES(?,?,?,?,?)`,
        [turma,dia,hora,disciplina,professor]
    )
    res.json({ok:true})
})

app.listen(3000,()=>console.log("Servidor em http://localhost:3000"))