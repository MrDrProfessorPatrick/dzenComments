import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function BigImage({ image, setShowBigImage }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center bg-black/90">
      <button
        onClick={() => setShowBigImage(false)}
        className="flex justify-center items-center w-6 h-6 absolute bg-white top-10 right-10 cursor-pointer"
      >
        <IoClose />
      </button>
      <img
        onClick={() => setShowBigImage(false)}
        src={image}
        alt={image}
        className={`cursor-pointer max-w-[90%] max-h-[90%] rounded-lg shadow-lg transition-transform duration-500 ease-out ${
          animate ? "scale-100 opacity-100" : "scale-65 opacity-0"
        }`}
      />
    </div>
  );
}
