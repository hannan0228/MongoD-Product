const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/add', async (req, res) => {
  const data = new Model({
    productId: req.body.productId,
    quantity: req.body.quantity,
    operation: req.body.operation
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data)

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//delete quatity using productId
router.post('/bulkupdate', async (req, res) => {

// Dummy data
    /* {
  "productIds":[101,102,103,90,105,104],
  "quantities":[1010,1910,1180,0,2900,2890,2900] 
     }*/


const { productIds, quantities } = req.body;

  try {

    //   
      let ids = await Model.find({}, {productId: 1,_id:0}).lean();
      const filteredArray = productIds.filter(item => {
        return ids.some(obj => obj['productId'] === item);
      });
           console.log(filteredArray);
           
           const result = productIds.filter((num) => filteredArray.indexOf(num) === -1).map((num) => productIds.indexOf(num));
           console.log(result);

           result.forEach((index) => {
            quantities.splice(index, 1);
          });

           for (let i = 0; i < filteredArray.length; i++) {
      const productId = filteredArray[i];
      const quantity = quantities[i];

      
     
      const product = await Model.findOneAndUpdate(
        { productId },
         { quantity } ,
        { new: true }
      );

      if (!product) {
        await new Product({ productId, quantity }).save();
      }
    }

    res.status(200).json({ message: 'updated' });
  } catch (error) {
    res.status(500).json({ message: 'please provide productIds' });
  }

})

module.exports = router;