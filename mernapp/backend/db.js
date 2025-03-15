const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://LoFood:LoFood@cluster0.ntjfa.mongodb.net/LoFoodMern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        // Fetch data from the 'food_items' collection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        
        // Fetch data from the 'foodCategory' collection
        const foodcategory = await mongoose.connection.db.collection("foodcategory").find({}).toArray();

        // Store data in global variables
        global.food_items = fetched_data;
        global.foodcategory = foodcategory;
        
        console.log("Data Fetched and Stored Globally");

    } catch (err) {
        console.log("Error:", err);
    }
};

module.exports = mongoDB;
