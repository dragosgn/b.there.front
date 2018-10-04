
import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import styled from "styled-components"

const KEY = `AIzaSyBp94Nm36SehTJM0W3_QJNFQIIkixVONcw`
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`

const google = window.google;

const KpisBox = styled.div`
	display: flex;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`

const Kpi = styled.div`
    display: flex;
	border-radius: 2px;
	border: 1px solid #8bbc37;
	padding: 0.25rem 0.5rem;
    align-content: center;
    align-items: center;
    margin: 2px;
    width: 33%;
    color: #FFF;
    background: #8bbc37;
    -webkit-box-shadow: 0 3px 1px #64950d;
		   -moz-box-shadow: 0 3px 1px #64950d;
		   		  box-shadow: 0 3px 1px #64950d;
					 :hover {background: #85b237;}
`

const KpiLabel = styled.div`
    padding-left: 0.5rem;
`

const TransportBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
`

const Icon = styled.i`
	font-size: ${props => props.size || "1rem"};
	color: ${props => props.color || "grey"};
`


const Map = props =>
    <div>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 50.3971, lng: 7.6220 }}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
            {props.isMarkerShown && <Marker position={{ lat: 50.3971, lng: 7.6220 }} />}
        </GoogleMap>
        <KpisBox>
            <Kpi>
                <span role="img" aria-label="time" style={{ fontSize: '1.5rem' }}>⏱️</span>
                <KpiLabel>{props.estimatedTime || "9h 20m"}</KpiLabel>
            </Kpi>
            <Kpi>
                <span role="img" aria-label="price" style={{ fontSize: '1.5rem' }}>💰</span>
                <KpiLabel>{props.price || "230€"}</KpiLabel>
            </Kpi>
            <Kpi>
                <span role="img" aria-label="rating" style={{ fontSize: '1.5rem' }}>⭐</span>
                <KpiLabel>{props.rating || "4.5/5"}</KpiLabel>
            </Kpi>
        </KpisBox>
        <TransportBox>
            <span role="img" aria-label="bus" style={{ fontSize: '4rem' }}>🚌</span>
            <Icon className="fas fa-plus" color="#3498db" size="1.5rem" />
            <span role="img" aria-label="car" style={{ fontSize: '4rem' }}>🚗</span>
            <Icon className="fas fa-plus" color="#3498db" size="1.5rem" />
            <span role="img" aria-label="car" style={{ fontSize: '4rem' }}>🚐</span>
        </TransportBox>
    </div>


export default compose(
    withProps({
        googleMapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `320px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(50.3971, 7.6220),
                destination: new google.maps.LatLng(52.5200, 13.4050),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    }),
)(Map)