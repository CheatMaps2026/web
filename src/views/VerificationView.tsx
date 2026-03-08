import "../view-styles/VerificationViewStyle.css"
import {useObservationStoreContext} from "../providers/ObservationsStoreProvider";
import {useEffect, useState} from "react";
import {Observation} from "../model/observations";
import {useApiClient} from "../providers/ApiClientProvider";

export const VerificationView = () => {
    const {observations, loading, error} = useObservationStoreContext();
    const [unverifiedObservations, setUnverifiedObservations] = useState<Observation[]>([]);
    const apiClient = useApiClient();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (loading) return;
        setUnverifiedObservations(observations.filter((observation) => observation.verificationRating == 0))
        console.log("unverifiedObservations", unverifiedObservations.length);
    }, [observations]);

    const prev = () => {
        setActiveIndex((prevIndex) => prevIndex === 0 ? unverifiedObservations.length - 1 : prevIndex - 1);
    }

    const next = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === unverifiedObservations.length - 1 ? 0 : prevIndex + 1
        );
    }

    const labelNotCheatgrass = async () => {
        const {userId, observationId} = unverifiedObservations[activeIndex];
        const body = {
            verificationRating: 1
        }

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }

    const labelMaybeCheatgrass = async () => {
        const {userId, observationId} = unverifiedObservations[activeIndex];
        const body = {
            verificationRating: 3
        }

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }

    const labelYesCheatgrass = async () => {
        const {userId, observationId} = unverifiedObservations[activeIndex];
        const body = {
            verificationRating: 2
        }

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }


    return (
        <div className={"verification-view-root"}>
            {loading ? (
                <div><h1>Loading</h1></div>
            ) : (
                <div className="verification-view">
                    <div className={"instructions-container"}><h1>Verify the following observations</h1></div>
                    <div className="carousel-shell">
                        <button onClick={prev} className="prev-button">
                            Previous
                        </button>

                        <div className="observation-carousel-container">
                            <ul
                                className="observation-carousel"
                                style={{transform: `translateX(-${activeIndex * 100}%)`}}
                            >
                                {unverifiedObservations.map((observation) => (
                                    <li
                                        key={observation.observationId}
                                        className="observation-carousel-item"
                                    >
                                        <div className="carousel-image-container">
                                            <img
                                                className="carousel-image"
                                                alt={observation.observationId}
                                                src={observation.image}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={next} className="next-button">
                            Next
                        </button>
                    </div>
                    <div className={"verification-controls"}>
                        <button className={"not-cheatgrass"} onClick={labelNotCheatgrass}>
                            Not cheatgrass
                        </button>
                        <button className={"maybe-cheatgrass"} onClick={labelMaybeCheatgrass}>
                            Maybe cheatgrass
                        </button>
                        <button className={"cheatgrass"} onClick={labelYesCheatgrass}>
                            Cheatgrass
                        </button>
                    </div>

                </div>


            )}


        </div>
    )
}