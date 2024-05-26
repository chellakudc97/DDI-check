import React, { useState } from 'react';
import axios from 'axios';

const DrugInteractionCheckerForm = () => {
    const [drug1, setDrug1] = useState('');
    const [drug2, setDrug2] = useState('');
    const [interactionResult, setInteractionResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3100/api/drugs/check', { drug1, drug2 });
            console.log(response);
            setInteractionResult(response.data.label);
        } catch (error) {
            console.error('Error checking interaction:', error);
            setInteractionResult('Error checking interaction');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Drug Interaction Checker
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the names of two drugs to check for interactions
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="drug1" className="sr-only">
                                Drug 1
                            </label>
                            <input
                                type="text"
                                id="drug1"
                                name="drug1"
                                value={drug1}
                                onChange={(e) => setDrug1(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Drug 1"
                            />
                        </div>
                        <div>
                            <label htmlFor="drug2" className="sr-only">
                                Drug 2
                            </label>
                            <input
                                type="text"
                                id="drug2"
                                name="drug2"
                                value={drug2}
                                onChange={(e) => setDrug2(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Drug 2"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Check Interaction
                        </button>
                    </div>
                </form>
                {interactionResult && (
                    <div className="mt-4 text-center">
                        <span className="text-lg text-gray-700">{interactionResult}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrugInteractionCheckerForm;
