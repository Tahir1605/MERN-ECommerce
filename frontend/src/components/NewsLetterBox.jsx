import React from 'react';

function NewsLetterBox() {
  const onSubmitHandler = (e) => {
         e.preventDefault()
  }
  return (
    <div className="py-10 px-5 sm:px-10 lg:px-20 rounded-2xl mx-4 sm:mx-8 lg:mx-20 my-12">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-snug">
          Subscribe now & get <span className="text-black">20% off</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
          Stay updated with our latest collections, exclusive offers, and special discounts.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto px-2">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full md:flex-1 px-5 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 rounded-md bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
