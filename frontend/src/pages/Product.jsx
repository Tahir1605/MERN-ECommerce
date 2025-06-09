import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../components/RelatedProduct';
import { toast } from 'react-toastify';

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
      setSelectedSize(''); // no size selected by default
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Select Product Size');
      return;
    }
    addToCart(productData._id, selectedSize);
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-7xl mx-auto px-4">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border border-gray-300 rounded-md"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] flex justify-center items-center">
            <img src={image} className="w-full max-h-[500px] object-contain rounded-md" alt="Product" />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl mb-2">{productData.name}</h1>
          <p className="text-gray-600 mb-4">{productData.description}</p>

          <p className="text-xl font-medium mb-2">
            Price: <span className="text-green-600">{currency}{productData.price}</span>
          </p>

          <p className="mb-2 text-sm text-gray-500">
            Category: <span className="text-black font-medium">{productData.category}</span>
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Type: <span className="text-black font-medium">{productData.subCategory}</span>
          </p>

          {/* Sizes */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-1">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {allSizes.map((size, index) => {
                const available = productData.sizes.includes(size);
                return (
                  <button
                    key={index}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    className={`border px-4 py-1 rounded-full text-sm transition
                      ${
                        selectedSize === size && available
                          ? 'bg-black text-white'
                          : available
                          ? 'bg-white text-black border-gray-300 hover:bg-gray-100'
                          : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                      }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ********** Description & Review Section ********* */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Describe</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, quos distinctio id quia tempora et expedita dignissimos velit ratione temporibus. Magni earum facere error molestiae cupiditate modi pariatur quaerat praesentium?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi molestiae porro fuga facilis accusantium similique ratione at. Porro soluta praesentium at tempore, excepturi architecto voluptatum!</p>
        </div>
      </div>

      {/* Display Related Product */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
}

export default Product;
