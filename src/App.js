import React from 'react';
import styled from 'styled-components';
import { compose, withStateHandlers, lifecycle, withState } from 'recompose';
import Map from "./Map"
import socketIOClient from "socket.io-client";
import Modal from "react-responsive-modal";
import ticket from './qr.png';
import Ionicon from 'react-ionicons'
import logo from "./logo.jpg"

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
`;

const Box = styled.div`
	padding: 0.5rem;
`


const Root = styled.div`
	height: 100vh;

`

const Icon = styled.i`
	font-size: ${props => props.size || "1rem"};
	color: ${props => props.color || "grey"};
`

const FooterIcon = styled.i`
	font-size: ${props => props.size || "1rem"};
	color: ${props => props.active ? "#3498db" : "grey"};
	cursor: pointer;
`

const ButtonBox = styled.div`
	padding-top: 0rem;
`;


const Button = styled.div`
	border: 0;
	width: 270px;
	padding: 10px;
	margin: 20px auto;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	display: block;
	text-decoration: none;
	text-align: center;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 1.2em;
	:hover {
	  -webkit-transition: background-color 1s ease-in;
	 	   -moz-transition: background-color 1s ease-in;
	 	  	 -o-transition: background-color 1s ease-in;
	     	    transition: background-color 1s ease-in;
	}
	color: #FFF;
		background: #8bbc37;
	  -webkit-box-shadow: 0 3px 1px #64950d;
		   -moz-box-shadow: 0 3px 1px #64950d;
		   		  box-shadow: 0 3px 1px #64950d;
					 :hover {background: #85b237;}
`


const Header = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	padding: 1rem; 
`

const Title = styled.div`
	font-style: italic;
	font-size: 26px;
	font-weight: bold;
	color: #3498db;
	display: flex;
	justify-content: center;
	font-family: 'Monoton', cursive;
`

const Footer = styled.div`
	padding: 1rem;
	display: flex;
	border-top: 0.5px solid grey;
    position: fixed;
    bottom: 0px;
    width: -webkit-fill-available;
	justify-content: space-between;
`

const Logo = styled.img`
	margin-top: 5rem;
	display: block;
    margin-left: auto;
    margin-right: auto;
`

const FirstScreen = styled.div`
	display: flex;
	flex-direction: column;
`

const App = ({ route, goTo, response, openModal, closeModal, modalOpen }) => (
	<Root>
		{route !== null && <Header>
			<Icon className="fas fa-bars" size="1.5rem" color="grey" />
			<Title>b.there</Title>
			<Icon className="fas fa-plus" size="1.5rem" color="grey" />
		</Header>}
		{route === null &&
			<FirstScreen>
				<Logo height={150} src={logo} alt="logo" onClick={() => goTo("map")} />
				<Title>b.there</Title>
			</FirstScreen>
		}
		{route === "map" && <Map isMarkerShown />}

		<Modal open={modalOpen} onClose={closeModal} center>
			<p>This is your ticket:</p>
			<img width={300} src={ticket} alt="ticket" />
		</Modal>
		{
			route !== null && <Footer>
				<FooterIcon color="grey" className="fas fa-home" size="1.5rem" active={route === "map" && !modalOpen} />
				<FooterIcon color="grey" className="fas fa-wallet" size="1.5rem" onClick={openModal} active={modalOpen} />
				<FooterIcon color="grey" className="fas fa-user" size="1.5rem" />
				<FooterIcon color="grey" className="fas fa-sliders-h" size="1.5rem" />
			</Footer>
		}
	</Root >
);


export default compose(
	withState('response', 'setresponse', false),
	withState('endpoint', 'setendpoint', "https://morning-savannah-50648.herokuapp.com/"),
	lifecycle({
		componentDidMount() {
			console.log("props", this.props)
			const { endpoint } = this.props;
			const socket = socketIOClient(endpoint);
			socket.on("FromAPI", data => this.setState({ response: data }));
		}
	}),
	withStateHandlers(
		({ initialRoute = null }) => ({
			route: initialRoute,
			prevRoute: null,
			nextRoute: null,
			modalOpen: false
		}),
		{
			goBack: ({ prevRoute }) => value => ({
				route: prevRoute
			}),
			goTo: ({ route }) => (value) => ({
				route: value,
				prevRoute: route
			}),
			goNext: () => () => ({
				route: null
			}),
			openModal: () => () => ({
				modalOpen: true
			}),
			closeModal: () => () => ({
				modalOpen: false
			})
		}
	)
)(App);
