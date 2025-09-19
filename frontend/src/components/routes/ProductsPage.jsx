import { useState, useEffect } from "react";
import dotenv from 'dotenv'
import Button from "@mui/material/Button";
import axios from "axios"
import "swiper/css";


export default function ProductsPage() {

dotenv.config();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const res = await axios.get(`${process.env.FRONTEND_API_URL}/api/products`)
        setProducts(res.data)
      }
      catch(err){
        setError(err);
      }
      
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      

      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-16 mt-10 text-center ">
          <h2 className="text-6xl md:text-7xl font-logo mb-6 creamy" style={{ textShadow: '-3px 1px 10px rgba(255, 255, 255, 0.3)' }}>
            Our Collections
          </h2>
          
      </div>

      {/* Category Filters */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex justify-center space-x-4 md:space-x-8 font-routes">
          {["all", "classic", "modern", "luxury", "sports"].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full btn transition-all text-xl w-[7%] ${
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
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}