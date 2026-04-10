import  {createContext, useContext, useMemo} from "react"
import {ApiClientService} from "../services/ApiClientService";
import {getEnv} from "../../env";


const ApiContext = createContext<ApiClientService | null>(null)
export const ApiClientProvider = ({children}: { children: React.ReactNode }) => {
    const { VITE_API_BASE_URL, VITE_API_KEY } = getEnv();

    const baseUrl = VITE_API_BASE_URL
    const apiKey =VITE_API_KEY
    const value = useMemo(() => {
        return new ApiClientService({baseUrl, apiKey})
    }, [])
    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export function useApiClient() {
    const context = useContext(ApiContext)
    if (!context) throw new Error('useApiClient must be used within useApiClient')
    return context
}
