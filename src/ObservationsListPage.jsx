import React, { useEffect, useState } from "react";

function ObservationsListPage() {
    const [observations, setObservations] = useState([]);

    useEffect(() => { 
        fetch("https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/Verify/Verify",{
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data structure
            setObservations(data.Items);
        });
    }, []);

    return (
        <div>
            <h2>All Observations</h2>
            <ul>
                {observations.map((obs, index) => (
                    <li key={index}>
                        <p>{obs.ObservationID.S}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ObservationsListPage;
