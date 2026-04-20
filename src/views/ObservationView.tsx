import "../view-styles/ObservationsViewStyle.css";
import {ObservationTable} from "../components/ObservationTable";
import {useObservationTableViewModel} from "../view-models/useObservationTableViewModel";

export const ObservationView = () => {
    const tableModel = useObservationTableViewModel()

    return (
        <div className="observation-view-root">
            <ObservationTable viewModel={tableModel}/>
        </div>
    );
};
