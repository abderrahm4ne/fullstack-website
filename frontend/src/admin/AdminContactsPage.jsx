import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('messages');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch messages and orders from API
      const messagesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages`);
      const ordersRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
      
      setMessages(messagesRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      showSnackbar("Error loading data", "error");
      
      // Mock data for demonstration
      setMessages([
        {
          _id: 1,
          name: "John Doe",
          email: "john@example.com",
          message: "I'm interested in the Classic Elegance watch. Do you have it in stock?",
          createdAt: new Date().toISOString(),
          read: false
        },
        {
          _id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          message: "When will the new collection be available?",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          read: true
        }
      ]);
      
      setOrders([
        {
          _id: 1,
          orderNumber: "ORD-001",
          customerName: "John Doe",
          total: 24500,
          status: "pending",
          items: [
            { name: "Classic Elegance", quantity: 1, price: 24500 }
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: 2,
          orderNumber: "ORD-002",
          customerName: "Jane Smith",
          total: 18900,
          status: "completed",
          items: [
            { name: "Modern Chrono", quantity: 1, price: 18900 }
          ],
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
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

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/messages/${messageId}`, { read: true });
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, read: true } : msg
      ));
      showSnackbar("Message marked as read");
    } catch (err) {
      console.error('Error updating message:', err);
      showSnackbar("Error updating message", "error");
    }
  };

  const deleteMessage = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/messages/${messageId}`);
        setMessages(messages.filter(msg => msg._id !== messageId));
        showSnackbar("Message deleted successfully");
      } catch (err) {
        console.error('Error deleting message:', err);
        showSnackbar("Error deleting message", "error");
      }
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      showSnackbar("Order status updated");
    } catch (err) {
      console.error('Error updating order:', err);
      showSnackbar("Error updating order", "error");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-900 text-yellow-300';
      case 'processing': return 'bg-blue-900 text-blue-300';
      case 'completed': return 'bg-green-900 text-green-300';
      case 'cancelled': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 pt-10">
        <h1 className="text-4xl creamy mb-8">Admin Orders and Contacts</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'messages' 
                ? 'text-creamy border-b-2 border-creamy' 
                : 'text-gray-400 hover:text-creamy'
            }`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'orders' 
                ? 'text-creamy border-b-2 border-creamy' 
                : 'text-gray-400 hover:text-creamy'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6">
        {activeTab === 'messages' ? (
          <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
            <h2 className="text-2xl creamy mb-6">Customer Messages</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f8f3e9]"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No messages found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message._id} className={`border border-gray-700 rounded-lg p-4 ${
                    !message.read ? 'bg-[#3a0202]' : ''
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold creamy">{message.name}</h3>
                        <p className="text-gray-400 text-sm">{message.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 text-sm">{formatDate(message.createdAt)}</span>
                        {!message.read && (
                          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{message.message}</p>
                    
                    <div className="flex space-x-2">
                      {!message.read && (
                        <Button
                          onClick={() => markAsRead(message._id)}
                          style={{
                            backgroundColor: '#2c0101',
                            color: '#f8f3e9',
                            border: '1px solid #f8f3e9',
                            padding: '4px 12px',
                            fontSize: '0.8rem',
                            textTransform: 'none'
                          }}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteMessage(message._id)}
                        style={{
                          backgroundColor: '#490101',
                          color: '#f8f3e9',
                          border: '1px solid #f8f3e9',
                          padding: '4px 12px',
                          fontSize: '0.8rem',
                          textTransform: 'none'
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-b from-[#2c0101] to-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-[#f8f3e9]">
            <h2 className="text-2xl creamy mb-6">Customer Orders</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f8f3e9]"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 creamy">Order #</th>
                      <th className="text-left p-4 creamy">Customer</th>
                      <th className="text-left p-4 creamy">Items</th>
                      <th className="text-left p-4 creamy">Total</th>
                      <th className="text-left p-4 creamy">Status</th>
                      <th className="text-left p-4 creamy">Date</th>
                      <th className="text-left p-4 creamy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} className="border-b border-gray-800 hover:bg-[#3a0202]">
                        <td className="p-4 font-mono">{order.orderNumber}</td>
                        <td className="p-4">{order.customerName}</td>
                        <td className="p-4">
                          <div className="max-w-xs">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm text-gray-300">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">{order.total} DZD</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-400">{formatDate(order.createdAt)}</td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="bg-[#1a1a1a] text-white border border-[#f8f3e9] rounded px-2 py-1 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

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