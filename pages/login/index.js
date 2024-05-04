import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action/authAction';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation
        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }

        // Dispatch login action
        dispatch(login({ email, password }));
    };

    // Function to handle label animation
    const handleLabelAnimation = (e) => {
        const label = e.target.previousElementSibling;
        label.classList.add('label-active');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-purple-500">
            <div className="container mx-auto bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 shadow-md">
                <div className="left hidden md:flex justify-center items-center flex-col p-10 m-30">
                    <img src="/login.svg" alt="login" className="w-80" />
                </div>
                <div className="right flex justify-center items-center flex-col p-10 m-30">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-800">Admin Login</h3>
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="icon-container relative">
                            <i className="fas fa-envelope absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="text" placeholder='Email' name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-0 border-solid border-gray-300 rounded-lg p-3 w-full bg-gray-200 focus:bg-gray-300 transition-colors duration-300 focus:outline-none" onFocus={handleLabelAnimation} onBlur={(e) => e.target.previousElementSibling.classList.remove('label-active')} />
                        </div>
                        <div className="icon-container relative mt-4">
                            <i className="fas fa-lock absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="password" placeholder='Password' name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-0 border-solid border-gray-300 rounded-lg p-3 w-full bg-gray-200 focus:bg-gray-300 transition-colors duration-300 focus:outline-none" onFocus={handleLabelAnimation} onBlur={(e) => e.target.previousElementSibling.classList.remove('label-active')} />
                        </div>
                        <input type="submit" value="LOGIN" className="btn bg-green-500 text-white mt-4 w-full py-3 rounded-lg transition-colors duration-300 hover:bg-green-600" />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                    <div className="text mt-6 text-xs text-gray-600">
                        {/* Uncomment or modify as needed */}
                        {/* <p>Forgot <span className="text-green-500 font-semibold">Username / Password ?</span></p>
                        <a href="#" className="mt-2 block text-center"><span className="text-green-500 font-semibold">Create your account</span></a> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
