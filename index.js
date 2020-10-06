const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const port = 4000

const app = express();
app.use(cors());
app.use(bodyParser.json());



const pass = 'MWCB7kgnbwLpkyHN';
app.get('/', (req, res) => {
  res.send('Well come to mongo and node!');
})


const MongoClient = require('mongodb').MongoClient;

// const uri = "mongodb+srv://admin:MWCB7kgnbwLpkyHN@cluster0.xaiaa.mongodb.net/volunteerDb?retryWrites=true&w=majority";
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xaiaa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("volunteerDb").collection("volunteers");
  console.log("database connected");
  
  app.post('/addVolunteer',(req, res)=>{
      const addVolunteers = req.body;
      console.log(addVolunteers);
      collection.insertOne(addVolunteers)
      .then(result=>{
        // console.log(result)
        res.send(result.insertedCount > 0);

      })
      // console.log(addVolunteers);
  })

app.get('/showVolunteer',(req, res) => {
  collection.find({})
  .toArray((err, documents)=>{
    res.send(documents);
  });
});

app.delete('/delete/:id',(req, res)=>{
  
  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then( result=>{
      res.send(result.deletedCount>0);
  })

} )


});


// app.listen(process.env.PORT || port)
app.listen(process.env.PORT || port)