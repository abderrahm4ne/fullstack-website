import express from 'express';  
import bcrypt from 'bcrypt';
import validateUser from '../middlewares/validation.js'
import User from '../models/users.js'
import adminAuthentication from '../middlewares/auth.js';
import Product from '../models/products.js';

const router = express.Router();

router.post('/register', validateUser, async (req, res) => {

    try{
        const { firstName, lastName, email, password } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user'
        })

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message : 'User not found'})
        }
 
        const isMatchPassword = await bcrypt.compare(password, user.password)

        if(!isMatchPassword){
            return res.status(400).json({ message : 'Invalid Password'})
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '  1h' }
        )

        res.status(200).json({ message : 'Login successful', token: token})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

router.get('/admin/products', adminAuthentication, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

export default router;