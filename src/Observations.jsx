import { useEffect, useState } from "react";
import './Observations.css';
import Map from "./Map";

function Observations() {
    const [observations, setObservations] = useState({ "Items": [] });

    const [verificationRating, setVerificationRating] = useState('1'); // 1 for default rating.

    const [message, setMessage] = useState('');

    const [obs, setObs] = useState({
        "observationImageURL": {
            "S": "https://via.placeholder.com/300"
        },
        "Notes": {
            "M": {
                "description": {
                    "S": "This is a placeholder observation"
                },
                "cover": {
                    "S": ""
                },
                "acres": {
                    "S": ""
                }
            }
        },
        "ObservationID": { "S": "" },
        "VerificationRating": { "N": "1" },
        "coords": {
            "M": {
                "latitude": {
                    "S":""
                },
                "longitude": {
                    "S":""
                }
            }
        },
        "timestamp": { "N": ""}
    });

    const [obsId, setObservationId] = useState(0);

    useEffect(() => {
        fetch("https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/Verify/Verify", {
            method: 'GET',
            mode: 'cors',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setObservations(data);
                setObs(data.Items[0]);

                data.Items.forEach(observation => {
                    const sanitizedURL = sanitizeURL(observation.observationImageURL.S);
                })
            });
    }, []);

    function sanitizeURL(url){
        const validChars = /^[a-zA-Z0-9_:/]+$/;
        if(!validChars.test(url)){
            return "https://via.placeholder.com/300";
        }
        return url;
    }

    function nextObservation() {
        if (observations.Items && obsId < observations.Items.length - 1) {
            setObs(observations.Items[obsId + 1]);
            setObservationId(obsId + 1);
        }
    }

    function prevObservation() {
        if (obsId > 0) {
            setObs(observations.Items[obsId - 1]);
            setObservationId(obsId - 1);
        }
    }


    function handleVerificationRating(rating) {
        if (rating === '0') {
            if (window.confirm('Are you sure you want to mark this as "Not Cheatgrass"?')) {
                sendVerificationRating(rating);
                nextObservation();
            }
        } else {

            sendVerificationRating(rating);
        }
    }

    function sendVerificationRating(rating) {
        setVerificationRating(rating); // Update the rating state

        var o = observations;
        o.Items[obsId].VerificationRating.N = rating;
        setObservations(o);


        //0- no 1- default 2- yes 3- maybe
        //0 - delete reqeust, send delete request with observation ID and user id fields
        //2 - send post request with observation id, user id, and VefificationRating =2 
        //3 - send post request with observation id, user id, and VefificationRating =3 
        // Update the rating state

        const payload = {
            ObservationID: obs.ObservationID.S,
            UserID: obs.UserID.S,
            VerificationRating: rating,
        };

        if(rating === '0'){
            const deletePayload = {
                ObservationID: obs.ObservationID.S,
                UserID: obs.UserID.S,
            };
            fetch("https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/Verify/Verify", {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deletePayload),
            })
            .then(response => response.json())
            .then(data => {
                setMessage("Success");
            })
            .catch((error) => {
                setMessage("Error: " + error.message);
            });
        }
        else if(rating === '2' || rating === '3'){
            console.log("rating is 2 or 3");

            fetch("https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/Verify/Verify", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.json())
            .then(data => {
                setMessage("Success");
            })
            .catch((error) => {
                setMessage("Error: " + error.message);
            }); 
        }
    }

    function selectedVerification(verify) {
        if (obs.VerificationRating.N == verify) {
            return "selected-rating";
        }
        return "";
    }

    function currentRating() {
        switch (obs.VerificationRating.N) {
            case '0':
                return "Not Cheatgrass";
            case '1':
                return "Not chosen";
            case '2':
                return "Cheatgrass";
            case '3':
                return "Maybe Cheatgrass";
            default:
                return "Unknown";
        }
    }

    function convertUnixTimestamp(timestamp) {
        const timestampMilliseconds = /^\d+\.\d+$/.test(timestamp) ? parseFloat(timestamp) : parseInt(timestamp);
        if (isNaN(timestampMilliseconds)) {
            return "Invalid Date";
        }
        const date = new Date(timestampMilliseconds);
        return date.toDateString();
    }
    
    return (
        <>
            <div className="app-container">
                <Map coordinates={{ latitude: parseFloat(obs.coords.M.latitude.S), longitude: parseFloat(obs.coords.M.longitude.S)}} />
                <div className="flex-container">
                    <img className="observation-image" src={obs.observationImageURL.S} alt="Observation"></img>
                    <div className="details-container">
                        <div><b>Observation {obsId + 1} of {observations.Items.length}</b></div>
                        <div><b>Current Rating: </b>{currentRating()}</div>
                        <div className="button-group">
                            <button className={"btn not-cheatgrass " + selectedVerification(0)} onClick={() => handleVerificationRating('0')}>Not Cheatgrass</button>
                            <button className={"btn maybe-cheatgrass " + selectedVerification(3)} onClick={() => handleVerificationRating('3')}>Maybe Cheatgrass</button>
                            <button className={"btn cheatgrass " + selectedVerification(2)} onClick={() => handleVerificationRating('2')}>Cheatgrass</button>
                        </div>
                        <div className="button-group">
                            <button disabled={obsId == 0} onClick={prevObservation}>Previous</button>
                            <button onClick={nextObservation}>Next</button>
                        </div>
                        <div className="details"><b>Notes:</b> {obs.Notes.M.description.S}</div>
                        <div><b>Cover: </b> {obs.Notes.M.cover.S}</div>
                        <div><b>Acres: </b> {obs.Notes.M.acres.S}</div>
                        <div><b>Observation ID: </b>{obs.ObservationID.S}</div>
                        <div><b>Longitude: </b>{obs.coords.M.longitude.S}</div>
                        <div><b>Latidude: </b>{obs.coords.M.latitude.S}</div>
                        <div><b>Date: </b>{convertUnixTimestamp(obs.timestamp.S)}</div>
                        <div className="message">{message}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Observations;
