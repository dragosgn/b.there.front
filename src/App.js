import React from 'react';
import styled from 'styled-components';
import { compose, withStateHandlers, lifecycle, withState } from 'recompose';
import Map from "./Map"
import socketIOClient from "socket.io-client";
import Modal from "react-responsive-modal";
import ticket from './qr.png';
import Ionicon from 'react-ionicons'
import logo from "./logo.png"
import brand1 from "./btherelogo-04.png"
import name from "./name.png"
import voice from "./voice.svg"
import wave from "./wave.svg"
import Particles from 'react-particles-js';
import particlesConfig from "./particles.json"





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
	background-color: white;
`

const Logo = styled.img`
	margin-top: 5rem;
	display: block;
    margin-left: auto;
    margin-right: auto;
`

const Name = styled.img`
	display: block;
    margin-left: auto;
    margin-right: auto;
`

const FirstScreen = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #3da3db;
`

const Voice = styled.img`
	margin-top: 1.5rem;
	margin-bottom: 0.5rem;
`

const App = ({ route, goTo, response, openModal, closeModal, modalOpen, factor }) => (
	<Root>
		{route !== null && <Header>
			<Icon className="fas fa-bars" size="1.5rem" color="grey" />
			<Name height={24} src={name} alt="name" onClick={() => goTo("map")} />
			<Icon className="fas fa-plus" size="1.5rem" color="grey" />
		</Header>}
		{route === null &&
			<FirstScreen onClick={() => goTo("map")}>
				<Logo height={150} src={logo} alt="logo" />
				<Particles style={{
					marginTop: "5rem"
				}} height={200} params={
					particlesConfig
				} />
				<Voice src={voice} height={40} alt="voice" />
				<img src={wave} height={40} alt="voice" />

			</FirstScreen>
		}
		{route === "map" && <Map isMarkerShown factor={factor} />}

		<Modal open={modalOpen} onClose={closeModal} center>
			<p>This is your ticket:</p>
			<img width={300} src={ticket} alt="ticket" />
		</Modal>
		{
			route !== null && <Footer>
				<FooterIcon color="grey" className="fas fa-home" size="1.5rem" active={route === "map" && !modalOpen} onClick={() => goTo(null)} />
				<FooterIcon color="grey" className="fas fa-wallet" size="1.5rem" onClick={openModal} active={modalOpen} />
				<FooterIcon color="grey" className="fas fa-user" size="1.5rem" />
				<FooterIcon color="grey" className="fas fa-sliders-h" size="1.5rem" />
			</Footer>
		}
	</Root >
);


export default compose(
	withState('response', 'setresponse', false),
	withState('endpoint', 'setendpoint', "https://fierce-badlands-96084.herokuapp.com/"),
	withStateHandlers(
		({ initialRoute = null }) => ({
			route: initialRoute,
			prevRoute: null,
			nextRoute: null,
			modalOpen: false,
			factor: 0
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
			}),
			sumFactor: ({ factor }) => () => {
				console.log("works")
				console.log(factor)
				return {
					factor: factor + 1
				}
			}
		}
	),
	lifecycle({
		componentDidMount() {
			console.log("props", this.props)
			const { endpoint } = this.props;
			const socket = socketIOClient(endpoint);
			socket.on("alexa_add_transport", () => (this.props.sumFactor()));
		}
	})

)(App);
