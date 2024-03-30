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

    const packageCollection=client.db('Sim&SaimDB').collection('TourPackages');
    const blogsCollection=client.db('Sim&SaimDB').collection('Blogs');
    const ordersCollection=client.db('Sim&SaimDB').collection('Orders');

    app.get('/packages',async(req,res)=>{
      const cursor=packageCollection.find();
      const result=await cursor.toArray();
      res.send(result);
  })
    app.get('/blogs',async(req,res)=>{
      const cursor=blogsCollection.find();
      const result=await cursor.toArray();
      res.send(result);
  })

  app.get('/packages/:id', async (req, res) => {
    const id = req.params.id; // Corrected parameter name
    const query = { _id: new ObjectId(id) };
    const options = {
        // Include only the `title`, `img`, and `date` fields in the returned document
        projection: { title: 1, img: 1, date: 1 }
    };
    const result = await packageCollection.findOne(query, options);
    res.send(result);
});

//bookings
app.get('/booking',async(req,res)=>{
  let query={};
      if(req.query?.email){
        query={email:req.query.email}
      }
      // const cursor=ordersCollection.find(query);
      const result=await ordersCollection.find().toArray();
      res.send(result);
 
})


app.post('/booking',async(req,res)=>{
    const booking=req.body;
    console.log(booking);
    const result=await ordersCollection.insertOne(booking);
    res.send(result);
});

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
