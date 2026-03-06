import {Observation} from "../model/observations";
import "../view-styles/MapViewStyle.css"
import {InfoWindow} from "@react-google-maps/api";

type Props = {
    observation: Observation,
    imagePress: () => void,
}

export const CustomCalloutWindow = ({observation, imagePress}: Props) => {

    console.log(observation);
    return (
        <div className={"info-window-content"}>
            <div className={"info-window-card"}>
                <div className={"info-window-title-container"}>
                    <h3>{observation.position.coordinates!.length > 1 ? `Polygon Observation` : `Point Observation`}</h3>
                    <p>
                        ID: {observation.observationId}
                    </p>
                </div>

                <div className={"info-window-body"}>
                    <div className={"info-window-img-frame"}>
                        <img alt={`observation${observation.observationId}`}
                             src={observation.image}
                             className="info-window-img"
                             onClick={imagePress}/>
                    </div>
                    <div className={"info-window-description"}>
                        <div className={"info-window-info-container"}>
                            <p>notes: {observation.notes}</p>
                            <p>estimated area: {observation.estimatedArea} square meters</p>
                            <p>percent coverage: {observation.percentCoverage}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}