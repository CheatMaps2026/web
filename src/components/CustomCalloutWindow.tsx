import {Observation} from "../model/observations";
import "../view-styles/MapViewStyle.css"
import {useVerificationFunctions} from "../view-models/useVerificationFunctions";

type Props = {
    observation: Observation,
    imageClick: () => void,
    apiClient: any
}

export const CustomCalloutWindow = ({observation, imageClick, apiClient}: Props) => {
    const {labelNotCheatgrass, labelMaybeCheatgrass, labelYesCheatgrass} = useVerificationFunctions({
        apiClient: apiClient
    })

    const getDate = (timestamp: number) => {
        return new Date(timestamp).toString();
    }

    return (
        <div className={"info-window-content"}>
            <div className={"info-window-card"}>
                <div className={"info-window-title-container"}>
                    <h3>{observation.position.coordinates!.length > 1 ? `Polygon Observation` : `Point Observation`}</h3>
                    <p>
                        ID: {observation.observationId}
                    </p>
                    <p>
                        Date made: {getDate(observation.timestamp)}
                    </p>
                </div>

                <div className={"info-window-body"}>
                    <div className={"info-window-img-frame"}>
                        <img alt={`observation${observation.observationId}`}
                             src={observation.image}
                             className="info-window-img"
                             onClick={imageClick}/>
                    </div>
                    <div className={"info-window-actions-column"}>
                        <div className={"info-window-description"}>
                            <div className={"info-window-info-container"}>
                                <p>notes: {observation.notes}</p>
                                <p>estimated area: {observation.estimatedArea} square meters</p>
                                <p>percent coverage: {observation.percentCoverage}%</p>
                            </div>
                        </div>
                        <div className={"verification-controls"}>
                            <button className={"not-cheatgrass"} onClick={() => {
                                alert(`Deleted observation ${observation.observationId}`)
                                labelNotCheatgrass(observation)
                            }}>
                                Not cheatgrass
                            </button>
                            <button className={"maybe-cheatgrass"} onClick={() => labelMaybeCheatgrass(observation)}>
                                Maybe cheatgrass
                            </button>
                            <button className={"cheatgrass"} onClick={() => labelYesCheatgrass(observation)}>
                                Cheatgrass
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
