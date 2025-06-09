import React, { useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import axios from 'axios';
import { backendUrl } from '../App'
import { toast } from 'react-toastify';

function Add({token}) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubcategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subcategory);
      formData.append('price', price);
      formData.append('bestseller', bestseller);  
      formData.append('sizes', JSON.stringify(selectedSizes));
      
      image1 &&  formData.append('image1', image1);
      image2 &&  formData.append('image2', image2);
      image3 &&  formData.append('image3', image3);
      image4 &&  formData.append('image4', image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData,{headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-6">

      {/* Image Upload */}

      <div>
        <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Upload Product Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

          {/* Image 1 */}
          <label
            htmlFor="image1"
            className="relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all overflow-hidden flex items-center justify-center bg-gray-50"
          >
            {image1 ? (
              <img
                src={URL.createObjectURL(image1)}
                alt="Preview 1"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 font-medium text-sm">
               Upload Image 1
              </span>
            )}
            <input
              type="file"
              id="image1"
              accept="image/*"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          {/* Image 2 */}
          <label
            htmlFor="image2"
            className="relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all overflow-hidden flex items-center justify-center bg-gray-50"
          >
            {image2 ? (
              <img
                src={URL.createObjectURL(image2)}
                alt="Preview 2"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 font-medium text-sm">
                Upload Image 2
              </span>
            )}
            <input
              type="file"
              id="image2"
              accept="image/*"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>

          {/* Image 3 */}
          <label
            htmlFor="image3"
            className="relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all overflow-hidden flex items-center justify-center bg-gray-50"
          >
            {image3 ? (
              <img
                src={URL.createObjectURL(image3)}
                alt="Preview 3"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 font-medium text-sm">
                Upload Image 3
              </span>
            )}
            <input
              type="file"
              id="image3"
              accept="image/*"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>

          {/* Image 4 */}
          <label
            htmlFor="image4"
            className="relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all overflow-hidden flex items-center justify-center bg-gray-50"
          >
            {image4 ? (
              <img
                src={URL.createObjectURL(image4)}
                alt="Preview 4"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 font-medium text-sm">
                 Upload Image 4
              </span>
            )}
            <input
              type="file"
              id="image4"
              accept="image/*"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>

        </div>
      </div>




      {/* Product Name */}
      <div>
        <p className="mb-1 font-medium text-gray-700">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-1 font-medium text-gray-700">Description</p>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      {/* Category and Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="mb-1 font-medium text-gray-700">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-1 font-medium text-gray-700">Subcategory</p>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="mb-1 font-medium text-gray-700">Price (₹)</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Available Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <p
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 border rounded-md cursor-pointer transition select-none ${selectedSizes.includes(size)
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50'
                }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="bestseller" className="text-sm font-medium text-gray-700">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full sm:w-40 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
        >
          ADD
        </button>
      </div>
    </form>
  );
}

export default Add;
