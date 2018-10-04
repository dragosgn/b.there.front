
import React from "react"
import { compose, withProps, lifecycle, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import styled from "styled-components"
import Details from "./Details"

const KEY = `AIzaSyBp94Nm36SehTJM0W3_QJNFQIIkixVONcw`
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`

const demoFancyMapStyles = require("./demoFancyMapStyles.json");

const google = window.google;

const AddressCard = styled.div`
    display: flex;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    box-shadow: 0 0 0 1px #d4d4d5, 0 2px 0 0 #fbbd08, 0 1px 3px 0 #d4d4d5;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 1rem 0rem;
    align-items: center;
    align-content: center;
    * {
        font-size: 14px;
    }
`



const TitleBox = styled.div`
    flex-grow: 3;
    padding-left: 0.5rem;
`

const Title = styled.div``
const Adress = styled.div``
const Time = styled.div``
const Duration = styled.div`
    color: white;
    background-color: #8bbc37;
    border: 1px solid transparent;
    border-radius: 2px;
    padding: 2px;
`

const Map = props =>
    <div>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 50.3971, lng: 7.6220 }}
            defaultOptions={{ styles: demoFancyMapStyles }}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
            {props.isMarkerShown && <Marker position={{ lat: 50.3971, lng: 7.6220 }} />}
        </GoogleMap>
        {props.detailsOn && <Details {...props} />}
        {!props.detailsOn && <>
            <AddressCard onClick={() => props.switchDetails()}>
                <span role="img" aria-label="bday" style={{ fontSize: '2rem' }}>🎉</span>
                <TitleBox>
                    <Title>Omas Geburtstag</Title>
                    <Adress>Rosenthaler Str.23, Berlin</Adress>
                </TitleBox>
                <Time>
                    <div>
                        Ride in:
                </div>
                    <Duration>
                        9h 20min
                </Duration>
                </Time>
            </AddressCard>
            <AddressCard onClick={() => props.switchDetails()}>
                <span role="img" aria-label="bday" style={{ fontSize: '2rem' }}>💡</span>
                <TitleBox>
                    <Title>Idea Lab</Title>
                    <Adress>Burgpl. 2, Vallendar</Adress>
                </TitleBox>
                <Time>
                    <div>
                        Ride in:
                </div>
                    <Duration>
                        4h 13min
                </Duration>
                </Time>
            </AddressCard>
            <AddressCard onClick={() => props.switchDetails()}>
                <span role="img" aria-label="bday" style={{ fontSize: '2rem' }}>💵</span>
                <TitleBox>
                    <Title>B.there IPO</Title>
                    <Adress>Mergenthalerallee 61, Eschborn</Adress>
                </TitleBox>
                <Time>
                    <div>
                        Ride in:
                </div>
                    <Duration>
                        1h 37min
                </Duration>
                </Time>
            </AddressCard>
        </>}

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
    }),
    withStateHandlers(
        ({ initialState = false }) => ({
            detailsOn: initialState,
        }),
        {
            showDetails: () => () => ({
                detailsOn: true
            }),
            hideDetails: () => () => ({
                detailsOn: false
            }),
            switchDetails: ({ detailsOn }) => () => ({
                detailsOn: !detailsOn,
            }),
        }
    )
)(Map)