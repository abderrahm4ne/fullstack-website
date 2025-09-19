import express from 'express';  
import User from '../models/users.js'
import adminAuthentication from '../middlewares/auth.js';
import Product from '../models/products.js';

const router = express.Router();

router.get('/products',  async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

router.post('/admin/add/product', adminAuthentication, async (req, res) => {
    const { name, description, price, category, image, stock } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
            category,
            image,
            stock
        });

        await product.save();

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

router.post('/admin/update/product/:id', adminAuthentication, async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image, stock } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            image,
            stock
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

router.delete('/admin/delete/product/:id', adminAuthentication, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

router.patch('/admin/assign-role', adminAuthentication, async (req, res) => {
    const { userId, role } = req.body;
    
    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ message: 'User role updated successfully', user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', err: error.message });
    }
})

export default router;
