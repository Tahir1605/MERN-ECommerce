import React from 'react';
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="px-2 sm:px-4 md:px-6 xl:px-10 py-10 bg-white text-gray-800">
      <h2 className="text-2xl md:text-3xl font-semibold mb-12 border-b-2 border-black inline-block">
        CONTACT <span className="font-bold">US</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.contact_img} // replace this with your actual image key
            alt="Contact Us"
            className="rounded-lg w-full shadow-md object-cover"
          />
        </div>

        {/* Contact Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Our Store</h3>
            <p className="text-sm leading-relaxed">
              54709 Wilms Station<br />
              Suite 350, Washington, USA<br />
              Tel: (415) 555-0132<br />
              Email: admin@forever.com
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Careers at Forever</h3>
            <p className="text-sm mb-3">
              Learn more about our teams and job openings.
            </p>
            <button className="px-5 py-2 border border-black rounded hover:bg-black hover:text-white transition duration-300 text-sm">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
