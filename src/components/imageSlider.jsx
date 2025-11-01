import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="w-[500px] h-[600px] bg-red-900">
            <img src={images[currentIndex]} className="w-full h-[500px] object-cover" /> 
            <div className="w-full h-[100px] flex justify-center items-center">
                {images?.map( //? if there is images then only map
                    (image,index) => {
                        return (    
                            <img className={"w-[80px] h-[80px] m-2 rounded-2xl cursor-pointer object-cover" }src={image} />
                        )
                    }
                )}
            </div>
        </div>
    );
}