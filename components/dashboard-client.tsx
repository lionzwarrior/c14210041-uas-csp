'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product, User } from '../app/global';
import LogoutButton from './logout-button';
import EditProductButton from './edit-product-button';
import DeleteProductButton from './delete-product-button';
import CreateProductButton from './create-product-button';

export default function DashboardClient({ id }: { id: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [edit, setEditing] = useState<{ id: string, editing: boolean }[]>([])
    const [create, setCreating] = useState<boolean>(false);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const namaProduk = formData.get("nama_produk")
        const hargaSatuan = formData.get("harga_satuan")
        const quantity = formData.get("quantity")
        await axios.post("http://localhost:5000/products", { nama_produk: String(namaProduk), harga_satuan: Number(hargaSatuan), quantity: Number(quantity) })

        fetchProducts();
        createToggle();
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const id = formData.get("id");
        const namaProduk = formData.get("nama_produk")
        const hargaSatuan = formData.get("harga_satuan")
        const quantity = formData.get("quantity")
        await axios.patch(`http://localhost:5000/products/${id}`, { nama_produk: String(namaProduk), harga_satuan: Number(hargaSatuan), quantity: Number(quantity) });

        id ? editToggle(id.toString()) : ""

        fetchProducts();
    };

    const createToggle = () => {
        setCreating(!create);
    }

    const editToggle = (id: string) => {
        setEditing(prev =>
            prev.map(product =>
                product.id === id
                    ? { ...product, editing: !product.editing }
                    : product
            )
        );
    };

    const fetchProducts = async () => {
        const res = await axios.get<Product[]>("http://localhost:5000/products");
        setProducts(res.data)
        const initializedEdit = res.data.map((product) => ({
            id: product.id,
            editing: false
        }));
        setEditing(initializedEdit);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get<User>(`http://localhost:5000/users/${id}`);
            setUser(res.data);
        };

        fetchUser();
        fetchProducts();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome, {user.username}</h1>

                {user.role === 'admin' ? <div className="flex justify-end">
                    {create ? (
                        <>
                            <CreateProductButton createToggle={createToggle} text="Cancel" />
                            <form
                                onSubmit={handleCreate}
                                className="mt-4 w-full bg-white p-6 rounded-lg shadow space-y-4"
                            >
                                <div>
                                    <label htmlFor="input-nama-produk" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Produk
                                    </label>
                                    <input
                                        type="text"
                                        id="input-nama-produk"
                                        name="nama_produk"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="input-harga-satuan" className="block text-sm font-medium text-gray-700 mb-1">
                                        Harga Satuan
                                    </label>
                                    <input
                                        type="number"
                                        id="input-harga-satuan"
                                        name="harga_satuan"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="input-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="input-quantity"
                                        name="quantity"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </form>
                        </>
                    ) : (
                        <CreateProductButton createToggle={createToggle} text="Add Products" />
                    )}
                </div> : ""}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow text-sm">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="text-left px-4 py-2">Nama Produk</th>
                                <th className="text-left px-4 py-2">Harga Satuan</th>
                                <th className="text-left px-4 py-2">Quantity</th>
                                {user.role === 'admin' && <th className="text-left px-4 py-2">Aksi</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {user.role === 'admin'
                                ? products.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        {edit.find((item) => item.id === product.id)?.editing ? (
                                            <td colSpan={4} className="px-4 py-2">
                                                <form onSubmit={handleEdit} className="space-y-2">
                                                    <input name="id" value={product.id} hidden readOnly />
                                                    <input
                                                        type="text"
                                                        name="nama_produk"
                                                        value={product.nama_produk}
                                                        onChange={(e) =>
                                                            setProducts((prev) =>
                                                                prev.map((p) => (p.id === product.id ? { ...p, nama_produk: e.target.value } : p))
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="harga_satuan"
                                                        value={product.harga_satuan}
                                                        onChange={(e) =>
                                                            setProducts((prev) =>
                                                                prev.map((p) => (p.id === product.id ? { ...p, harga_satuan: +e.target.value } : p))
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                            setProducts((prev) =>
                                                                prev.map((p) => (p.id === product.id ? { ...p, quantity: +e.target.value } : p))
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                                    />
                                                    <div className="flex space-x-2 mt-2">
                                                        <button
                                                            type="submit"
                                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                        >
                                                            Submit
                                                        </button>
                                                        <EditProductButton id={product.id} editToggle={editToggle} text="Cancel" />
                                                    </div>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-4 py-2">{product.nama_produk}</td>
                                                <td className="px-4 py-2">{product.harga_satuan}</td>
                                                <td className="px-4 py-2">{product.quantity}</td>
                                                <td className="px-4 py-2 space-x-2">
                                                    <EditProductButton id={product.id} editToggle={editToggle} text="Edit" />
                                                    <DeleteProductButton id={product.id} fetchProducts={fetchProducts} />
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                                : products.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        <td className="px-4 py-2">{product.nama_produk}</td>
                                        <td className="px-4 py-2">{product.harga_satuan}</td>
                                        <td className="px-4 py-2">{product.quantity}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
