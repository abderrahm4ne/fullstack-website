import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { 
  Email, 
  Phone, 
  LocationOn, 
  Schedule 
} from "@mui/icons-material";
import axios from 'axios'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [inValid, setInValid] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/send-message`, formData, 
        {headers: {
          "Content-Type": "application/json"
        }}
      )
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setInValid({});

      console.log('done with no errors');
    } catch (err){
      console.log({message: 'error occured', err: err.message});
      setInValid(err.response.data.errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">

      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-12 py-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-logo mb-2 creamy" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>
            Get In Touch
          </h2>
          <p className="text-gray-300 fonts-routes italic text-lg mb-8">
            "We'd love to hear from you. Reach out to us with any questions or inquiries."
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl p-8 shadow-lg" style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
              <h3 className="text-3xl titles-font mb-6 creamy tracking-tighter" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>Send Us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!inValid.name}       
                    helperText={inValid.name || ""}
                    InputLabelProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    InputProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&:hover fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f8f3e9',
                        },
                      },
                    }}
                  />
                </div>
                
                <div className="mb-6">
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!inValid.email}
                    helperText={inValid.email || ""}
                    InputLabelProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    InputProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&:hover fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f8f3e9',
                        },
                      },
                    }}
                  />
                </div>
                
                <div className="mb-6">
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    error={!!inValid.subject}
                    helperText={inValid.subject || ""}
                    InputLabelProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    InputProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&:hover fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f8f3e9',
                        },
                      },
                    }}
                  />
                </div>
                
                <div className="mb-6">
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    error={!!inValid.message}
                    helperText={inValid.message || ""}
                    InputLabelProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    InputProps={{
                      style: { color: '#f8f3e9' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&:hover fieldset': {
                          borderColor: '#f8f3e9',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f8f3e9',
                        },
                      },
                    }}
                  />
                </div>
                
                <Button 
                  type="submit"
                  variant="contained" 
                  size="large"
                  fullWidth
                  style={{ 
                    backgroundColor: '#2c0101', 
                    textTransform: 'none', 
                    padding: '12px', 
                    fontSize: '1.1rem',
                    color: '#f8f3e9',
                    border: '1px solid #f8f3e9'
                  }}
                  className="btn"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}   
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl p-8 shadow-lg h-full" style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
              <h3 className="text-4xl titles-font mb-6 creamy tracking-tighter" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <LocationOn className="creamy mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold creamy mb-1">Address</h4>
                    <p className="text-gray-300">Algiers, Alger</p>
                    <p className="text-gray-300">Bordj El Kiffan , Dergana</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="creamy mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold creamy mb-1">Phone</h4>
                    <p className="text-gray-300">+213 XXXXXXXX</p>
                    <p className="text-gray-300">+213 XXXXXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Email className="creamy mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold creamy mb-1">Email</h4>
                    <p className="text-gray-300">nadzheeeSupport1@gmail.com</p>
                    <p className="text-gray-300">nadzheeeSupport2@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Schedule className="creamy mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold creamy mb-1">Business Hours</h4>
                    <p className="text-gray-300">Saturday - Wednesday: 9AM - 6PM</p>
                    <p className="text-gray-300">Thuesday: 10AM - 3PM</p>
                    <p className="text-gray-300">Friday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-semibold creamy mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['Instagram','Facebook' ].map((social) => (
                    <div 
                      key={social}
                      className="border border-creamy text-creamy px-4 py-2 rounded-full cursor-pointer hover:bg-creamy hover:text-[#2c0101] transition-colors"
                      
                    >
                      {social}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl p-8 shadow-lg" style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
          <h3 className="text-4xl titles-font mb-6 creamy tracking-tighter text-center" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>Find Us</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1735.1554019381995!2d3.2428107153839907!3d36.77819809423424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e4f294680e335%3A0x1292df2e4508a8be!2sELETROMENAGERS%20AUX%20MEILLEURS%20PRIX!5e1!3m2!1sen!2sdz!4v1758467413549!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 mt-16">
        <h3 className="text-4xl titles-font text-center mb-10 creamy" style={{ textShadow: '-1px -3px 6px rgba(255, 255, 255, 0.8)' }}>Frequently Asked Questions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How long does shipping take?",
              answer: "We typically process orders within 1 business day. Standard shipping takes 2-3 business days."
            },
            {
              question: "What is your return policy?",
              answer: "We offer a 30-day return policy for unused items in their original packaging. Please see our Returns page for details."
            }
          ].map((faq, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl p-6 shadow-lg"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            >
              <h4 className="text-lg font-semibold creamy mb-3">{faq.question}</h4>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}