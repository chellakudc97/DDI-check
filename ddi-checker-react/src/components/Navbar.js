import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">DDI Check Tool</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        {user ? (
                            <>
                                <li className="hover:underline">{user.firstname}</li>
                                {user.type === 'physician' && (
                                    <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                                )}
                            </>
                        ) : (
                            <>
                                <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
                                <li><Link to="/login" className="hover:underline">Login</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
