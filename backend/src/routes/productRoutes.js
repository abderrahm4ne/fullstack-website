import express from 'express';  
import User from '../models/users.js'
import adminAuthentication from '../middlewares/auth.js';
import Product from '../models/products.js';

const router = express.Router();

router.get('/products',  async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err: err.message });
    }
})

router.get('/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", err: err.message });
  }
});

router.get("/products/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (!products.length) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", err: err.message });
  }
});

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
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err: err.message });
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
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err: err.message });
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
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err: err.message });
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
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err: err.message });
    }
})

export default router;
