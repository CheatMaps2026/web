import React, {createContext, useContext, useMemo} from "react"
import {ApiClientService} from "../services/ApiClientService";


const ApiContext = createContext<ApiClientService | null>(null)
export const ApiClientProvider = ({children}: { children: React.ReactNode }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
    const value = useMemo(() => {
        return new ApiClientService({baseUrl})
    }, [])
    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export function useApiClient() {
    const context = useContext(ApiContext)
    if (!context) throw new Error('useApiClient must be used within useApiClient')
    return context
}