const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;


// midleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.9i3jisk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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


        const database = client.db("12preparationDB");
        const menuCollection = database.collection("menu");
        const reviewsCollection = database.collection("reviews");
        const orderCollection = database.collection("orderedFood");


        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })
        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        })


        app.post('/foodOrdered', async (req, res) => {
            const orderItem = req.body;
            const result = await orderCollection.insertOne(orderItem);
            res.send(result);
        })

        app.get('/foodOrdered', async (req, res) => {
            const email = req.query.body;
            const query = { email: email }
            const result = await orderCollection.find(query).toArray();
            res.send(result);
        })






        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// S3_BUCKET="preparationForFinal"
// SECRET_KEY="mQKT33u0FYzYiawP"






