const express =require('express')
const cors=require('cors')
const morgan=require('morgan')
const router=require('./router/route')
require('./DB/connection.js')

const app=express();
app.use(cors());
app.use(express.json())
app.use(morgan('tiny'))
app.disable('x-powered-by')

app.use('/api', router);

app.get('/', (req,res)=> {
    console.log('Received GET request on /');
    res.send("Home get started at on");
});

app.listen(8080)
