
const Contact = require("../models/contact");
const router = require("express").Router();

router.post('/', async (req, res) => {  
    try {
        const { name, email, subject, message } = req.body;
        
            const ContactDetails = new Contact({
                name,
                email,
                subject,
                message,
            });

            await ContactDetails.save();

            res.status(201).json({ message: 'Contact request sent successfully.' });
        
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
  try {

    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts requests' });
  }
});

module.exports = router;