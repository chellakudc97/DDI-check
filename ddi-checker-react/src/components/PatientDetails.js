import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDetails = ({ patient }) => {
    const [drugs, setDrugs] = useState([]);
    const [newDrug, setNewDrug] = useState('');
    const [interaction, setInteraction] = useState(null);
    const [allDrugs, setAllDrugs] = useState([]);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await axios.get(`'http://localhost:3100/api/users/patients/${patient._id}/drugs`);
                setDrugs(response.data);
                if (response.data.length > 1) {
                    checkAllInteractions(response.data);
                }
            } catch (error) {
                console.error('Error fetching drugs:', error);
            }
        };
        fetchDrugs();
    }, [patient]);

    useEffect(() => {
        const fetchAllDrugs = async () => {
            try {
                const response = await axios.get('http://localhost:3100/api/drugs');
                console.log(response);
                setAllDrugs(response.data);
            } catch (error) {
                console.error('Error fetching all drugs:', error);
            }
        };
        fetchAllDrugs();
    }, []);

    const checkAllInteractions = async (drugs) => {
        for (let i = 0; i < drugs.length; i++) {
            for (let j = i + 1; j < drugs.length; j++) {
                await checkInteraction(drugs[i].name, drugs[j].name);
            }
        }
    };

    const checkInteraction = async (drug1, drug2) => {
        try {
            const response = await axios.post('http://localhost:3100/api/drugs/check', { drug1, drug2 });
            setInteraction(response.data.label);
        } catch (error) {
            console.error('Error checking interaction:', error);
        }
    };

    const handleAddDrug = async () => {
        try {
            await axios.post(`http://localhost:3100/api/users/patients/${patient._id}/drugs`, { drugId: newDrug });
            setNewDrug('');
            setInteraction(null);
            const response = await axios.get(`http://localhost:3100/api/users/patients/${patient._id}/drugs`);
            setDrugs(response.data);
        } catch (error) {
            console.error('Error adding drug:', error);
        }
    };

    return (
        <div className="w-2/3 p-4">
            <h2 className="text-xl font-semibold mb-4">{patient.firstname} {patient.lastname}</h2>
            <div className="mb-4">
                <span className="font-bold">Age:</span> {patient.age}
            </div>
            <div className="mb-4">
                <span className="font-bold">Gender:</span> {patient.gender}
            </div>
            <div className="mb-4">
                <span className="font-bold">Drugs:</span>
                <ul>
                    {drugs.map((drug) => (
                        <li key={drug._id} className="mb-2">
                            {drug.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <select
                    value={newDrug}
                    onChange={(e) => setNewDrug(e.target.value)}
                    className="border px-2 py-1"
                >
                    <option value="">Select a drug</option>
                    {allDrugs.map((drug) => (
                        <option key={drug._id} value={drug._id}>
                            {drug.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddDrug} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Drug
                </button>
            </div>
            {interaction && (
                <div className="mt-4 p-4 border rounded bg-yellow-100">
                    <h3 className="text-lg font-semibold">Interaction</h3>
                    <p>{interaction}</p>
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
