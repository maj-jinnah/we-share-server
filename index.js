const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ea93pzh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const mediaCollection = client.db('weshare').collection('media')
        const commentCollection = client.db('weshare').collection('comment')
        // const likesCollection = client.db('weshare').collection('like')

        app.post('/media', async (req, res) => {
            const mediaInfo = req.body;
            const result = await mediaCollection.insertOne(mediaInfo)
            res.send(result)
        })
        app.get('/medias', async (req, res) => {
            const query = {};
            const result = await mediaCollection.find(query).toArray();
            res.send(result);
        })
        app.post('/comment', async (req, res) => {
            const commentInfo = req.body;
            const result = await commentCollection.insertOne(commentInfo)
            res.send(result);
        })
        app.get('/allComments', async (req, res) => {
            const id = req.query._id
            const query = { post_id: id }
            const service = await commentCollection.find(query).toArray()
            res.send(service)
        })
        app.get('/media/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await mediaCollection.findOne(query);
            res.send(result)
        })
        // app.put('/isLike', async (req, res) => {
        //     const id = req.query._id;
        //     console.log(id)
        //     const query = { _id: ObjectId(id) };
        //     const totalLike = await mediaCollection.find(query).aggregate({$group:{sum:{$sum:1}}})
        //     res.send(totalLike);
        // })


    }
    finally {

    }
}
run().catch(console.log)



app.get("/", (req, res) => {
    res.send("We share server is running!");
});

app.listen(port, () => {
    console.log(`server is running, ${port}`);
});
