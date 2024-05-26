// src/components/PatientDropdown.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDropdown = ({ onAddPatient }) => {
    const [allPatients, setAllPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState('');

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3100/api/users/all-patients');
                setAllPatients(response.data);
            } catch (error) {
                console.error('Error fetching all patients:', error);
            }
        };
        fetchAllPatients();
    }, []);

    const handleAddPatient = () => {
        onAddPatient(selectedPatientId);
    };

    return (
        <div className="flex items-center space-x-4">
            <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="border px-2 py-1 rounded"
            >
                <option value="" disabled>Select a patient</option>
                {allPatients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                        {patient.firstname} {patient.lastname}
                    </option>
                ))}
            </select>
            <button
                onClick={handleAddPatient}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Patient
            </button>
        </div>
    );
};

export default PatientDropdown;
