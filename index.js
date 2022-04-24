const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://dbuser1:w2jUJGyFwpwrwRBQ@cluster0.lobph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("serviceProvider").collection("service");
        // get  post
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services);
        })

        // post user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('user added', newUser)
            const result = await serviceCollection.insertOne(newUser);
            res.send(result);
        })
        // delete user
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.error);

app.get('/', (req, res) => {
    res.send('mongo server connected')
})
app.listen(port, () => {
    console.log('everything is ok');
})