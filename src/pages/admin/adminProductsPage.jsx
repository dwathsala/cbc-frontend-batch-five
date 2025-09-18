import { sampleProucts } from "../../assets/sampleData";

export default function AdminProductsPage() {
    const [products, setProducts] = useState(sampleProucts); 

    return(
        <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll">
            <div className="w-40px h-[1600px] border-[5px] border-blue-900"></div>
        </div>
    )
}