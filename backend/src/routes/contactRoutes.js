import express from 'express'
import Contact from '../models/contact.js'
import validateContact from '../middlewares/contactValidations.js'
import adminAuthentication from '../middlewares/auth.js'

const router = express.Router();

router.post('/send-message', validateContact, async (req, res) => {
    console.log('req recieved', req.body)
    try{
        const contact = new Contact(req.body);
        console.log(contact)
        await contact.save();
        res.status(201).json({message: "message sent successfully", contact});
    }
    catch(err){
         res.status(404).json({message: "error occured", err: err.message})
    }
        
})

router.get('/admin/show-messages', adminAuthentication, async(req, res) => {
    
    try{
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err: err.message });
    }
})

export default router;