import React from 'react';

const Orders = () => {
    const orders = [
        { id: 1, product: 'Product 1', quantity: 2 },
        { id: 2, product: 'Product 2', quantity: 1 },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Product</th>
                        <th className="border p-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{order.product}</td>
                            <td className="border p-2">{order.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
