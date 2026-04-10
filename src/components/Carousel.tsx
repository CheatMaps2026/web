import {Observation} from "../model/observations";
import "../view-styles/VerificationViewStyle.css";

const verificationMap: Record<number, string> = {
    0: "UNVERIFIED",
    1: "NEGATIVE",
    2: "POSITIVE",
    3: "MAYBE"
}


type Props = {
    observations: Observation[];
    activeIndex: number;
    children: React.ReactNode;
};

export const Carousel = ({observations, activeIndex, children}: Props) => {
    const activeObservation = observations[activeIndex];

    return (
        <div className="carousel-container">
            <div className="carousel-shell">
                <div className="carousel-focus">
                    <ul
                        className="observation-carousel"
                        style={{transform: `translateX(-${activeIndex * 100}%)`}}
                    >
                        {observations.map((observation) => (
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

                <div className="carousel-side-panel">
                    <div className="carousel-info">
                        <h2 className="carousel-title">
                            Observation {activeObservation?.observationId}
                        </h2>

                        <div className="carousel-info-row">
                            <span className="info-label">Verification</span>
                            <span className="info-value">
                               {activeObservation
                                   ? verificationMap[activeObservation.verificationRating]
                                   : "N/A"}

                            </span>
                        </div>

                        <div className="carousel-info-row">
                            <span className="info-label">Coverage</span>
                            <span className="info-value">
                                {activeObservation?.percentCoverage ?? "N/A"}%
                            </span>
                        </div>

                        <div className="carousel-info-row">
                            <span className="info-label">Area</span>
                            <span className="info-value">
                                {activeObservation?.estimatedArea !== 0
                                    ? activeObservation?.estimatedArea
                                    : "N/A"}
                            </span>
                        </div>

                        <div className="carousel-notes">
                            <span className="info-label">Notes</span>
                            <p>{activeObservation?.notes || "No notes provided."}</p>
                        </div>
                    </div>

                    <div className="carousel-inline-controls">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
