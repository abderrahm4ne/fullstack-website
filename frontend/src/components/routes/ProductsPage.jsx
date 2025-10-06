import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Get search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [location]);

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

  // Filter products based on category and search query
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

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

    localStorage.setItem("cart", JSON.stringify(cart));
    showSnackbar(`${product.name} added to cart!`, "success");
  }

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    // Remove search query from URL without page reload
    navigate('/products', { replace: true });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl creamy mb-4">error occured please try again..</h2>
          <Button 
            style={{ 
              backgroundColor: '#2c0101', 
              color: '#f8f3e9',
              border: '1px solid #f8f3e9',
              padding: '10px 20px', 
              textTransform: 'none'
            }}
            onClick={() => navigate('/')}
          >
            HOME PAGE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-16 mt-10 text-center ">
          <h2 className="text-4xl md:text-6xl font-logo mb-6 creamy" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>
            Our Collections
          </h2>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-transparent border-2 border-[#f8f3e9] text-[#f8f3e9] placeholder-[#f8f3e9] focus:outline-none focus:ring-2 focus:ring-[#f8f3e9] text-lg"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f8f3e9] hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-center mt-4">
            <p className="creamy text-lg">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found for "{searchQuery}"
              {filteredProducts.length === 0 && " - Try a different search term"}
            </p>
          </div>
        )}
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
            loading ? (
              <div className="col-span-full text-center">
                <h1 className="text-2xl creamy">Loading products...</h1>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center">
                <h2 className="text-2xl creamy mb-4">
                  {searchQuery ? "No products found matching your search" : "No products available"}
                </h2>
                {searchQuery && (
                  <Button 
                    style={{ 
                      backgroundColor: '#2c0101', 
                      color: '#f8f3e9',
                      border: '1px solid #f8f3e9',
                      padding: '10px 20px', 
                      textTransform: 'none'
                    }}
                    onClick={clearSearch}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              filteredProducts.map(product => (
                <NavLink key={product._id} to={`/products/${product.category}/${product.slug}`} className="bg-gradient-to-b product from-[#2c0101] to-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border-1 border-[#f8f3e9] px-3 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover bg-amber-700 rounded-xl"
                  />

                  <div className="p-6 flex flex-col justify-between h-56">
                    <div>
                      <h3 className="text-2xl font-semibold creamy mb-2 group-hover:text-[#f8f3e9] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-[#f8f3e9]">{product.price} DZD</span>
                      <button 
                        className="px-4 bg-[#490101] py-2 rounded-full border border-[#f8f3e9] text-[#f8f3e9] hover:bg-[#f8f3e9] hover:text-[#490101] transition-all hover:cursor-pointer text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </NavLink>
              ))
            )
          }
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-20 text-center">
        <h3 className="text-4xl tracking-tight titles-font mb-3 creamy" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>
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

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}