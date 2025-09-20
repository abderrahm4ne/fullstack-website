import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import aboutusimage from "../../assets/aboutusimage.jpg"
import aboutusimage1 from "../../assets/aboutusimage1.jpg"

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    description: "With over 15 years in the fashion industry, Alex brings visionary leadership to Traffic."
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    description: "Sarah's innovative designs have been featured in top fashion publications worldwide."
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Production Manager",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    description: "Michael ensures every piece meets our exacting standards of quality and craftsmanship."
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400",
    description: "Emma leads our team dedicated to providing exceptional service to our customers."
  }
];

// Values data
const values = [
  {
    title: "Craftsmanship",
    description: "Every piece is meticulously crafted with attention to detail and quality materials.",
    icon: "✨"
  },
  {
    title: "Timeless Style",
    description: "We create pieces that transcend trends and remain stylish for years to come.",
    icon: "⏳"
  },
  {
    title: "Sustainability",
    description: "We're committed to ethical production and minimizing our environmental impact.",
    icon: "🌱"
  },
  {
    title: "Heritage",
    description: "Our designs are inspired by classic aesthetics with a modern interpretation.",
    icon: "🏛️"
  }
];

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black text-white pb-20">
      

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-8 mb-5">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-logo mb-6 creamy" style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}>
            Our Story
          </h2>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img 
              src={aboutusimage} 
              alt="Our Workshop" 
              className="rounded-xl shadow-lg w-full h-auto"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-5xl font-logo mb-6 creamy">Beginning of an Era</h3>
            <p className="text-gray-300 text-xl mb-4">
              Founded in 2010, Traffic began as a small boutique with a vision to create timeless accessories 
              that blend heritage craftsmanship with contemporary design. Our founder, Alex Johnson, believed 
              that true style transcends fleeting trends.
            </p>
            <p className="text-gray-300 text-xl mb-4">
              What started as a passion project quickly grew into a respected brand known for quality and 
              attention to detail. Each piece in our collection is thoughtfully designed and meticulously 
              crafted to become a cherished part of your personal style story.
            </p>
            <p className="text-gray-300 text-xl ">
              Today, we continue to honor our founding principles while innovating and evolving to meet 
              the needs of the modern discerning customer.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-6 mb-20">
        <h3 className="text-3xl font-logo text-center mb-14 creamy">Our Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-[#2c0101] to-black rounded-xl p-6 text-center shadow-lg"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h4 className="text-xl font-semibold creamy mb-3">{value.title}</h4>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Craftsmanship Section */}
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="md:w-1/2">
            <img 
              src={aboutusimage1} 
              alt="Craftsmanship" 
              className="rounded-xl shadow-lg w-full h-auto"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-6xl font-logo mb-6 creamy">Our Craft</h3>
            <p className="text-gray-300 mb-4 text-3 text-6xlxl">
              At Traffic, we believe that true luxury lies in the details. Each piece is the result of 
              countless hours of design refinement and meticulous handcrafting by skilled artisans.
            </p>
            <p className="text-gray-300 mb-4 text-6xlxl">
              We source only the finest materials from trusted suppliers who share our commitment to 
              quality and sustainability. From premium leathers to precision movements, every component 
              is selected for its durability, beauty, and ethical provenance.
            </p>
            <p className="text-gray-300 text-6xlxl">
              Our process combines time-honored techniques with modern innovation, resulting in pieces 
              that are both classic and contemporary, designed to be treasured for generations.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-12 text-center">
        <h3 className="text-3xl font-logo mb-6 creamy">Experience Traffic</h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Discover the pieces that have made us a beloved brand for those who appreciate timeless style 
          and exceptional craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
            onClick={() => navigate("/products")}
          >
            View Collection
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            style={{ 
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
    </div>
  );
}