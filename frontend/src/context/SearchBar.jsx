import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from './ShopContext';
import { assets } from '../assets/frontend_assets/assets';

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible,setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes('collection')){
      setVisible(true);
    }else{
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-gray-100 border-t border-b py-4 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">

        {/* Search Input */}
        <div className="flex items-center w-full sm:flex-1 bg-white rounded-full shadow-md px-4 py-2 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder-gray-400"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 opacity-60 ml-2"
          />
        </div>

        {/* Close Icon */}
        <button
          onClick={() => setShowSearch(false)}
          className="w-8 h-8 p-2 rounded-full bg-white shadow hover:bg-gray-200 transition"
          title="Close search"
        >
          <img
            src={assets.cross_icon}
            alt="close"
            className="w-full h-full object-contain opacity-70 hover:opacity-100"
          />
        </button>
      </div>
    </div>
  ) : null;
}

export default SearchBar;
