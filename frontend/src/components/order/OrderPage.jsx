import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function OrderPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Wilaya: "",
    address: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const updateQuantity = (id, newQuantity) => {

    if(newQuantity < 1) {
      removeItem(id);
      return
    }

    const updatedCart = cart.map(item => item._id === id ? {...item, quantity: newQuantity} : item)
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart))

  }

  const removeItem = (id) => {

    const updatedCart = cart.filter(item => item._id != id)
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order`, {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city
      },
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: calculateTotal(),
      paymentMethod: "Cash on Delivery"
    });

    setOrderComplete(true);
    localStorage.removeItem("cart");
    setCart([]);

  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message);
    alert("Failed to place order. Please try again.");
  }
  }


  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl shadow-xl max-w-md w-full mx-4 border border-[#f8f3e9]">
          <div className="text-6xl text-green-400 mb-6">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="text-5xl font-logo creamy mb-4">Order Confirmed!</h2>
          <p className="text-gray-300 mb-6 text-2xl">
            Thank you for your purchase. We've sent a confirmation email to {formData.email}.
          </p>
          <Button 
            variant="contained" 
            style={{ 
              backgroundColor: '#2c0101', 
              color: '#f8f3e9',
              border: '1px solid #f8f3e9',
              padding: '12px 30px', 
              fontSize: '1.1rem',
              textTransform: 'none'
            }}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-10 pt-10">
        <h2 className="text-6xl md:text-6xl font-logo text-center creamy " style={{ textShadow: '-3px 1px 10px rgba(255, 255, 255, 0.3)' }}>
          Checkout
        </h2>
        <p className="text-center text-gray-300">Review your order and complete your purchase</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col xl:flex-row gap-8">
        {/* Order Summary */}
        <div className="xl:w-2/3">
          <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-4 sm:p-6 shadow-lg border border-[#f8f3e9]">
            <h3 className="text-2xl font-semibold creamy mb-6">Order Summary</h3>

            {cart.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-300 text-xl mb-6">Your cart is empty</p>
                <Button 
                  style={{ 
                    backgroundColor: '#2c0101', 
                    color: '#f8f3e9',
                    border: '1px solid #f8f3e9',
                    padding: '10px 20px', 
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                  onClick={() => navigate('/products')}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-8">
                  {cart.map(item => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center pb-4 border-1 border-[#f8f3e9] rounded-xl px-4 py-2">
                      {/* Product Image */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-lg flex-shrink-0" 
                      />

                      {/* Product Info and Controls */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          {/* Product Details */}
                          <div className="flex-1">
                            <h4 className="text-lg sm:text-xl md:text-2xl font-medium creamy mb-1">{item.name}</h4>
                            <p className="text-gray-300 text-sm sm:text-base md:text-lg">{item.price.toLocaleString()} DZD</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between md:justify-end gap-3">
                            <div className="flex items-center gap-2">
                              <button 
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#f8f3e9] hover:bg-[#f8f3e9] transition-colors hover:cursor-pointer hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <i className="fas fa-minus text-xs sm:text-sm mt-1"></i>
                              </button>
                              
                              <span className="mx-2 w-6 text-center text-lg font-medium">{item.quantity}</span>
                              
                              <button 
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#f8f3e9] hover:bg-[#f8f3e9] transition-colors hover:cursor-pointer hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <i className="fas fa-plus text-xs sm:text-sm mt-1"></i>
                              </button>
                            </div>
                            
                            <button 
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors ml-2 hover:cursor-pointer "
                              onClick={() => removeItem(item._id)}
                              aria-label="Remove item"
                            >
                              <i className="fas fa-trash text-xs sm:text-sm mt-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Totals */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-base sm:text-lg mb-2">
                    <span>Subtotal:</span>
                    <span>{calculateTotal().toLocaleString()} DZD</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg mb-2">
                    <span>Shipping:</span>
                    <span>depends on place DZD</span>
                  </div>
                  <div className="flex justify-between text-lg sm:text-xl font-bold mt-4 pt-4 border-t border-gray-700">
                    <span>Total:</span>
                    <span>{calculateTotal().toLocaleString()} DZD</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="xl:w-1/3">
          <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-4 sm:p-6 shadow-lg border border-[#f8f3e9] sticky top-6">
            <h3 className="text-2xl font-semibold creamy mb-6">Customer Information</h3>
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 gap-8">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                  inputProps={{ style: { color: 'white', fontSize: '1.1rem', padding: '18px 16px' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#f8f3e9" },
                      "&:hover fieldset": { borderColor: "#d4af37 !important" },
                      "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                  inputProps={{ style: { color: 'white', fontSize: '1.1rem', padding: '18px 16px' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#f8f3e9" },
                      "&:hover fieldset": { borderColor: "#d4af37 !important" },
                      "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                    },
                  }}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-8">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                  inputProps={{ style: { color: 'white', fontSize: '1.1rem', padding: '18px 16px' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#f8f3e9" },
                      "&:hover fieldset": { borderColor: "#d4af37 !important" },
                      "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                    },
                  }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                  inputProps={{ style: { color: 'white', fontSize: '1.1rem', padding: '18px 16px' } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#f8f3e9" },
                      "&:hover fieldset": { borderColor: "#d4af37 !important" },
                      "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                    },
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-8">

              {/* Address */}
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.1rem', padding: '18px 16px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />

              {/* City */}
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.1rem', padding: '18px 16px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                disabled={cart.length === 0}
                fullWidth
                style={{
                  backgroundColor: cart.length === 0 ? '#555' : '#750202',
                  color: '#f8f3e9',
                  border: '1px solid #f8f3e9',
                  padding: '18px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  textTransform: 'none',
                  borderRadius: '10px',
                }}
              >
                Complete Purchase
              </Button>
            </form>
          </div>
        </div>
      </div>

                
    </div>
  );
}