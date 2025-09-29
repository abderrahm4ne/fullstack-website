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

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              textTransform: 'none'
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
        <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] text-white">
          <DialogTitle className="creamy">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4"> 

              {/* name */}
              <div className="grid grid-cols-1 gap-8">
                <TextField
                  label="name"
                  name="name"
                  value={formData.name}
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
                  label="description"
                  name="description"
                  value={formData.description}
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

              {/* price */}
              <div className="grid grid-cols-1 gap-8">
                <TextField
                  label="price"
                  name="price"
                  type="price"
                  value={formData.price}
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
                  label="category"
                  name="category"
                  value={formData.category}
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

              {/* image */}
              <TextField
                label="image"
                name="image"
                value={formData.image}
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

              {/* stock */}
              <TextField
                label="stock"
                name="stock"
                value={formData.stock}
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

            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              style={{ color: '#f8f3e9' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: '#2c0101',
                color: '#f8f3e9',
                border: '1px solid #f8f3e9'
              }}
            >
              {editingProduct ? 'Update' : 'Add'} Product
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