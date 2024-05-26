import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PatientList from '../components/PatientList';
import PatientDetails from '../components/PatientDetails';
import PatientDropdown from '../components/PatientDropdown';

const DashboardPage = () => {
    const { user } = useContext(UserContext);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);


    useEffect(() => {
        const fetchPatients = async () => {
            if (user && user.type === 'physician') {
                try {
                    const response = await axios.post('http://localhost:3100/api/users/patients', { user });
                    setPatients(response.data);
                } catch (error) {
                    console.error('Error fetching patients:', error);
                }
            }
        };
        fetchPatients();
    }, [user]);

    const handleAddPatient = async (patientId) => {
        try {
            await axios.post(
                'http://localhost:3100/api/users/assign-patient',
                { patientId, physicianId: user._id },
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );
            // Refetch patients after adding
            const response = await axios.get('http://localhost:3100/api/users/patients', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setPatients(response.data);
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <main className="container mx-auto p-4">
                <div className="flex flex-col space-y-4" style={{minHeight:600}}>
                    <PatientDropdown onAddPatient={handleAddPatient} />
                    <div className="flex">
                        <PatientList patients={patients} onSelect={setSelectedPatient} />
                        {selectedPatient && <PatientDetails patient={selectedPatient} />}
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; 2024 DDI Check Tool</p>
            </footer>
        </div>
    );
};

export default DashboardPage;
