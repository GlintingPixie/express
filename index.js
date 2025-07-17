import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

let teaData = []
let nextId = 1

// Add new tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {
        id:nextId++,
        name,
        price
    }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// Get all teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

// Get tea with id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        res.status(404).send("404 Not found")
    }
    else{
        res.status(200).send(tea)
    }
})

// Update tea with id
app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        res.status(404).send("404 Not Found")
        
    } else {
        const {name,price} = req.body
        tea.name = name
        tea.price = price
        res.status(200).send(tea)
    }
})

// Delete tea with id
app.delete("/teas/:id",(req,res)=>{
    teaData = teaData.filter(t => t.id !== parseInt(req.params.id))
    res.status(200).send(teaData)
})

app.listen(port,()=>{
    console.log(`Server is running at port: ${port}...`)
})