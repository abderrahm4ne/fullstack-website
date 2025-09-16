import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const images = [
  img1,
  img2,
  img3
];

export default function Photo() {

  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // cleanup when component unmounts
  }, [current]);

  return (
    <div className="relative flex items-center justify-center ml-10 mb-20">

      <img
        src={images[(current + 1) % images.length]}
        alt="Behind Right"
        className="absolute w-[380px] h-[650px] ml-8 object-cover rounded-xl shadow-md opacity-70"
        style={{rotate: "3deg", boxShadow:"6px -3px 10px #333333"}}
      />

      <img
        src={images[(current + 2) % images.length]}
        alt="Behind Left"
        className="absolute w-[380px] h-[650px] mr-8 object-cover rounded-xl shadow-md opacity-70"
        style={{rotate: "-3deg", boxShadow:"-6px -3px 10px #333333"}}
      />

      <img
        src={images[current]}
        alt="Main"
        className="relative w-[380px] h-[700px] object-cover rounded-xl shadow-lg"
        style={{boxShadow:"0px 2px 10px #333333"}}
      />

      <div className="absolute -bottom-12 flex space-x-4">

        <NavigateBeforeIcon onClick={prevImage} className="creamy hover:cursor-pointer btn" style={{fontSize:"2rem"}}/>

        <NavigateNextIcon onClick={nextImage} className="creamy hover:cursor-pointer btn" style={{fontSize:"2rem"}}/>

      </div>
    </div>
  );
}
