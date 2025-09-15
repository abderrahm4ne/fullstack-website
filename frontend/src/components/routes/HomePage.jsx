import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-6 mb-20">

      {/* Left Section */}
      <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-md gap-2">

        <h1 className="text-7xl font-logo tracking-wide">
          With // // //
        </h1>
        <p className="text-gray-600 fonts-routes">
          “Own a piece of history today, Where timeless value meets your style And because true style never ages.”
        </p>
        <Button size="lg" variant='contained' style={{ backgroundColor: '#2c0101', textTransform: 'none', padding: '10px 20px', fontSize: '1rem', marginTop: '10px', width: '100%', textAlign: 'center' }} onClick={() => (navigate('/products'))}>
          Order Now
        </Button>

      </div>

      {/* Right Section (Slider) */}
      <div className="mt-10 md:mt-0 md:ml-12 w-full max-w-lg">
        
      </div>
    </div>
  );
}