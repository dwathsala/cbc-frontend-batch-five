import { useParams } from "react-router-dom"

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    return (
        <div>This is overview page for product {productId}</div>
    )
}