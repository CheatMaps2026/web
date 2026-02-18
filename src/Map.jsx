import { GoogleMap, MarkerF, useLoadScript, } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const Map = ({ coordinates }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCbAVEkhkMf11mpQXOUFzmyhFCCo_fmu3M'
    });

    return (
        <div className='map-container'>
            {isLoaded ? (
                <GoogleMap
                    center={{
                        lat: coordinates.latitude,
                        lng: coordinates.longitude,
                    }}
                    zoom={13}
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <MarkerF
                        position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
                    />

                </GoogleMap>
            ) : null}
        </div>
    );
}

Map.propTypes = {
    coordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
};

export default Map;
