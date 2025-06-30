// this will be an express server
import express from express

const app = express()
const PORT = 5050;


app.get('/', (req, res)=> {
    res.send('test')
})




app.listen(PORT, ()=>{
    console.log(`Server running port ${PORT}`)
})