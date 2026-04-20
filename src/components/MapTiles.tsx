import {GoogleMap, Marker, PolygonF, OverlayView} from "@react-google-maps/api";
import {Fragment} from "react";
import {CustomCalloutWindow} from "./CustomCalloutWindow";
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

    return (
        <div className='map-container'>
            {viewModel.isLoaded ? (
                <GoogleMap
                    onLoad={viewModel.handleMapLoad}
                    onUnmount={viewModel.handleUnmount}
                    onClick={() => viewModel.setActiveObservation(null)}
                    onZoomChanged={() => viewModel.setActiveObservation(null)} // optional
                    zoom={10}
                    onBoundsChanged={viewModel.updateBoundsCheck}
                    center={viewModel.center}
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
                    {viewModel.renderedObservations?.map((observation) => {
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
                                            viewModel.setActiveObservation(observation)
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
                                            viewModel.setActiveObservation(observation)
                                        }}
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                    {viewModel.activeObservation && <OverlayView
                        position={{
                            lat: viewModel.activeObservation.position.gpsOrigin.latitude,
                            lng: viewModel.activeObservation.position.gpsOrigin.longitude
                        }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div className={"overlay-anchor"}>
                            <CustomCalloutWindow observation={viewModel.activeObservation}
                                                 imageClick={viewModel.imageClick}
                                                 apiClient={viewModel.apiClient}/>

                        </div>
                    </OverlayView>}

                </GoogleMap>) : <div><p>map not loaded</p></div>}
        </div>
    )
}
