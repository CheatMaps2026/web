import {SubmitEvent, SyntheticEvent, useEffect, useMemo, useState} from "react";
import {Observation} from "../model/observations";
import {FilterService, ObservationFilters} from "../services/FilterService";
import {GridRowSelectionModel} from "@mui/x-data-grid";
import {exportRegistry} from "./exportRegistry";
import {sanitize} from "../utils/manipulation";

type props = {
    observations: Observation[];
}

export type ExportType = "CSV" | "GEOJSON"
const defaultExportType: ExportType = "CSV"

export const useObservationTableViewModel = ({observations}: props) => {
    const [modifiedObservations, setModifiedObservations] = useState<Observation[]>(observations);
    const [selectedFormat, setSelectedFormat] = useState<ExportType>(defaultExportType);

    const [selectionModel, setSelectionModel] =
        useState<GridRowSelectionModel>({
            type: "include",
            ids: new Set(),
        });
    useEffect(() => {
        setModifiedObservations(observations); //sync modified when the source changes
    }, [observations]);

    const selectedObservations = useMemo(() => {
        if (selectionModel.type === "include") {

            return modifiedObservations.filter(observation =>
                selectionModel.ids.has(observation.observationId))
        } else {
            return modifiedObservations.filter(observation =>
                !selectionModel.ids.has(observation.observationId))
        }
    }, [selectionModel, modifiedObservations])


    /*
    * Filters are applied left-to-right (AndCriteria pattern)
    * date -> verification -> area -> percentage cover
    * */
    const filterFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const filter = new FilterService(observations)
        const data = new FormData(e.currentTarget)
        const startStr = data.get("start") as string;
        const endStr = data.get("end") as string;
        const verificationStr = data.get("verificationStatus") as string;
        const areaStr = data.get("estimatedArea") as string;
        const coverageStr = data.get("percentCoverage") as string;

        const filters: ObservationFilters = {
            start: startStr ? new Date(`${startStr}T00:00:00`) : undefined,
            end: endStr ? new Date(`${endStr}T23:59:59`) : undefined,
            verificationRating: verificationStr ? Number(verificationStr) : undefined,
            estimatedArea: areaStr ? Number(areaStr) : undefined,
            percentCoverage: coverageStr ? Number(coverageStr) : undefined,
        };

        setModifiedObservations(filter.apply(filters));
    }

    const selector = (model: GridRowSelectionModel) => {
        setSelectionModel(model);
    }

    const exportData = async () => {
        const exportCommand = exportRegistry[selectedFormat]
        selectedObservations.forEach(sanitize)
        await exportCommand(selectedObservations)
    }


    return {
        observations,
        modifiedObservations,
        setModifiedObservations,
        selectionModel,
        selectedFormat,
        setSelectedFormat,
        setSelectionModel,
        selector,
        filterFormSubmit,
        exportData,
        selectedObservations,
    }
}