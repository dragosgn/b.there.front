import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



const LoadingContainer = (props) => (
    <div>Loading...</div>
)

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

const GOOGLE_API_KEY = ""


export default GoogleApiWrapper({
    apiKey: (GOOGLE_API_KEY),
    LoadingContainer: LoadingContainer
})(MapContainer)