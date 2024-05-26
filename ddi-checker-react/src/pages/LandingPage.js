import React from 'react';
import { Link } from 'react-router-dom';
import DrugInteractionCheckerForm from '../components/DrugInteractionCheckerForm';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Check Drug Interactions</h2>
                <DrugInteractionCheckerForm />
                <div className="mt-4 text-center">
                    <p className="mb-2">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up here</Link>.</p>
                    <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>.</p>
                </div>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; 2024 DDI Check Tool</p>
            </footer>
        </div>
    );
};

export default LandingPage;
