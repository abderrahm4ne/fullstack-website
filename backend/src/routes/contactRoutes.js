    import express from 'express'
    import Contact from '../models/contact.js'

    const router = express.Router();

    router.post('/send-message', async (req, res) => {
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

    export default router;