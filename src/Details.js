import React from "react"
import styled from "styled-components"

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
    padding: 0.5rem;
    border: 1px solid #3498db;
    border-radius: 2px;
`

const Icon = styled.i`
	font-size: ${props => props.size || "1rem"};
    color: ${props => props.color || "grey"};
`

const BackIcon = styled.i`
	font-size: ${props => props.size || "1rem"};
    color: ${props => props.color || "grey"};
    color:white;
    background-color: #d35400;
    padding: 0.5rem;
    border-radius: 4px;
    margin-top: 2rem;
`

const Navigation = styled.div`
    display: flex;
    margin-top: 0.5rem;
`

const RouteDetail = styled.div`
    font-style: italic;
    color: #3498db;
    font-size: 14px;
`

export default props => <>
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
        <span role="img" aria-label="bus" style={{ fontSize: '2.5rem' }}>🚌</span>
        <Icon className="fas fa-plus" color="#3498db" size="1rem" />
        <span role="img" aria-label="car" style={{ fontSize: '2.5rem' }}>🚗</span>
        <Icon className="fas fa-plus" color="#3498db" size="1rem" />
        <span role="img" aria-label="car" style={{ fontSize: '2.5rem' }}>🚐</span>
    </TransportBox>
    <RouteDetail>
        You will travel in three different vehicles
    </RouteDetail>
    <Navigation>
        <BackIcon className="fas fa-arrow-left" onClick={() => props.switchDetails()} size="1rem" />
    </Navigation>
</>