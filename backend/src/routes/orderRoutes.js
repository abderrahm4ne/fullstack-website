import express from 'express'
import adminAuthentication from '../middlewares/auth.js'
import Order from '../models/order.js';

const router = express.Router();

router.post("/Order", async (req, res) => {
    
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: "Order Placed Successfully", order })
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
})

router.get("/admin/Orders", adminAuthentication, async (req, res) => {
    try{
        const orders = await Order.find().sort({ createAt: -1});
        res.json(orders);
    }
    catch(err){
        res.status(400).json({err: err.message});
    }
})

router.get("/admin/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.patch("/admin/orders/:id", adminAuthentication, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/admin/orders/:id", adminAuthentication, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;