const express = require('express');
const admin = require('firebase-admin');
const cors=require('cors');
const config=require('./firebaseConfig.json');
//const {Flights,Cities}=require('./config');

const flightsController=require('./controllers/flightsController');
const citiesController=require('./controllers/citiesController');
const usersController=require('./controllers/usersController')
const app = express();
const PORT = process.env.PORT || 5000;
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(config),
});
// Middleware
app.use(express.json());
app.use(cors());
// Routes
console.log(1);

app.use('/api', flightsController);
app.use('/api', citiesController);
app.use('/api', usersController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




//Add flight details
// app.post('/api/flightSchedules',async(req,res)=>{
//     const data=req.body;
//     await Flights.add({data});
//     res.send({msg:"Flights added successfully"});
// })

//Root Route
// app.get('/',(req,res)=>{
//     res.send("Hello World!!");
// })

//Add cities in Firestore Db
// app.post('/api/cities',async(req,res)=>{
//   const data=req.body;
//   console.log(data);
//   await Cities.add({data});
//   res.send({msg:"City added successfully"});

// })


//Search Flights



// const port=process.env.PORT||7000;
// console.log("Using port:", port);

// app.listen(port,()=>console.log(`listening at port ${port}....`));

