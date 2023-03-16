const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://0.0.0.0:27017/test',
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
)
  .then(()=>console.log('connected'))
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send("Add /api/ get or add in url")
})

app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})


