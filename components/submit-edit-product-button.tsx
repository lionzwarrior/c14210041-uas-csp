import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Product } from "../app/global";

export default function SubmitEditProductButton({ id, setProducts }: { id: string, setProducts: Dispatch<SetStateAction<Product[]>> }) {
    const handleDeleteProduct = async () => {
        axios.delete(`http://localhost:5000/products/${id}`)

        const updatedProducts = await axios.get("http://localhost:5000/products")
        setProducts(updatedProducts.data)
    }

    return (
        <button
            onClick={handleDeleteProduct}
            className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition-colors shadow-sm"
        >
            Delete
        </button>

    );
}
