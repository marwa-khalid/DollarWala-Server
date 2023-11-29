const Franchise = require("../models/franchise");
const router = require("express").Router();

router.post('/', async (req, res) => {  
    try {
        const { name, email, phoneNumber, preferredLocation } = req.body;
        
        const existingFranchise = await Franchise.findOne({ email: email });

        if (existingFranchise) {
          
            return res.status(400).json({ message: 'Franchise with this email already exists.' });
        } else {
            // Create a new Franchise document if it doesn't exist
            const franchiseDetails = new Franchise({
                name,
                email,
                phoneNumber,
                preferredLocation,
            });

            await franchiseDetails.save();

            res.status(201).json({ message: 'Franchise request sent successfully.' });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
  try {

    const franchise = await Franchise.find();
    res.json(franchise);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching franchise requests' });
  }
});

module.exports = router;