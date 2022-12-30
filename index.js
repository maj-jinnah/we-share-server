const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ea93pzh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const mediaCollection = client.db('weshare').collection('media')

        app.post('/media', async(req, res) =>{
            const mediaInfo = req.body;
            const result = await mediaCollection.insertOne(mediaInfo)
            res.send(result)
        })
        app.get('/medias', async(req, res) =>{
            const query = {};
            const result = await mediaCollection.find(query).toArray();
            res.send(result);
        })


    }
    finally{

    }
}
run().catch(console.log)



app.get("/", (req, res) => {
    res.send("We share server is running!");
});

app.listen(port, () => {
    console.log(`server is running, ${port}`);
});
