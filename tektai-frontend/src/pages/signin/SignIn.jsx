import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'challenger'
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.email !== '' && input.password !== '') {
      try {
        // Extract email and password from input state
        const { email, password } = input;
  
        // Make a POST request to get the token
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }), // Send username and password
        });
  
        // Parse response
        const data = await response.json();
  
        // Check if token exists in response
        if (data && data.access_token) {
          const { access_token } = data;
  
          // Save token to localStorage
          localStorage.setItem('token', access_token);
  
          // Fetch user data using the token
          const userResponse = await fetch(`http://localhost:3000/auth/getuser?username=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
  
          // Parse user data
          const userData = await userResponse.json();
  
          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(userData));
  
          // Redirect to admin page after successful login
          window.location.href = '/admin';
        } else {
          console.error('Token not found in response');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      alert('Please provide a valid input');
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. We exist to make entrepreneurism easier.</h1>
              </div>
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="text" name="email" onChange={handleInput} className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <Link to="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
                      </div>
                      <input id="password" type="password" name="password" onChange={handleInput} className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">Keep me signed in</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
