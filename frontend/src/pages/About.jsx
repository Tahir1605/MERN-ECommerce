import React from 'react';
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="px-2 md:px-6 lg:px-6 py-12 bg-white text-gray-800">
      {/* About Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <img src={assets.about_img} alt="About Us" className="rounded-lg w-full shadow-md" />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 border-b-2 inline-block border-black">
            ABOUT <span className="font-bold">US</span>
          </h2>
          <p className="mb-4 text-justify">
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online.
            Our journey began with a simple idea: to provide a platform where customers can easily discover, explore,
            and purchase a wide range of products from the comfort of their homes.
          </p>
          <p className="mb-4 text-justify">
            Since our inception, we’ve worked tirelessly to curate a diverse selection of high-quality products that
            cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an
            extensive collection sourced from trusted brands and suppliers.
          </p>
          <h3 className="font-semibold text-lg mt-4 mb-2">Our Mission</h3>
          <p className="text-justify">
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We’re dedicated to
            providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery
            and beyond.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 border-b-2 inline-block border-black">
          WHY <span className="font-bold">CHOOSE US</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 border rounded shadow-sm hover:shadow-md transition duration-300">
            <h4 className="font-bold mb-2">Quality Assurance</h4>
            <p className="text-sm">
              We meticulously select and vet each product to ensure it meets our stringent quality standards.
            </p>
          </div>
          <div className="p-6 border rounded shadow-sm hover:shadow-md transition duration-300">
            <h4 className="font-bold mb-2">Convenience</h4>
            <p className="text-sm">
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
            </p>
          </div>
          <div className="p-6 border rounded shadow-sm hover:shadow-md transition duration-300">
            <h4 className="font-bold mb-2">Exceptional Customer Service</h4>
            <p className="text-sm">
              Our team of dedicated professionals is here to assist you every step of the way, ensuring your
              satisfaction is our top priority.
            </p>
          </div>
        </div>
      </section>
      <section>
        <NewsLetterBox/>
      </section>
    </div>
  );
};

export default About;
