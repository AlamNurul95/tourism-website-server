const express=require('express');
const cors=require('cors');
const app=express();
// const jwt=require('jsonwebtoken');
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());

//mongocode
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i85maai.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    

    //jwt
    // app.post('/jwt',(req,res)=>{
    //   const user=req.body;
    //   console.log(user);
    //   const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
    //     expiresIn:'1h'
    //   });
    //    res.send({token});
    // })

    // app.get('/services',async(req,res)=>{
    //     const cursor=serviceCollection.find();
    //     const result=await cursor.toArray();
    //     res.send(result);
    // })

   

        

   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Sim&Saim Tourism Service')
});

app.listen(port,()=>{
    console.log(`Sim&Saim Tourism Service ${port}`)
})