import React from 'react';
import styled from 'styled-components';
import { compose, withStateHandlers, lifecycle, withState } from 'recompose';
import Map from "./Map"
import socketIOClient from "socket.io-client";



const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;

`;


const Root = styled.div`
	padding: 1rem;
`

const Icon = styled.i`
	font-size: ${props => props.size || "1rem"};
	color: ${props => props.color || "grey"};
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
	padding: 0.5rem 0rem;
	flex-grow: 1;
	justify-content: space-between;
	align-items: center;
	align-content: center;
`

const Title = styled.div`
	font-style: italic;
	font-size: 18px;
	font-weight: bold;
`


const App = ({ route, goTo, response }) => (
	<Root>
		<Header>
			<Icon className="fas fa-bars" size="1.5rem" />
			<Title>b.there</Title>
			<Icon className="fas fa-plus" size="1.5rem" />
		</Header>
		{route === null && <Column>
			<span role="img" aria-label="smile" style={{ fontSize: '6rem', paddingTop: "4rem" }}>
				🙂
          <p>
              The temperature in Florence is: {response} °F
            </p>
          <p>Loading...</p>
		</span>
			<ButtonBox>
				<Button onClick={() => goTo("map")}> Start</Button>
			</ButtonBox>
		</Column>}
		{route === "map" && <Map isMarkerShown />}
	</Root>
);

const routes = [
	"map",
	"options"
]

export default compose(
	withStateHandlers(
		({ initialRoute = null }) => ({
			route: initialRoute,
			prevRoute: null,
			nextRoute: null,
		}),
	withState('response', 'setresponse', false),
	withState('endpoint', 'setendpoint', "http://127.0.0.1:8080/"),
	lifecycle({
			componentDidMount() {
				const { endpoint } = this.state;
		    const socket = socketIOClient(endpoint);
		    socket.on("FromAPI", data => this.setState({ response: data }));
			}
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
		}
	)
)(App);
