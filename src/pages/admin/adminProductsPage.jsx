import { useState } from "react";
import { sampleProducts } from "../../assets/sampleData";

export default function AdminProductsPage() {

    const [products, setProducts] = useState(sampleProducts)

    return(
        <div className="w-full h-full max-h-full overflow-y-scroll">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Labelled Price</th>
                        <th>Price</th>
                        <th>Stock</th> 
                    </tr> 
                </thead>

                <tbody>
                    <tr>
                        <td>COS006</td>
                        <td>Hydrating Facial Cleanser</td>
                        <td>
                            <img src="https://example.com/images/cleanser1.jpg" className="w-[50px] h-[50px] object-cover" />
                        </td>
                        <td>$20.99</td>
                        <td>$18.99</td>
                        <td>50</td>
                    </tr>

                    <tr>
                        <td>COS007</td>
                        <td>Matte Liquid Lipstick</td>
                        <td>
                            <img src="https://example.com/images/lipstick1.jpg" className="w-[50px] h-[50px] object-cover" />
                        </td>
                        <td>$15.00</td>
                        <td>$12.50</td>
                        <td>120</td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}