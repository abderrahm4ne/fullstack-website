import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
        setProducts(res.data)
      }
      catch(err){
        setError(err);
        console.error('error occured :', err)
      }
      finally{
        setLoading(false);
      }
      
    }

    fetchProducts();
  }, [])

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  const addToCart = (product) => {
    const cart = getCart()

    const existing = cart.find( item => item._id === product._id);
    if(existing){
      existing.quantity += product.quantity || 1;
    }
    else {
      cart.push({ ...product, quantity: product.quantity || 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart))

  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      

      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-16 mt-10 text-center ">
          <h2 className="text-6xl md:text-7xl font-logo mb-6 creamy" style={{ textShadow: '-3px 1px 10px rgba(255, 255, 255, 0.3)' }}>
            Our Collections
          </h2>
          
      </div>

      {/* Category Filters */}
      <div className="container justify-center mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center items-baseline space-x-4 space-y-3 md:space-x-8 font-routes ">
          {["all", "oldmoney", "model2", "model3", "model4"].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full btn transition-all text-xl ${
                selectedCategory === category 
                  ? "bg-[#f8f3e9] text-[#2c0101]" 
                  : "text-creamy border border-creamy"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          { 
            loading ? (<h1>Loading products</h1>) :
            (Array.isArray(products) && products
            .filter(product => selectedCategory === "all" || product.category === selectedCategory)
            .map(product => (
                      <NavLink key={product._id} to={`/products/${product.category}/${product.slug}`} className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-1 border-[#f8f3e9]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="p-6 flex flex-col justify-between h-56">
                        <div>
                          <h3 className="text-2xl font-semibold creamy mb-2 group-hover:text-[#f8f3e9] transition-colors">
                            {product.name} sadsad 
                          </h3>
                          <p className="text-gray-300 text-sm line-clamp-3">
                            {product.description} zxczxc {product.category}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xl font-bold text-[#f8f3e9]">{product.price} DZD</span>
                          <button className="px-4 bg-[#490101] py-2 rounded-full border border-[#f8f3e9] text-[#f8f3e9] hover:bg-[#f8f3e9] hover:text-[#490101] transition-all hover:cursor-pointer"
                          onClick={()=> { addToCart(product)}}>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      </NavLink>
                      )))
          }
          

      </div>
      </div>


      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-20 text-center">
        <h3 className="text-4xl tracking-wider font-logo mb-3 creamy" style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}>
          Can't Find What You're Looking For?
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 font-routes">
          Our collection is constantly evolving. Contact us for special orders or to inquire about exclusive pieces not shown online.
        </p>
        <Button 
          variant="contained" 
          size="large"
          style={{ 
            backgroundColor: '#2c0101', 
            textTransform: 'none', 
            padding: '12px 30px', 
            fontSize: '1.2rem',
            color: '#f8f3e9',
            border: '1px solid #f8f3e9'
          }}
          className="btn"
          onClick={()=> (navigate('/contact'))}
        >
          Contact Us
        </Button>
      </div>

    </div>
  );
}