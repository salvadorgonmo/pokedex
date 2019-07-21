const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

/**
 * title
 * description
 * date
 * done
 */

let todo = [
    {
        title: "Learning",
        description: "Learning Node.js and more ",
        date: "2019-07-20",
        done: false
    }
]
app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.json({
        data: todo.map((e, i) =>{
            return{
                id: i,
                ...e
            }

        })
    })
})

app.get('/:id',(req,res)=>{
    res.json({
        data: todo[req.params.id]
    })
})

app.post('/',(req,res)=>{
   // console.log(req.body)
    todo.push(req.body)
    res.send('Saved')
})

app.patch('/',(req,res)=>{
    const {id,done} = req.body
    todo =todo.map((e,i) =>{
        if(id === i){
            e.done = done
        }
        return e
    })
    res.send('Patch')
})

app.delete('/:id',(req,res)=>{
    todo = todo.filter((e,i)=>{
        return Number(i) !== Number(req.params.id)
    })
    res.send('Deleted')
})
app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})