import "../view-styles/ObservationsViewStyle.css";
import { ObservationTable } from "../components/ObservationTable";
import { useMapViewModel } from "../view-models/useMapViewModel";

export const ObservationView = () => {
    const { tableModel } = useMapViewModel();

    return (
        <div className="observation-view-root">
            <ObservationTable viewModel={tableModel} />
        </div>
    );
};
