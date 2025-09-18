import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Photo from '../Swipper/Photo.jsx';

export default function HomePage() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6  bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black pt-25 ">

      {/* Left Section */}
      <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-md gap-2">

        <h1 className="text-7xl font-logo tracking-wide text-white" style={{ textShadow: '-5px 7px 10px rgba(0, 0, 0, 1)' }}>
          With Nadzheee
        </h1>
        <p className="text-gray-400 fonts-routes italic" style={{ textShadow: '-5px 2px 10px rgba(0, 0, 0, 1)' }}>
          “Own a piece of history today. Where timeless value meets your style And because true style never ages.”
        </p>
        <Button size="lg" variant='contained' style={{ backgroundColor: '#2c0101', textTransform: 'none', padding: '10px 20px', fontSize: '1.3rem', marginTop: '10px', width: '100%', textAlign: 'center', color:"#f8f3e9", border:" 1px solid white" }} className='btn' onClick={() => (navigate('/products'))}>
          Order Now
        </Button>

      </div>

      {/* Right Section (Slider) */}
      <div className="mt-10 md:mt-0 md:ml-12 w-full max-w-lg">
        
        <Photo />
        
      </div>


    </div>
  );
}