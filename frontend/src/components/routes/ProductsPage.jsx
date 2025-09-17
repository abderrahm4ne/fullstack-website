import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const products = [
  
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <h1 
            className="text-3xl font-logo tracking-wide creamy cursor-pointer" 
            onClick={() => navigate("/")}
            style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Traffic
          </h1>
          
          <div className="hidden md:flex space-x-8 font-routes">
            <span className="routes cursor-pointer" onClick={() => navigate("/")}>HOME</span>
            <span className="creamy border-b-2 border-creamy pb-1">PRODUCTS</span>
            <span className="routes cursor-pointer">ABOUT US</span>
            <span className="routes cursor-pointer">CONTACT</span>
          </div>
        </div>
        
        <div className="border-b border-gray-700 mt-4 mb-10"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-logo mb-6 creamy" style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}>
            Our Collection
          </h2>
          <p className="text-gray-300 fonts-routes italic text-lg mb-8">
            "Own a piece of history today. Where timeless value meets your style And because true style never ages."
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex justify-center space-x-4 md:space-x-8 font-routes">
          {["all", "classic", "modern", "luxury", "sports"].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category 
                  ? "bg-creamy text-[#2c0101]" 
                  : "text-creamy border border-creamy hover:bg-creamy hover:text-[#2c0101]"
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
          {products.map(product => (
            <div 
              key={product.id} 
              className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold creamy">{product.name}</h3>
                  <span className="text-lg font-bold creamy">{product.price}</span>
                </div>
                <p className="text-gray-300 mb-5">{product.description}</p>
                <Button 
                  fullWidth 
                  variant="outlined"
                  style={{ 
                    color: '#f8f3e9', 
                    borderColor: '#f8f3e9', 
                    textTransform: 'none', 
                    padding: '10px',
                    fontSize: '1.1rem'
                  }}
                  className="hover:bg-creamy hover:text-[#2c0101] transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20">
        <h3 className="text-3xl font-logo text-center mb-10 creamy" style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}>
          Featured Pieces
        </h3>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 4000 }}
          className="pb-12"
        >
          {products.slice(0, 4).map(product => (
            <SwiperSlide key={product.id}>
              <div className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl overflow-hidden shadow-lg h-full">
                <div className="h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold creamy">{product.name}</h3>
                    <span className="text-lg font-bold creamy">{product.price}</span>
                  </div>
                  <Button 
                    fullWidth 
                    variant="outlined"
                    style={{ 
                      color: '#f8f3e9', 
                      borderColor: '#f8f3e9', 
                      textTransform: 'none', 
                      padding: '10px'
                    }}
                    className="hover:bg-creamy hover:text-[#2c0101] transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-20 text-center">
        <h3 className="text-3xl font-logo mb-6 creamy" style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}>
          Can't Find What You're Looking For?
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
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