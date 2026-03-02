import {Observation} from "../model/observations";
import {GoogleMap, InfoWindow, Marker, MarkerF, PolygonF, useLoadScript, OverlayView} from "@react-google-maps/api";
import {Fragment, useEffect, useState} from "react";
import {CustomCalloutWindow} from "./CustomCalloutWindow";

type props = {
    observations: Observation[] | null
}
export const MapTiles = ({observations}: props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCbAVEkhkMf11mpQXOUFzmyhFCCo_fmu3M'
    })

    const [activeId, setActiveId] = useState<string | null>(null)
    const [center, setCenter] = useState<{ lat: number, lng: number }>({
        lat: 39.7392, lng:
            -104.9903
    })

    useEffect(() => {
        if (!activeId) return
        if (!observations || observations.length === 0) return
        const observation = observations.filter((obs) => obs.observationId === activeId)[0]
        const newCenter = {lat: observation.position.gpsOrigin.latitude, lng: observation.position.gpsOrigin.longitude}
        setCenter(newCenter)
    }, [center])

    const imagePress = () => {
        console.log("image has been pressed")
    }

    return (
        <div className='map-container'>
            {isLoaded ? (
                <GoogleMap
                    onClick={() => setActiveId(null)}
                    onZoomChanged={() => setActiveId(null)} // optional
                    zoom={13}
                    center={center}
                    mapContainerStyle={{
                        // width: '100%',
                        // height: '100%',
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
                    {observations?.map((observation) => {
                        const origin = observation.position.gpsOrigin;
                        const path =
                            observation.position.coordinates?.map(({latitude, longitude}) => ({
                                lat: latitude,
                                lng: longitude,
                            })) ?? [];

                        const isOpen = activeId === observation.observationId
                        return (
                            <Fragment key={observation.observationId}>
                                <Marker position={{lat: origin.latitude, lng: origin.longitude}}
                                        onClick={() => setActiveId(observation.observationId)}
                                >
                                    {isOpen && (
                                        <OverlayView
                                            position={{lat: origin.latitude, lng: origin.longitude}}
                                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                                            <div className={"overlay-anchor"}>
                                                <CustomCalloutWindow observation={observation} imagePress={imagePress}/>
                                            </div>
                                        </OverlayView>
                                    )}
                                </Marker>

                                {path.length > 1 && (
                                    <PolygonF
                                        path={path}
                                        options={{
                                            fillColor: "rgba(255,0,0,0.2)",
                                            strokeColor: "#d600ab",
                                            strokeWeight: 2
                                        }}
                                    />
                                )}
                            </Fragment>
                        );
                    })}

                </GoogleMap>) : <div><p>map not loaded</p></div>}
        </div>
    )
}