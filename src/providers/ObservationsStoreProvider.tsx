import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {Observation} from "../model/observations";
import {useApiClient} from "./ApiClientProvider";
import {GetObservationsResponse} from "../model/api-types";


type ObservationStoreState = {
    observations: Observation[];
    loading: boolean;
    error: string | null;
};

const ObservationStoreContext = createContext<ObservationStoreState | undefined>(undefined)

export const ObservationsStoreProvider = ({children}: { children: ReactNode }) => {
    const [observations, setObservations] = useState<Observation[]>([]); //it can be null because the server might be down and might not return anything?
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiClient = useApiClient();


    useEffect(() => {
        const loadData = async () => {
            console.log('loading observations')
            try {
                const response: Observation[] = await apiClient.get("/observations")

                if (response) {
                    setObservations(response);
                } else {
                    setObservations([]);
                }
            } catch (error) {
                setError("Failed to fetch observations");
            } finally {
                setLoading(false);
            }
        }
        loadData(); //run immediately first

        const interval = setInterval(loadData, 5 * 60 * 1000) //run every 5 minutes
        return () => clearInterval(interval)
    }, [])

    const value = useMemo(() => ({
        observations, loading, error
    }), [observations, loading, error])


    return (<ObservationStoreContext.Provider value={value}>{children}</ObservationStoreContext.Provider>)
}

export const useObservationStoreContext = () => {
    const context = useContext(ObservationStoreContext);
    if (context === undefined) {
        throw new Error("useObservationStoreContext must be used within ObservationsStoreProvider");
    }
    return context;
}