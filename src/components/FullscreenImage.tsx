import {useNavigate, useParams, useLocation} from "react-router";
import "./ComponentStyles.css"

type LocationState = {
    image: string
}
export const FullscreenImage = () => {
    const navigate = useNavigate();
    const {observationId} = useParams();
    const {state} = useLocation() as { state: LocationState }
    console.log("state",state);
    const image = state.image
    console.log("image", image)

    return (
        <div className={"fullscreen-image-root"}>
            <img alt={`observation${observationId}`}
                 src={image}/>
        </div>

    )
}