// import "../App.css"; // Temporarily commented out to resolve compilation error
// import logo from "../assets/logo (1).svg"; // Temporarily commented out to resolve compilation error
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Lock, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState('details'); // 'details', 'phone-otp', 'email-otp', 'success'
  const [phoneOtpTimer, setPhoneOtpTimer] = useState(0);
  const [emailOtpTimer, setEmailOtpTimer] = useState(0);

  // --- Start of Backend Integration Additions ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const API_URL = 'http://localhost:5000/api/auth';
  // --- End of Backend Integration Additions ---

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
    phoneOtp: '',
    emailOtp: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  useEffect(() => {
    let interval = null;
    if (phoneOtpTimer > 0) {
      interval = setInterval(() => {
        setPhoneOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  useEffect(() => {
    let interval = null;
    if (emailOtpTimer > 0) {
      interval = setInterval(() => {
        setEmailOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && (value.length > 10 || !/^\d*$/.test(value))) return;
    if (name === 'age' && (isNaN(value) || value > 120)) return;
    if ((name === 'phoneOtp' || name === 'emailOtp') && (value.length > 6 || !/^\d*$/.test(value))) return;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const { name, age, phone, email, city, state, password, confirmPassword } = formData;
    
    // Replaced alerts with setError for a non-blocking UI
    if (!name.trim()) { setError('Please enter your full name'); return false; }
    if (!age || age < 13) { setError('Please enter a valid age (minimum 13 years)'); return false; }
    if (!phone || phone.length !== 10) { setError('Please enter a valid 10-digit phone number'); return false; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address'); return false; }
    if (!city.trim()) { setError('Please enter your city'); return false; }
    if (!state) { setError('Please select your state'); return false; }
    if (password.length < 6) { setError('Password must be at least 6 characters long'); return false; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return false; }
    
    setError(''); // Clear previous errors
    return true;
  };
  
  // --- MODIFIED API FUNCTIONS ---

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, age: formData.age, phone: formData.phone, email: formData.email,
          city: formData.city, state: formData.state, password: formData.password
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Registration failed.');
      setCurrentStep('phone-otp');
      setPhoneOtpTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Login failed.');
      localStorage.setItem('authToken', data.token);
      setLoggedIn(true);
      handleModalClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/verify-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, phoneOtp: formData.phoneOtp })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Phone verification failed.');
      setCurrentStep('email-otp');
      setEmailOtpTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, emailOtp: formData.emailOtp })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Email verification failed.');
      localStorage.setItem('authToken', data.token);
      setLoggedIn(true);
      setCurrentStep('success');
      setTimeout(() => {
        handleModalClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (type) => {
    setIsLoading(true);
    setError('');
    let endpoint = type === 'phone' ? '/register' : '/verify-phone';
    let body = type === 'phone' 
      ? { phone: formData.phone, email: formData.email, resend: true }
      : { phone: formData.phone, phoneOtp: 'resend' }; // Backend knows 'resend' triggers email OTP

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Could not resend OTP.');
      
      if (type === 'phone') {
        setPhoneOtpTimer(60);
      } else {
        setEmailOtpTimer(60);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (isSignUp) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
  };
  
  // --- UNCHANGED UTILITY FUNCTIONS ---
  
  const resetForm = () => {
    setFormData({ name: '', age: '', phone: '', email: '', city: '', state: '', password: '', 
                  confirmPassword: '', phoneOtp: '', emailOtp: '' });
    setCurrentStep('details');
    setPhoneOtpTimer(0);
    setEmailOtpTimer(0);
    setError('');
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setShowLogin(false);
    setIsSignUp(false);
    resetForm();
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };
  
  // --- UNCHANGED RENDER LOGIC (with updated onClick handlers) ---

  const renderRegistrationStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" min="13" max="120" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number (10 digits)" maxLength="10" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-gray-400" /></div>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"><MapPin className="h-5 w-5 text-gray-400" /></div>
                <select name="state" value={formData.state} onChange={handleInputChange} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105 appearance-none bg-white" required>
                    <option value="">Select State</option>
                    {indianStates.map((state, index) => (<option key={index} value={state}>{state}</option>))}
                </select>
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="Password (min 6 characters)" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-125 transform transition-all duration-200">{showPassword ? (<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />) : (<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />)}</button>
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required />
            </div>
          </div>
        );
      case 'phone-otp':
        return (
          <div className="space-y-6 text-center">
            <div><Phone className="h-16 w-16 text-orange-500 mx-auto mb-4 animate-bounce" /><h3 className="text-lg font-semibold text-gray-800 mb-2">Verify Phone Number</h3><p className="text-gray-600 mb-4">Enter the OTP sent to <span className="font-semibold text-orange-600">+91 {formData.phone}</span></p></div>
            <div className="relative"><input type="text" name="phoneOtp" value={formData.phoneOtp} onChange={handleInputChange} placeholder="Enter 6-digit OTP" maxLength="6" className="w-full px-4 py-3 text-center text-xl font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required /></div>
            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentStep('details')} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">← Back</button>
              {phoneOtpTimer > 0 ? (<span className="text-orange-600 font-semibold">Resend in {phoneOtpTimer}s</span>) : (<button onClick={() => handleResendOtp('phone')} disabled={isLoading} className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-200">Resend OTP</button>)}
            </div>
            <button onClick={verifyPhoneOtp} disabled={isLoading || formData.phoneOtp.length !== 6} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50">{isLoading ? 'Verifying...' : 'Verify Phone'}</button>
          </div>
        );
      case 'email-otp':
        return (
          <div className="space-y-6 text-center">
            <div><Mail className="h-16 w-16 text-orange-500 mx-auto mb-4 animate-bounce" /><h3 className="text-lg font-semibold text-gray-800 mb-2">Verify Email Address</h3><p className="text-gray-600 mb-4">Enter the OTP sent to <span className="font-semibold text-orange-600">{formData.email}</span></p></div>
            <div className="relative"><input type="text" name="emailOtp" value={formData.emailOtp} onChange={handleInputChange} placeholder="Enter 6-digit OTP" maxLength="6" className="w-full px-4 py-3 text-center text-xl font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required /></div>
            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentStep('phone-otp')} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">← Back</button>
              {emailOtpTimer > 0 ? (<span className="text-orange-600 font-semibold">Resend in {emailOtpTimer}s</span>) : (<button onClick={() => handleResendOtp('email')} disabled={isLoading} className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-200">Resend OTP</button>)}
            </div>
            <button onClick={verifyEmailOtp} disabled={isLoading || formData.emailOtp.length !== 6} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50">{isLoading ? 'Verifying...' : 'Verify Email'}</button>
          </div>
        );
      case 'success':
        return (
          <div className="space-y-6 text-center">
            <div><CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4 animate-bounce" /><h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3><p className="text-gray-600">Welcome to Mannka! Your account has been created successfully.</p></div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className=" bg-gray-50">
      <header className="header bg-white shadow-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="logo-container">
              {/* <img src={logo} alt="Temple Explorer Logo" /> */} {/* Temporarily commented out to resolve compilation error */}
              <div className="logo-text">
                <h1>Mannka</h1>
                <p>मन से मंदिर</p>
              </div>
            </div>
            {/* <nav>
              <a href="#">Home</a>
              <a href="#">Temples</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </nav> */}
             <div className="flex space-x-8">
            <Link to="/" className="text-yellow-500 hover:text-orange-200 transition duration-300 font-medium">
              Home
            </Link>
            <Link to="/temples" className="text-yellow-500 hover:text-orange-200 transition duration-300 font-medium">
              Temples
            </Link>
            <Link to="/about" className="text-yellow-500 hover:text-orange-200 transition duration-300 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-yellow-500 hover:text-orange-200 transition duration-300 font-medium">
              Contact
            </Link>
          </div>
            {loggedIn ? (
              <button onClick={handleLogout} className="book-btn text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Logout
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="book-btn text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 scale-100 backdrop-blur-sm bg-opacity-95 border border-orange-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
              <h2 className="text-2xl font-bold text-gray-800">{isSignUp ? (currentStep === 'details' ? 'Create Account' : currentStep === 'phone-otp' ? 'Phone Verification' : currentStep === 'email-otp' ? 'Email Verification' : 'Success!') : 'Welcome Back'}</h2>
              <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:rotate-90 transform hover:scale-125"><X size={24} /></button>
            </div>
            
            <div className="p-6">
              {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-md text-sm" role="alert">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                {!isSignUp ? (
                  <>
                    <div className="text-center mb-6"><p className="text-gray-600">Sign in to continue your spiritual journey</p></div>
                    <div className="space-y-4">
                      <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required /></div>
                      <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div><input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-105 focus:scale-105" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-125 transform transition-all duration-200">{showPassword ? (<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />) : (<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />)}</button></div>
                      <div className="text-right"><a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-all duration-200 hover:scale-105 transform inline-block">Forgot Password?</a></div>
                      <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50">{isLoading ? 'Signing In...' : 'Sign In'}</button>
                    </div>
                    <div className="my-6 flex items-center"><div className="flex-1 border-t border-gray-200"></div><span className="px-4 text-gray-500 text-sm">or</span><div className="flex-1 border-t border-gray-200"></div></div>
                    <button type="button" className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md"><svg className="w-5 h-5 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg><span className="text-gray-700 font-medium">Continue with Google</span></button>
                  </>
                ) : (
                  renderRegistrationStep()
                )}

                {currentStep !== 'success' && (
                  <div className="mt-6 text-center"><p className="text-gray-600">{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}<button type="button" onClick={toggleAuthMode} className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-200">{isSignUp ? "Sign In" : "Sign Up"}</button></p></div>
                )}
                
                {isSignUp && currentStep === 'details' && (
                  <button type="submit" disabled={isLoading} className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50">{isLoading ? 'Creating Account...' : 'Create Account'}</button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-200 rounded-lg p-4 max-w-sm shadow-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Demo Instructions</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click "Login" to open the modal.</li>
          <li>• Switch to "Sign Up" to test registration.</li>
          <li>• Backend is now connected. Check server console for OTPs.</li>
          <li>• All form validations are working.</li>
        </ul>
      </div>
    </div>
  );
}


