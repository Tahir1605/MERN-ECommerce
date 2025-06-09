import React, { useContext, useEffect, useState } from 'react';
import { AtSign, Lock, User } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

     if( activeTab === 'signup'){

      const response = await axios.post(backendUrl + "/api/user/register",{name,email,password})
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      }else{
        toast.error(response.data.message);
      }
     }else{

      const response = await axios.post(backendUrl + "/api/user/login",{email,password})
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      }else{
        toast.error(response.data.message);
      }
   }

    } catch (error) {
      console.error(error);
      toast.error(error.message);

    }
  };

  useEffect(() => {
    if (token) {
      navigate('/'); 
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-2 transition-all duration-500">Welcome</h2>
        <p className="text-center text-gray-500 mb-6 transition-all duration-500">
          Sign in to your account or create a new one
        </p>

        {/* Tabs */}
        <div className="flex justify-between mb-6 border rounded overflow-hidden transition-all duration-500">
          <button
            className={`w-1/2 py-2 font-medium transition-all duration-300 ${activeTab === 'login'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600'
              }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-medium transition-all duration-300 ${activeTab === 'signup'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600'
              }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Animated Content Switch */}
          <div className="transition-all duration-500 ease-in-out animate-fade-in">
            {activeTab === 'signup' && (
              <div className="transition-opacity duration-500 opacity-100">
                <label className="block mb-1 text-sm font-medium">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="johndoe"
                    className="pl-10 py-2 px-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="transition-all duration-500 ease-in-out">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="pl-10 py-2 px-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="transition-all duration-500 ease-in-out">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 py-2 px-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {activeTab === 'login' && (
            <div className="text-right transition-opacity duration-300 ease-in">
              <button className="text-xs text-blue-500 hover:underline">Forgot password?</button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 relative text-center transition-all duration-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-full border-t"></span>
          </div>
          <span className="relative px-3 bg-white text-xs text-gray-400">Or continue with</span>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 transition-all duration-300">
          <button className="w-1/2 py-2 border rounded-md hover:bg-gray-50 transition">Google</button>
          <button className="w-1/2 py-2 border rounded-md hover:bg-gray-50 transition">GitHub</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
