import {useObservationStoreContext} from "../providers/ObservationsStoreProvider";
import {useLayoutEffect, useMemo, useState} from "react";
import {Observation} from "../model/observations";
import {useApiClient} from "../providers/ApiClientProvider";
import {useVerificationFunctions, Verification} from "./useVerificationFunctions";


export const useCarouselViewModel = () => {
    const apiClient = useApiClient();
    const {observations, loading, error} = useObservationStoreContext();
    const {labelNotCheatgrass, labelMaybeCheatgrass, labelYesCheatgrass} = useVerificationFunctions({
        apiClient: apiClient
    })
    const [unverifiedObservations, setUnverifiedObservations] = useState<Observation[]>([]);
    const isVerified = unverifiedObservations.length === 0;
    const [activeIndex, setActiveIndex] = useState(0);
    const [daysBack, setDaysBack] = useState(0);


    const filteredObservations = useMemo(() => {
        const cutoff = new Date();
        cutoff.setHours(0, 0, 0, 0);
        cutoff.setDate(cutoff.getDate() - daysBack);

        return observations.filter((observation) => {
            const observationDate = new Date(observation.timestamp);
            return !Number.isNaN(observationDate.getTime()) && observationDate >= cutoff;
        });
    }, [observations, daysBack]);


    const currentObservations = useMemo(() => {
        return unverifiedObservations.length > 0
            ? unverifiedObservations
            : filteredObservations;
    }, [unverifiedObservations, filteredObservations]);


    useLayoutEffect(() => {
        if (loading) return;

        const unverified = observations.filter(
            (observation) => observation.verificationRating === Verification.UNVERIFIED
        );

        console.log("Number unverified =", unverified.length);
        setUnverifiedObservations(unverified);
    }, [loading, observations]);


    const activeObservation = currentObservations[activeIndex];


    useLayoutEffect(() => {
        if (currentObservations.length === 0) {
            setActiveIndex(0);
            return;
        }

        if (activeIndex > currentObservations.length - 1) {
            setActiveIndex(currentObservations.length - 1);
        }
    }, [currentObservations, activeIndex]);


    const next = () => {
        setActiveIndex((prev) =>
            prev < currentObservations.length - 1 ? prev + 1 : prev
        );
    };

    const prev = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };


    const patchActiveObservationStatus = (
        observationToPatch: Observation,
        verificationRating: Verification
    ) => {
        setUnverifiedObservations(
            (prev: Observation[]) => prev.filter((observation) => observation.observationId != observationToPatch.observationId)
        );
    }

    const verifyActiveObservation = async (verifyFn: (observation: Observation) => Promise<void> | void) => {
        const observation = currentObservations[activeIndex];
        if (!observation) return;

        console.log("activeObservation", observation);
        await verifyFn(observation);

        let verificationRating = observation.verificationRating;
        if (verifyFn === labelNotCheatgrass) verificationRating = Verification.NEGATIVE;
        if (verifyFn === labelMaybeCheatgrass) verificationRating = Verification.MAYBE;
        if (verifyFn === labelYesCheatgrass) verificationRating = Verification.POSITIVE;

        patchActiveObservationStatus(observation, verificationRating);
    }


    return {
        loading,
        activeIndex,
        currentObservations,
        daysBack,
        setDaysBack,
        isVerified,
        next,
        prev,
        verifyActiveObservation,
        labelMaybeCheatgrass,
        labelYesCheatgrass,
        labelNotCheatgrass
    }

}
