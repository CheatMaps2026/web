import "../view-styles/VerificationViewStyle.css";
import {useCarouselViewModel} from "../view-models/useCarouselViewModel";
import {Carousel} from "../components/Carousel";
import {Observation} from "../model/observations";

type VerificationFn = (observation: Observation) => Promise<void> | void;

type controlProps = {
    verifyActiveObservation: (verifyFn: VerificationFn) => Promise<void>;
    not: (observation: Observation) => Promise<void>;
    maybe: (observation: Observation) => Promise<void>;
    yes: (observation: Observation) => Promise<void>;
}

const VerificationControls = ({verifyActiveObservation, not, maybe, yes}: controlProps) => {
    return (
        <div className="verification-controls">
            <button
                className="not-cheatgrass"
                onClick={() => verifyActiveObservation(not)}
            >
                Not cheatgrass
            </button>
            <button
                className="maybe-cheatgrass"
                onClick={() => verifyActiveObservation(maybe)}
            >
                Maybe cheatgrass
            </button>
            <button
                className="cheatgrass"
                onClick={() => verifyActiveObservation(yes)}
            >
                Cheatgrass
            </button>
        </div>
    )
}


export const CarouselView = () => {
    const {
        loading,
        activeIndex,
        currentObservations,
        daysBack,
        setDaysBack,
        isVerified,
        next,
        prev,
        verifyActiveObservation,
        labelMaybeCheatgrass,
        labelYesCheatgrass,
        labelNotCheatgrass
    } = useCarouselViewModel();


    return (
        <div className="verification-view-root">
            {loading ? (
                <div>
                    <h1>Loading</h1>
                </div>
            ) : isVerified ? (
                <div className="verification-view">
                    <div className="instructions-container">
                        <h1>All observations pending review have been verified</h1>
                        <h2>Use the slider below to filter observations by time</h2>
                    </div>


                    <div className="slidecontainer">
                        <label className="slider-label" htmlFor="daysRange">
                            Showing {currentObservations.length} observations from the
                            last {daysBack} day{daysBack === 1 ? "" : "s"}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="365"
                            value={daysBack}
                            className="slider"
                            id="daysRange"
                            onChange={(e) => setDaysBack(Number(e.target.value))}
                        />
                    </div>

                    {currentObservations.length != 0 &&
                        <Carousel
                            observations={currentObservations}
                            activeIndex={activeIndex}>
                            <VerificationControls verifyActiveObservation={verifyActiveObservation}
                                                  maybe={labelMaybeCheatgrass} yes={labelYesCheatgrass}
                                                  not={labelNotCheatgrass}/>
                        </Carousel>}

                    <div className="carousel-navigation-controls">
                        <button onClick={prev} className="prev-button">
                            Previous
                        </button>
                        <button onClick={next} className="next-button">
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="verification-view">
                    <div className="instructions-container">
                        <h1>Verify the following observations</h1>
                    </div>

                    <Carousel
                        observations={currentObservations}
                        activeIndex={activeIndex}
                    >
                        <VerificationControls verifyActiveObservation={verifyActiveObservation}
                                              maybe={labelMaybeCheatgrass} yes={labelYesCheatgrass}
                                              not={labelNotCheatgrass}/>
                    </Carousel>

                    <div className="carousel-navigation-controls">
                        <button onClick={prev} className="prev-button">
                            Previous
                        </button>
                        <button onClick={next} className="next-button">
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


