import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Observation} from "../model/observations";
import {useApiClient} from "./ApiClientProvider";
import {GetObservationsResponse} from "../model/api-types";

const ObservationStoreContext = createContext<Observation[] | null | undefined>(undefined)

export const ObservationsStoreProvider = ({children}: { children: ReactNode }) => {
    const [observations, setObservations] = useState<Observation[] | null>(null); //it can be null because the server might be down and might not return anything?
    const apiClient = useApiClient();
    useEffect(() => {
        (async () => {
            const response: GetObservationsResponse = await apiClient.get("/observations")
            console.log("backend response", response)
            if (response.data) {
                setObservations(response.data)
                console.log("backend response", response.message)
            } else {
                console.log("There were no observations: ", response.message)
                setObservations([]);
            }
        })()
    }, [])

    return (<ObservationStoreContext.Provider value={observations}>{children}</ObservationStoreContext.Provider>)
}

export const useObservationStoreContext = () => {
    const context = useContext(ObservationStoreContext);
    if (context === undefined) {
        throw new Error("useObservationStoreContext must be used within ObservationsStoreProvider");
    }
    return context;
}