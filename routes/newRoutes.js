// // Define the Mongoose schema for inventory collection
// const inventorySchema = new mongoose.Schema({
//     productId: String,
//     quantity: Number
//   });
  
//   // Create the Mongoose model for inventory collection
//   const Inventory = mongoose.model('Inventory', inventorySchema);
  
//   // Route handler function for updating inventory quantities
//   app.post('/inventory', async (req, res) => {
//     const inventoryUpdates = req.body;
    
//     try {
//       // Loop through the inventory updates and update or create the inventory documents
//       for (const update of inventoryUpdates) {
//         const inventory = await Inventory.findOne({ productId: update.productId });
  
//         if (inventory) {

//           if (inventory.quantity + update.quantity < 0) {
//             return res.status(400).send(`Not enough inventory for productId ${update.productId}`);
//           }
//           inventory.quantity += update.quantity;
//         } else {
//           // Create new inventory document
//           if (update.quantity < 0) {
//             return res.status(400).send(`Cannot remove inventory for non-existent productId ${update.productId}`);
//           }
//           inventory = new Inventory({
//             productId: update.productId,
//             quantity: update.quantity
//           });
//         }
  
//         // Save the changes to the Mongoose database
//         await inventory.save();
//       }
  
//       // Return a success response
//       res.send('Inventory updated successfully');
//     } catch (err) {
//       // Handle any errors that occur during the inventory update process
//       console.error(err);
//       res.status(500).send('Internal server error');
//     }
//   });
  