import "../view-styles/VerificationViewStyle.css"
import Observations from "../DEPRECATED/Observations";

export const VerificationView = () => {
    return (
        <div className={"verification-view-root"}>
            <div className={"instructions-container"}><h1>Verify the following observations</h1></div>
            {/*    Image*/}
            {/*    Action footer under image*/}
            <Observations/>
        </div>
    )
}