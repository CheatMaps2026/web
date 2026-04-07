import {Observation} from "../model/observations";
import {GoogleMap, Marker, PolygonF, useLoadScript, OverlayView} from "@react-google-maps/api";
import {Fragment, useLayoutEffect, useRef, useState} from "react";
import {CustomCalloutWindow} from "./CustomCalloutWindow";
import {useNavigate} from "react-router";
import {useApiClient} from "../providers/ApiClientProvider";
import {useMapViewModel} from "../view-models/useMapViewModel";

const verificationToColor: Record<number, string> = {
    0: "#3659e4",
    1: "#ff0000",
    2: "#00ff00",
    3: "#f1b129",
}

type props = {
    viewModel: ReturnType<typeof useMapViewModel>
}


export const MapTiles = ({viewModel}: props) => {
    const observations = viewModel.observations
    const apiClient = useApiClient();
    const navigate = useNavigate();
    const [renderedObservations, setRenderedObservations] = useState<Observation[]>([]);
    const mapRef = useRef<google.maps.Map | null>(null)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCbAVEkhkMf11mpQXOUFzmyhFCCo_fmu3M'
    })

    const [activeObservation, setActiveObservation] = useState<Observation | null>(null);
    const [center, setCenter] = useState<{ lat: number, lng: number }>({lat: 38.5458, lng: -106.9253})
    const [viewport, setViewPort] = useState(0)

    useLayoutEffect(() => {
        if (!activeObservation) return
        if (!observations || observations.length === 0) return
        // const observation = observations.filter((obs) => obs.observationId === activeId)[0]
        const newCenter = {
            lat: activeObservation.position.gpsOrigin.latitude,
            lng: activeObservation.position.gpsOrigin.longitude
        }
        setCenter(newCenter)
    }, [activeObservation, observations])

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    }

    const handleUnmount = () => {
        mapRef.current = null;
    }

    const updateBoundsCheck = () => {
        setViewPort(viewport + 1)
    }

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


    return (
        <div className='map-container'>
            {isLoaded ? (
                <GoogleMap
                    onLoad={handleMapLoad}
                    onUnmount={handleUnmount}
                    onClick={() => setActiveObservation(null)}
                    onZoomChanged={() => setActiveObservation(null)} // optional
                    zoom={10}
                    onBoundsChanged={updateBoundsCheck}
                    center={center}
                    mapContainerStyle={{
                        height: '100%',
                        width: '100%',
                    }}
                    options={{
                        clickableIcons: false,
                        styles: [
                            {featureType: "poi", elementType: "all", stylers: [{visibility: "off"}]},
                            {featureType: "transit", elementType: "all", stylers: [{visibility: "off"}]},
                            {featureType: "road", elementType: "labels", stylers: [{visibility: "off"}]},
                        ],
                    }}
                >
                    {renderedObservations?.map((observation) => {
                        const origin = observation.position.gpsOrigin;
                        const path =
                            observation.position.coordinates?.map(({latitude, longitude}) => ({
                                lat: latitude,
                                lng: longitude,
                            })) ?? [];

                        return (
                            <Fragment key={observation.observationId}>
                                <Marker position={{lat: origin.latitude, lng: origin.longitude}}
                                        onClick={() => {
                                            setActiveObservation(observation)
                                        }}
                                        icon={{
                                            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                            fillColor: verificationToColor[observation.verificationRating],
                                            fillOpacity: 1,
                                            strokeWeight: 1,
                                            scale: 5,
                                        }}

                                >
                                </Marker>

                                {path.length > 1 && (
                                    <PolygonF
                                        path={path}
                                        options={{
                                            fillColor: verificationToColor[observation.verificationRating],
                                            strokeColor: "#fa0808",
                                            strokeWeight: 2
                                        }}
                                        onClick={() => {
                                            setActiveObservation(observation)
                                        }}
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                    {activeObservation && <OverlayView
                        position={{
                            lat: activeObservation.position.gpsOrigin.latitude,
                            lng: activeObservation.position.gpsOrigin.longitude
                        }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div className={"overlay-anchor"}>
                            <CustomCalloutWindow observation={activeObservation}
                                                 imagePress={() => {
                                                     navigate(`/image/${activeObservation.observationId}`, {
                                                         state: {image: activeObservation.image}
                                                     })
                                                 }}
                                                 apiClient={apiClient}/>

                        </div>
                    </OverlayView>}

                </GoogleMap>) : <div><p>map not loaded</p></div>}
        </div>
    )
}
