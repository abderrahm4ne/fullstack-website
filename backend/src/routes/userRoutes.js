import express from 'express';  
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import validateUser from '../middlewares/validation.js'

const router = express.Router();

router.post('/register', validateUser, async (req, res) => {

    try{
        const { firstName, lastName, email, password } = req.body;

       /* const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        } */

        const hashedPassword = await bcrypt.hash(password, 10);

/*   
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await user.save();
*/
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }

});

export default router;