import {useMemo, useState} from "react";
import {Observation} from "../model/observations";
import {FilterService} from "../services/FilterService";

export const useFilterService = (observations: Observation[]) => {
    const [filterService, setFilterService] = useState<FilterService | null>(null);
    useMemo(() => {
        if (observations.length > 0) {
            setFilterService(new FilterService(observations));
        }
    }, [observations])

    return filterService
};