'use client';

import axios from 'axios';

export default function DeleteProductButton({
    id,
    fetchProducts,
}: {
    id: string;
    fetchProducts: () => Promise<void>;
}) {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            await fetchProducts();
        } catch (error) {
            console.error('Delete failed', error);
        }

        fetchProducts()
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow"
        >
            Delete
        </button>

    );
}
