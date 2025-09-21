import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

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

  const handleSubmitOrder = () => {
    
  }


  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl shadow-xl max-w-md w-full mx-4 border border-[#f8f3e9]">
          <div className="text-6xl text-green-400 mb-6">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="text-3xl font-logo creamy mb-4">Order Confirmed!</h2>
          <p className="text-gray-300 mb-6">
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

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* Order Summary */}
        <div className="lg:w-2/5">
          <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
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
                    <div key={item.id} className="flex items-center border-b border-gray-700 pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-medium creamy">{item.name}</h4>
                        <p className="text-gray-300">{item.price.toLocaleString()} DZD</p>
                      </div>
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#f8f3e9]"
                          onClick={() => {}}
                        >
                          <i className="fas fa-minus text-sm"></i>
                        </button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#f8f3e9]"
                          onClick={() => {}}
                        >
                          <i className="fas fa-plus text-sm"></i>
                        </button>
                        <button 
                          className="ml-4 text-red-500 hover:text-red-400"
                          onClick={() => {}}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-lg mb-2">
                    <span>Subtotal:</span>
                    <span>function calculate total DZD</span>
                  </div>
                  <div className="flex justify-between text-lg mb-2">
                    <span>Shipping:</span>
                    <span>500 DZD</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-700">
                    <span>Total:</span>
                    <span>function calculate total DZD</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="lg:w-3/5">
          <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
            <h3 className="text-2xl font-semibold creamy mb-6">Customer Information</h3>
            
            <form onSubmit={handleSubmitOrder}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9' } }}
                  inputProps={{ style: { color: 'white' } }}
                  sx={{ 
                    fieldset: { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" }
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9' } }}
                  inputProps={{ style: { color: 'white' } }}
                  sx={{ 
                    fieldset: { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" }
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9' } }}
                  inputProps={{ style: { color: 'white' } }}
                  sx={{ 
                    fieldset: { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" }
                  }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9' } }}
                  inputProps={{ style: { color: 'white' } }}
                  sx={{ 
                    fieldset: { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" }
                  }}
                />
              </div>
              
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                fullWidth
                className="mb-6"
                InputLabelProps={{ style: { color: '#f8f3e9' } }}
                inputProps={{ style: { color: 'white' } }}
                sx={{ 
                  fieldset: { borderColor: "#f8f3e9" },
                  "&:hover fieldset": { borderColor: "#d4af37 !important" }
                }}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#f8f3e9' } }}
                  inputProps={{ style: { color: 'white' } }}
                  sx={{ 
                    fieldset: { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" }
                  }}
                />
              </div>
              
              <Button 
                type="submit"
                variant="contained" 
                disabled={cart.length === 0}
                fullWidth
                style={{ 
                  backgroundColor: cart.length === 0 ? '#555' : '#2c0101', 
                  color: '#f8f3e9',
                  border: '1px solid #f8f3e9',
                  padding: '15px', 
                  fontSize: '1.1rem',
                  textTransform: 'none'
                }}
              >
                Complete Purchase
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}