import "../view-styles/VerificationViewStyle.css"
import {useObservationStoreContext} from "../providers/ObservationsStoreProvider";
import {useEffect, useState} from "react";
import {Observation} from "../model/observations";
import {useApiClient} from "../providers/ApiClientProvider";
import {useVerificationFunctions} from "../view-models/useVerificationFunctions";

export const VerificationView = () => {
    const {observations, loading, error} = useObservationStoreContext();
    const [unverifiedObservations, setUnverifiedObservations] = useState<Observation[]>([]);
    const [allVerified, setAllVerified] = useState<boolean>(false);
    const apiClient = useApiClient();
    const {labelNotCheatgrass, labelMaybeCheatgrass, labelYesCheatgrass} = useVerificationFunctions({
        apiClient: apiClient
    })
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (loading) return;
        setUnverifiedObservations(observations.filter((observation) => observation.verificationRating == 0))
        console.log("unverifiedObservations", unverifiedObservations.length);
    }, [observations]);

    useEffect(() => {
        if (loading) return;
        setAllVerified(unverifiedObservations.length === 0)
    }, [unverifiedObservations]);

    const prev = () => {
        setActiveIndex((prevIndex) => prevIndex === 0 ? unverifiedObservations.length - 1 : prevIndex - 1);
    }

    const next = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === unverifiedObservations.length - 1 ? 0 : prevIndex + 1
        );
    }

    const removeActiveObservation = () => {
        setUnverifiedObservations((prev) => {
                if (prev.length === 0) return prev;
                const updated = prev.filter((_, index) => index !== activeIndex)

                setActiveIndex((currentIndex) => {
                    if (updated.length === 0) return 0;
                    if (currentIndex >= updated.length) return updated.length - 1
                    return currentIndex
                })
                return updated
            }
        )
    }

    const verifyActiveObservation = async (verifyFn: (observation: Observation) => Promise<void> | void,) => {
        const observation = unverifiedObservations[activeIndex];
        if (!observation) return;

        await verifyFn(observation);
        removeActiveObservation();
    }


    return (
        <div className={"verification-view-root"}>
            {loading ? (
                <div><h1>Loading</h1></div>
            ) : allVerified ? (
                <div className="verification-view">
                    <div className="instructions-container">
                        <h1>All observations have been verified</h1>
                    </div>
                </div>
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
                        <button className={"not-cheatgrass"}
                                onClick={() => verifyActiveObservation(labelNotCheatgrass)}>
                            Not cheatgrass
                        </button>
                        <button className={"maybe-cheatgrass"}
                                onClick={() => verifyActiveObservation(labelMaybeCheatgrass)}>
                            Maybe cheatgrass
                        </button>
                        <button className={"cheatgrass"}
                                onClick={() => verifyActiveObservation(labelYesCheatgrass)}>
                            Cheatgrass
                        </button>
                    </div>

                </div>


            )}


        </div>
    )
}