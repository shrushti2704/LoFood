const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Check if data is loaded
        if (!global.food_items || !global.foodcategory) {
            return res.status(503).send("Data not loaded yet, please try again later.");
        }
        
        console.log("Food Items:", global.food_items);
        console.log("Food Category:", global.foodcategory);

        res.send([global.food_items, global.foodcategory]);
    } catch (error) {
        console.error("Error in DisplayData:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
