
import React from "react"
import { compose, withProps, lifecycle, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import styled from "styled-components"

const KEY = `AIzaSyBp94Nm36SehTJM0W3_QJNFQIIkixVONcw`
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`

const demoFancyMapStyles = require("./demoFancyMapStyles.json");

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

const Navigation = styled.div`
    display: flex;
    margin-top: 0.5rem;
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
        {props.detailsOn && <>
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
            <Navigation>
                <Icon className="fas fa-arrow-left" onClick={() => props.switchDetails()} size="2rem" style={{ color: "white", backgroundColor: "red", padding: "0.5rem", borderRadius: "4px" }} />

            </Navigation>
        </>}
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