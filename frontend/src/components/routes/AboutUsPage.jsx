import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import aboutusimage from "../../assets/aboutusimage.jpg"
import aboutusimage1 from "../../assets/aboutusimage1.jpg"


const values = [
  {
    title: "Refined Craftsmanship",
    description: "Each Nadzheee piece is carefully made with precision, premium fabrics, and lasting quality.",
    icon: "🪡"
  },
  {
    title: "Timeless Elegance",
    description: "Designed to outlive trends, our styles embody quiet luxury and enduring sophistication.",
    icon: "⏳"
  },
  {
    title: "Conscious Luxury",
    description: "We embrace responsible practices, ensuring elegance with respect for people and the planet.",
    icon: "🌿"
  },
  {
    title: "Heritage Redefined",
    description: "Rooted in classic aesthetics, Nadzheee blends tradition with modern refinement for the new era.",
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
              alt="Nadzheee" 
              className="rounded-xl shadow-lg w-full h-auto"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-5xl font-logo mb-6 creamy">Beginning of an Era</h3>
            <p className="text-gray-300 text-xl mb-4">
              Founded in 2024, Nadzheee was founded with a vision to celebrate elegance that never fades.
              Rooted in the spirit of sophistication, our brand draws inspiration from the classic old-money style—where heritage meets refinement. From tailored polos to timeless berets, every piece is crafted to embody quiet luxury, confidence, and enduring taste.
              At Nadzheee, we believe true style isn’t loud—it’s subtle, effortless, and everlasting.
            </p>
            <p className="text-gray-300 text-xl mb-4">
              Nadzheee began as a bold vision— a passion for creating timeless pieces inspired by classic elegance. Though still at the start of its journey, the brand is built on a commitment to quality, detail, and refined style. Every design is crafted with the ambition to grow into a name synonymous with sophistication, while offering pieces that inspire confidence and individuality.
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
        <h3 className="text-5xl md:text-6xl font-logo text-center mb-14 creamy">Our Values</h3>
        
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
              At Nadzheee, we believe true elegance is found in the details. Every piece is created with intention—designed to capture the spirit of timeless style and refined simplicity.
            </p>
            <p className="text-gray-300 mb-4 text-6xlxl">
              Rather than chasing trends, we focus on crafting accessories and essentials that embody quiet confidence, heritage inspiration, and a modern touch. Each design is made to feel enduring, versatile, and distinctly Nadzheee.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-12 text-center">
        <h3 className="text-5xl md:text-6xl font-logo mb-6 creamy">Experience Nadzheee</h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Discover the pieces that have made us a beloved brand for those who appreciate timeless style.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            className="bg-[#490101] px-6 py-3 text-[1.2rem] border-1 border-[#f8f3e9] rounded hover:bg-[#f8f3e9] hover:cursor-pointer hover:text-[#490101] transition-all"
            onClick={() => navigate("/products")}
          >
            View Collection
          </button>
          <button 
            className="bg-[#490101] px-6 py-3 text-[1.2rem] border-1 border-[#f8f3e9] rounded hover:bg-[#f8f3e9] hover:cursor-pointer hover:text-[#490101] transition-all"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}