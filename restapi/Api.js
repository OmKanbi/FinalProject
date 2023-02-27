let express = require('express');
let app = express();
let port = 9500;
//live api link : https://mtw.onrender.com/
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let mongoUrl = "mongodb+srv://test:test123@cluster0.tgbbmvt.mongodb.net/?retryWrites=true&w=majority";

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
let db;

app.get('/',(req,res) => {
res.send('<h1>It Works!</h1>')
})

app.get('/categories',(req,res) => {
    db.collection('categories').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/products',(req,res) => {
    db.collection('products').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/products/:category',(req,res) => {
    let category = req.params.category
    db.collection('products').find({category:category}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/products/:category',(req,res) => {
    let query = {};
    let category = req.params.category
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {Price:1};
    if(req.query.sort){
        sort={Price:req.query.sort}
    }else if(lcost && hcost){
       query={
           category : category,
           $and:[{Price:{$gt:lcost,$lt:hcost}}]
        }
    }
    db.collection('products').find(query).sort(sort).toArray((err,result) => {
       if(err) throw err;
       res.send(result)
   })
})

app.get('/products/:category/:productid',(req,res) => {
    let category = req.params.category
    let productid = Number(req.params.productid)

    db.collection('products').find({product_id:productid,category:category}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
}) 

app.post('/cart',(req,res) => {
    if(Array.isArray(req.body)){
        db.collection('products').find({_id:{$in:req.body}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})

app.post('/placeorder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query={email:email}
    }else{
        query={}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client) =>{
if (err) return console.log ('connect error');
db = client.db('MensTailorWebsite');
app.listen(port, () =>{
console.log(`server listening on ${port}`);
});
});
