
import React from "react"
import { compose, withProps, lifecycle, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import styled from "styled-components"
import Details from "./Details"
import { Box } from "./styled"

const KEY = `AIzaSyBp94Nm36SehTJM0W3_QJNFQIIkixVONcw`
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`

const demoFancyMapStyles = require("./demoFancyMapStyles.json");

const google = window.google;

const AddressCard = styled.div`
    display: flex;
    border-radius: 1px;
    align-items: center;
    align-content: center;
    :not(:first-child) {
        border-top: 1px solid grey;
    }
`

const TitleBox = styled.div`
    flex-grow: 3;
    padding-left: 0.5rem;
`

const CircleIcon = styled.i`
	font-size: ${props => props.size || "1rem"};
    color: #3498db;
    position: relative;
    left: -9px;
    top: 26px;
`

const TimeLabel = styled.div`
    margin-bottom: 8px;
`

const Title = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
`
const Adress = styled.div``
const Time = styled.div`
    padding-right: 0.5rem;
`
const Duration = styled.div`
    /* color: white; */
    /* background-color: #8bbc37; */
    /* border: 1px solid transparent; */
    /* border-radius: 2px;
    padding: 2px; */
    font-size: 1.3rem;
`

const LineWithPoint = styled.div`
    height: 70px;
    margin-left: 2rem;
    width: 12px;
    border-left: 1px solid grey;
`

const AdressBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    align-content: center;
    width: -webkit-fill-available;
`

const CardsContainer = styled.div`
    display: flex;
    padding: 5px;
    flex-direction: column;
`

const Map = props =>
    <div>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 50.3971, lng: 7.6220 }}
            defaultOptions={{
                // styles: demoFancyMapStyles,
                // these following 7 options turn certain controls off see link below
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                rotateControl: false,
                fullscreenControl: false
            }}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
            {props.isMarkerShown && <Marker position={{ lat: 50.3971, lng: 7.6220 }} />}
        </GoogleMap>
    </div>


export default compose(
    withProps(props => ({
        googleMapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `700px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    })),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(50.3971, 7.6220),
                destination: new google.maps.LatLng(52.5200, 13.4050),
                travelMode: google.maps.TravelMode.TRANSIT,
                provideRouteAlternatives: true,
                unitSystem: google.maps.UnitSystem.METRIC
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result)
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(Map)