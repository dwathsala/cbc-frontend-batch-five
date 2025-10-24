export default function ImageSlider(props) {

    const images = props.images;

    return (
        <div className="w-[500px] h-[600px] bg-red-900">
            <img className="w-full h-[500px]" src="" alt="" />
            <div className="w-full h-[100px] flex justify-center items-center">
                {images?.map( //? if there is images then only map
                    (image,index) => {
                        return (    
                            <img className="w-[80px] h-[80px] m-2 rounded-2xl cursor-pointer" src={image} />
                        )
                    }
                )}
            </div>
        </div>
    );
}