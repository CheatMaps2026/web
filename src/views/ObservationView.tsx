import "../view-styles/ObservationsViewStyle.css";
import {ObservationTable} from "../components/ObservationTable";
import {useMapViewModel} from "../view-models/useMapViewModel";
import {useState} from "react";

export const ObservationView = () => {
    const {tableModel} = useMapViewModel();

    return (
        <div className="observation-view-root">
            <ObservationTable viewModel={tableModel}/>
        </div>
    );
};
