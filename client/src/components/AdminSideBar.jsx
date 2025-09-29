import React from "react";
import { Home, PlusCircle, Package, ShoppingCart } from "lucide-react";

const AdminSideBar = ({data}) => {
  const {name, email, role, imageUrl} = data;
  function handleLogout(){
    localStorage.removeItem('jwtToken');
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col p-6 shadow-lg">
      
      {/* Top Section */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={imageUrl}
          alt="Admin Avatar"
          className="w-20 h-20 rounded-full border-4 border-gray-700 shadow-md"
        />
        <h2 className="mt-4 text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-400">{email}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <a
          href="/admin"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Home size={20} /> <span>Dashboard</span>
        </a>

        <a
          href="/admin/add-product"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <PlusCircle size={20} /> <span>Add Product</span>
        </a>

        <a
          href="/admin/manage-products"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Package size={20} /> <span>Manage Products</span>
        </a>

        <a
          href="/admin/orders"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <ShoppingCart size={20} /> <span>Orders</span>
        </a>
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto pt-6">
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
