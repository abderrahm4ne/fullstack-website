import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function ProductPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${slug}`);
        const prod = res.data;
        
        if (prod) {
          setProduct(prod);
          
          // Fetch related products
          const relatedRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products/category/${prod.category}`
          );
          const related = relatedRes.data.filter(p => p._id !== prod._id);
          setRelatedProducts(related);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err);
        console.error('Error fetching product:', err);
        showSnackbar("Error loading product", "error");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);


  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const addToCart = (product, qty) => {
  if (product) {

    const cart = getCart();
    const existing = cart.find(item => item._id === product._id);
    
    if (existing) {
      existing.quantity += qty;
      setQuantity(qty);
    } else {
      cart.push({ ...product, quantity: qty });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    showSnackbar(`${qty} ${product.name} added to cart!`, "success");
  }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#f8f3e9]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl creamy mb-4">Product Not Found</h2>
          <p className="text-gray-300 mb-6">The product you're looking for doesn't exist.</p>
          <Button 
            style={{ 
              backgroundColor: '#2c0101', 
              color: '#f8f3e9',
              border: '1px solid #f8f3e9',
              padding: '10px 20px', 
              textTransform: 'none'
            }}
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-10">
        <nav className="text-sm text-gray-400 mb-6">
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-creamy transition-colors hover:cursor-pointer"
          >
            Products
          </button>
          <span className="mx-2">/</span>
          <button 
            onClick={() => navigate(`/products?category=${product.category}`)}
            className="hover:text-creamy transition-colors capitalize hover:cursor-pointer"
          >
            {product.category}
          </button>
          <span className="mx-2">/</span>
          <span className="text-creamy hover:cursor-pointer">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 mb-16">

          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              
              {productImages.length > 1 && (
                <div className="flex gap-4 justify-center">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 object-cover rounded-lg border-2 ${
                        selectedImage === index ? 'border-creamy' : 'border-gray-600'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 ">
            <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
              <h1 className="text-3xl md:text-4xl creamy mb-4">{product.name}</h1>
              <h3 className="text-xl md:text-xl creamy mb-8">{product.description}</h3>
              
              <div className="flex items-center mb-6">
                <span className="text-xl font-bold text-creamy mr-4">{product.price} DZD</span>
                {product.stock ? (
                  <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">In Stock</span>
                ) : (
                  <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-sm">Out of Stock</span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-xl creamy">Quantity:</span>
                <div className="flex items-center border border-[#f8f3e9] rounded-full">
                  <button 
                    className="w-10 h-10 flex items-center justify-center text-creamy hover:bg-[#f8f3e9] hover:text-[#2c0101] transition-colors rounded-l-full hover:cursor-pointer"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="w-12 text-center text-lg">{quantity}</span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center text-creamy hover:bg-[#f8f3e9] hover:text-[#2c0101] transition-colors rounded-r-full hover:cursor-pointer"
                    onClick={incrementQuantity}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="contained"
                  disabled={!product.stock}
                  onClick={() => addToCart(product, quantity)}
                  sx={{
                    backgroundColor: product.stock ? '#750202' : '#333232',
                    color: '#f8f3e9',
                    border: '1px solid #f8f3e9',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: product.stock ? '#a50303' : '#444', // darker red or gray
                    },
                  }}
                >
                  {product.stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/contact')}
                  sx={{ 
                    color: '#f8f3e9',
                    backgroundColor: "#333232",
                    border: '1px solid #f8f3e9',
                    padding: '12px 24px', 
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#4a4a4a',
                    },
                  }}
                >
                  Contact About Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16 border-t-1 border-[#f8f3e9] pt-10">
            <h2 className="text-5xl font-logo creamy mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(relatedProduct => (
                <div 
                  key={relatedProduct._id}
                  className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-[#f8f3e9] cursor-pointer"
                  onClick={() => navigate(`/products/${relatedProduct.category}/${relatedProduct.slug}`)}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold creamy mb-2 group-hover:text-[#f8f3e9] transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#f8f3e9]">{relatedProduct.price} DZD</span>
                      <button className="text-creamy hover:text-[#f8f3e9] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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