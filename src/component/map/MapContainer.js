import markerImg from './marker_image.png';
import React, { useState, useEffect } from  'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import './MapContainer.css';

const MapContainer = (props) => {
    const params = props;
    const [viewport, setViewport] = useState({
        latitude: params.latitude,
        longitude: params.longitude,
        width: '400px',
        height: '400px',
        zoom: params.to_print ? 15 : 13
    });
    const [selectedProperty, setSelectedProperty] = useState(null);
    useEffect(() => {
        const listener = (e) => {
            if(e.key === "Escape"){
                setSelectedProperty(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);
    return (
        <div className={"map_card" + (props.added_class || "")}>
            <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/buildings/cjxyjvjf9034o1cqpoj373eoz"
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                <Marker latitude={params.latitude} longitude={params.longitude}>
                    <button className="marker-btn" onClick={(e) => {
                        e.preventDefault();
                        if(!params.is_not_property){
                            setSelectedProperty({latitude: params.latitude, longitude: params.longitude});
                        }
                    }}>
                        <img src={markerImg} alt={props.t('map_container.marker_icon')}/>
                    </button>
                </Marker>
                {selectedProperty &&
                    <Popup
                        latitude={selectedProperty.latitude}
                        longitude={selectedProperty.longitude}
                        onClose={() => {
                            setSelectedProperty(null);
                        }}
                    >
                        <div>
                            {params.label &&
                                <h2>{params.label}</h2>
                            }
                            {params.image_map &&
                                <div className="image_map">
                                <img src={params.image_map} alt={props.t('property_details_print.front_view_alt')}/>
                                    </div>
                            }
                            {params.address &&
                                <div className="property_address">{params.address}</div>
                            }
                        </div>
                    </Popup>
                }
            </ReactMapGl>
        </div>
    );
}

export default MapContainer;
