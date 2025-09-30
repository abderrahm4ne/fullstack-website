import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/config.js";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      setError(err);
      console.error('Error fetching products:', err);
      showSnackbar("Error loading products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: product.stock,
      });
      setImagePreview(product.image);
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
      });
      setImagePreview("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setImagePreview("");
    setUploading(false);
    setUploadProgress(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showSnackbar("Please select an image file", "error");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showSnackbar("Image size should be less than 5MB", "error");
    return;
  }

  setUploading(true);

  // logic to upload image to Firebase Storage
};

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      showSnackbar("Please fill in all required fields", "error");
      return;
    }

    if (!formData.image) {
      showSnackbar("Please upload a product image", "error");
      return;
    }

    try {
      const productData = {
        ...formData,
        stock: parseInt(formData.stock),
        price: parseInt(formData.price)
      };

      if (editingProduct) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/update/product/${editingProduct._id}`, productData, {
          withCredentials: true
        });
        showSnackbar("Product updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/add/product`, productData, {
          withCredentials: true
        });
        showSnackbar("Product added successfully!");
      }

      handleCloseDialog();
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err.response);
      showSnackbar("Error saving product", "error");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/delete/product/${productId}`, {
          withCredentials: true
        });
        showSnackbar("Product deleted successfully!");
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        showSnackbar("Error deleting product", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl creamy">Product Management</h1>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog()}
            style={{
              backgroundColor: '#2c0101',
              color: '#f8f3e9',
              border: '1px solid #f8f3e9',
              padding: '10px 20px',
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            <i className="fas fa-plus mr-2"></i>
            Add New Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f8f3e9]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-xl mb-4">Error loading products</p>
              <Button
                onClick={fetchProducts}
                style={{
                  backgroundColor: '#2c0101',
                  color: '#f8f3e9',
                  border: '1px solid #f8f3e9',
                  padding: '10px 20px',
                  textTransform: 'none'
                }}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-2xl">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 creamy">Image</th>
                    <th className="text-left p-4 creamy">Name</th>
                    <th className="text-left p-4 creamy">Category</th>
                    <th className="text-left p-4 creamy">Price</th>
                    <th className="text-left p-4 creamy">Stock</th>
                    <th className="text-left p-4 creamy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-gray-800 hover:bg-[#3a0202] hover:cursor-pointer">
                      <td className="p-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="px-4 py-3 whitespace-normal break-words capitalize">{product.name}</td>
                      <td className="px-4 py-3 whitespace-normal break-words capitalize">{product.category}</td>
                      <td className="px-4 py-3 whitespace-normal break-words capitalize">{product.price} DZD</td>
                      <td className="px-4 py-3 whitespace-normal break-words capitalize">
                        <span className={`px-2 py-1 rounded-full text-md ${
                          product.stock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-6">
                          <button
                            onClick={() => handleOpenDialog(product)}
                            className="text-blue-400 hover:text-blue-300 hover:cursor-pointer"
                            title="Edit"
                          >
                            <i className="fas fa-edit text-3xl"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-400 hover:text-red-300 hover:cursor-pointer"
                            title="Delete"
                          >
                            <i className="fas fa-trash text-3xl"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] text-white px-4 py-8">
          <DialogTitle className="text-4xl creamy">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 flex flex-col gap-8">
              {/* Name */}
              <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.3rem', padding: '10px 14px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />

              {/* Description */}
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.3rem', padding: '10px 14px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />

              {/* Price */}
              <TextField
                label="Price (DZD)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.3rem', padding: '10px 14px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />

              {/* Category */}
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.3rem', padding: '10px 14px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-creamy text-2xl mb-2">Product Image</label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-creamy"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* File Upload */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-3 bg-[#2c0101] text-creamy border border-creamy rounded-lg cursor-pointer hover:bg-[#3a0202] transition-colors">
                    <i className="fas fa-cloud-upload-alt"></i>
                    {uploading ? "Uploading..." : "Choose Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  
                  {uploading && (
                    <div className="flex items-center gap-2 text-creamy">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-creamy"></div>
                      <span>Uploading... {Math.round(uploadProgress)}%</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {uploading && uploadProgress > 0 && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <p className="text-gray-400 text-sm">
                  Supported formats: JPG, PNG, WebP. Max size: 5MB
                </p>
              </div>

              {/* Stock */}
              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#f8f3e9', fontSize: '1.15rem' } }}
                inputProps={{ style: { color: 'white', fontSize: '1.3rem', padding: '10px 14px' } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#f8f3e9" },
                    "&:hover fieldset": { borderColor: "#d4af37 !important" },
                    "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
                  },
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              style={{
                backgroundColor: '#f8f3e9',
                color: '#2c0101',
                border: '1px solid #2c0101',
                fontSize: '1.3rem',
                width: '170px'
              }}
              className="btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={uploading || !formData.image}
              style={{
                backgroundColor: uploading || !formData.image ? '#555' : '#2c0101',
                color: '#f8f3e9',
                border: '1px solid #f8f3e9',
                fontSize: '1.3rem',
                width: '220px'
              }}
              className="btn"
            >
              {uploading ? 'Uploading...' : editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Snackbar */}
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