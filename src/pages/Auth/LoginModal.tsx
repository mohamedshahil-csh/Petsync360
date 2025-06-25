import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (e: React.FormEvent, username: string, password: string, role: string) => void;
    error?: string | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const role = 'parent';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await onLogin(e, username, password, role);
            setUsername('');
            setPassword('');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-[#ed2c59] mb-4">Login to Book</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Login</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2c59] text-sm"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed2c59] text-sm"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-[#ed2c59] hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don’t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-[#ed2c59] hover:underline"
                        onClick={onClose}
                    >
                        Sign Up
                    </Link>
                </p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm transition duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default LoginModal;