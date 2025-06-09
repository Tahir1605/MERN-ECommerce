import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

function List({token}) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + "/api/product/remove", { id } , {headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">All Products List</h2>

      {/* Table Header for medium and up */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 border border-gray-300 p-3 rounded-md text-sm font-semibold text-gray-700 mb-3">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-4">
        {list.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found.</p>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-1 border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Mobile View */}
              <div className="md:hidden flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      Array.isArray(item.images) && item.images[0]
                        ? item.images[0]
                        : "/default-product.jpg"
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-purple-700 font-semibold">
                      {currency}{item.price}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition">Edit</button>
                  <button className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex items-center justify-start">
                <img
                  src={
                    Array.isArray(item.images) && item.images[0]
                      ? item.images[0]
                      : "/default-product.jpg"
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              </div>
              <div className="hidden md:flex items-center text-gray-800 font-medium">{item.name}</div>
              <div className="hidden md:flex items-center text-gray-600">{item.category}</div>
              <div className="hidden md:flex items-center font-semibold text-purple-700">
                {currency}{item.price}
              </div>
              <div className="hidden md:flex items-center justify-center">
                <button onClick={() => removeProduct(item._id)} className="bg-red-600 text-white text-xs md:text-sm px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default List;
