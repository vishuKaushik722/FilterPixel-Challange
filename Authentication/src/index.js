const express = require('express');
const userRoute = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors());
app.use('/users', userRoute)


app.get('/', (req, res) => {
    res.send("Hello")
})
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://vishu:amisha@cluster0.kzxv9oe.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to database");
})
.catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Listning on port : 5000");
})