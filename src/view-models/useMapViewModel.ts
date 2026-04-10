import {useObservationStoreContext} from "../providers/ObservationsStoreProvider";
import {useNavigate} from "react-router";
import {useLayoutEffect, useRef, useState} from "react";
import {Observation} from "../model/observations";
import {useLoadScript} from "@react-google-maps/api";
import {useApiClient} from "../providers/ApiClientProvider";

export const useMapViewModel = () => {
    const {observations} = useObservationStoreContext()
    const apiClient = useApiClient();
    const navigate = useNavigate();
    const [renderedObservations, setRenderedObservations] = useState<Observation[]>([]);
    const [activeObservation, setActiveObservation] = useState<Observation | null>(null)
    const mapRef = useRef<google.maps.Map | null>(null)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCbAVEkhkMf11mpQXOUFzmyhFCCo_fmu3M'
    })
    const [center, setCenter] = useState<{ lat: number, lng: number }>({lat: 38.5458, lng: -106.9253})
    const [viewport, setViewPort] = useState(0)

    useLayoutEffect(() => {
        if (!activeObservation) return
        if (!observations || observations.length === 0) return
        const newCenter = {
            lat: activeObservation.position.gpsOrigin.latitude,
            lng: activeObservation.position.gpsOrigin.longitude
        }
        setCenter(newCenter)
    }, [activeObservation, observations])

    useLayoutEffect(() => {
        if (!observations || observations.length === 0) {
            setRenderedObservations([]);
            return
        }
        const bounds = mapRef.current?.getBounds()
        if (!bounds) {
            setRenderedObservations(observations);
            return
        }
        const nextRendered = observations.filter((observation) => {
            const origin = observation.position.gpsOrigin
            return bounds.contains({lat: origin.latitude, lng: origin.longitude})
        })

        setRenderedObservations(nextRendered);
    }, [observations, viewport]);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    }

    const handleUnmount = () => {
        mapRef.current = null;
    }

    const updateBoundsCheck = () => {
        setViewPort(viewport + 1)
    }

    const imageClick = () => {
        if (!activeObservation) return
        navigate(`/image/${activeObservation.observationId}`, {
            state: {image: activeObservation.image}
        })
    }

    return {
        observations,
        handleMapLoad,
        handleUnmount,
        mapRef,
        activeObservation,
        setActiveObservation,
        renderedObservations,
        center,
        updateBoundsCheck,
        imageClick,
        isLoaded,
        apiClient

    }
}
