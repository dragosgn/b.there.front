
import React from "react"
import { compose, withProps, lifecycle, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import styled from "styled-components"
import Details from "./Details"
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { Box } from "./styled"
import ZoomedMap from "./ZoomedMap"
import Modal from "react-responsive-modal";
import egoMover from "./ego-mover.jpg"

import { Timeline, Icon } from 'antd';

import { Card, Icon as AntIcon, Avatar } from 'antd';
const { Meta } = Card;



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
`

const CircleIcon = styled.i`
	font-size: ${props => props.size || "1rem"};
    color: #3498db;
    position: relative;
    left: -9px;
    top: 26px;
`

const TimeLabel = styled.div`
`

const Title = styled.div`
    font-weight: bold;
`
const Adress = styled.div``
const Time = styled.div`
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
    flex-direction: column;
    padding: 1.5rem 1rem;
`

const ModalRoot = styled.div`

`

const TripDetails = styled.div`
    padding: 0.5rem;
`

const Content = styled.div`
   display: flex;
   height: 100%;
   align-content: center;
   align-items: center;
   justify-content: center;
`

const Image = styled.img`
    margin-left: auto;
    margin-right: auto;
`

const Booked = styled.div`
    color: green;
    font-size: 1.5rem;
`

const Map = props =>
    <div>
        <ModalRoot>
            <Modal open={props.detailsOn} onClose={props.hideDetails} center styles={{
                modal: {
                    paddingTop: "0px", width: "100%", paddingBottom: "0px", paddingLeft: "0px", paddingRight: "0px"
                },
                overlay: {
                    padding: "0px",
                }
            }}>
                <Content>
                    <Card
                        style={{ width: "100%" }}
                        cover={<img alt="example" src={egoMover} />}
                        actions={[<AntIcon type="setting" />, <AntIcon type="ellipsis" />]}
                    >
                        <Meta
                            avatar={<Avatar src={egoMover} />}
                            title="e.Go Mover"
                            description="The future of mobility"
                        />
                    </Card>
                </Content>
            </Modal>
        </ModalRoot>
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

            <CardsContainer>
                {props.factor === 0 && <Timeline>
                    <Timeline.Item onClick={() => props.switchDetails()} >
                        <TitleBox>
                            <Title>Berlin -> Cologne</Title>
                            <Adress>Train, Deutsche Bahn</Adress>
                        </TitleBox>
                        <Time>
                            <Duration>
                                4h 25min, 122€
                            </Duration>
                        </Time>
                    </Timeline.Item>

                    <Timeline.Item onClick={() => props.switchDetails()}>
                        <TitleBox>
                            <Title>Cologne -> Vallendar</Title>
                            <Adress>MyTaxi, Mercedes E Class</Adress>
                        </TitleBox>
                        <Time>
                            <Duration>
                                1h 11min, 136€
                            </Duration>
                        </Time>
                    </Timeline.Item>
                </Timeline>}
                <Timeline>
                    <Timeline.Item onClick={() => props.switchDetails()}>
                        <TitleBox>
                            <Title>Berlin -> Vallendar</Title>
                            <Adress>e.Go, e.Go Mover V.I.P.</Adress>
                        </TitleBox>
                        <Time>
                            <Duration>
                                9h 31min, 47,98€
                            </Duration>
                        </Time>
                        {props.factor > 0 && <Booked>
                            Booked!
                        </Booked>}
                    </Timeline.Item>
                </Timeline>
            </CardsContainer>
        </div>
    </div>


export default compose(
    withStateHandlers(
        ({ initialState = false }) => ({
            detailsOn: initialState,
            mapHeight: `320px`
        }),
        {
            showDetails: () => () => ({
                detailsOn: true,
                mapHeight: `450px`
            }),
            hideDetails: () => () => ({
                detailsOn: false
            }),
            switchDetails: ({ detailsOn }) => () => ({
                detailsOn: !detailsOn,
            }),
        }
    ),
    withProps(props => ({
        googleMapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: props.mapHeight }} />,
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