import React from 'react';

const PatientList = ({ patients, onSelect }) => {

    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() -  new Date(birthday).getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <div className="w-1/3 p-4">
            <h2 className="text-xl font-semibold mb-4">Patients</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} className="mb-2 flex justify-between items-center">
                        <div>
                            <span className="font-bold">{patient.firstname} {patient.lastname}</span>
                            <span className="text-gray-600">, {_calculateAge(patient.birthdate)}, {patient.gender}</span>
                        </div>
                        <button
                            onClick={() => onSelect(patient)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            View
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
