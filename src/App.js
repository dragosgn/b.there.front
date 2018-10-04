import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';

const Root = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	padding: 1rem;
`;

const ButtonBox = styled.div`
	padding-top: 2rem;
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

const App = () => (
	<Root>
		<span role="img" aria-label="smile" style={{ fontSize: '5rem', paddingTop: "1rem" }}>
			🙂
		</span>
		<ButtonBox>
			<Button>Start</Button>
		</ButtonBox>
	</Root>
);

export default compose()(App);
