const Franchise = require("../models/franchise");
const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post('/sendemail', async(req, res) => {
  const { email,action, franchiseId } = req.body;
  console.log(email)
  
  const franchise = await Franchise.findById(franchiseId);
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dollarwalafyp@gmail.com",
        pass: "pofu vgus dyoe ocoh",
      },
    });

    let mailOptions;

    if(action === "accept"){

      mailOptions = {
        from: "dollarwalafyp@gmail.com",
        to: email,
        subject: "Franchise Request Status",
        html: `
          <p>Dear User,</p>
          <p>We appreciate your trust and support, and we want to thank you for considering our franchise program.</p>
          <p>After careful consideration, we are pleased to inform you that we have accepted your franchise request.</p>
          <p>Feel free to contact our customer support at 042-XXXXXXX to discuss further details. We look forward to a successful partnership.</p>
          <p>Best regards,</p>
          <p>DollarWala Admin</p>
        `
      };
    }else if (action === "reject"){

        mailOptions = {
          from: "dollarwalafyp@gmail.com",
          to: email,
          subject: "Franchise Request Status",
          html: `
            <p>Dear User,</p>
            <p>We would like to express our gratitude for your interest in our franchise program.</p>
            <p>After careful consideration, we regret to inform you that we are unable to accept your franchise request at this time.</p>
            <p>Thank you for considering us, and we wish you the best in your endeavors.</p>
            <p>Best regards,</p>
            <p>DollarWala Admin</p>
          `,
        };
    }

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success:false, message: "An error occurred. Please try again later." });
      } else {
        console.log("Email sent:", info.response);
        franchise.status = "Cleared";
        await franchise.save();
        res.json({ success:true ,message: "Email sent successfully." });
      }
    });
});

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