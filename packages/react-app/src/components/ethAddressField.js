import React from 'react'
import { useState, useEffect } from 'react';

import { Form, Button, Tooltip, OverlayTrigger} from 'react-bootstrap/';
import useWeb3Modal from '../hooks/useWeb3Modal'
import Web3 from "web3";


import { ReactComponent as CircleQ } from '../assets/icons/circleQ.svg'
import { validateEthAdress } from '../utils'


function WorkerRunwayDisplay (props){
    const [balance, setBalance] = useState(null)
    const [runway, setRunway] = useState(null)
    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account] = useWeb3Modal()

    useEffect(() => {
        function handleBalance(balance) {
            const ethAmount = Web3.utils.fromWei(balance, 'ether')
            setBalance(parseFloat(ethAmount).toFixed(2))

            const periodLength = 7
            const ethCostPerDay = .03
            setRunway(((ethAmount / ethCostPerDay).toFixed() * periodLength).toFixed(0)) // Todo : use a price oracle
        }
        if (provider){
            const web3 = new Web3(provider);
            web3.eth.getBalance(props.address).then(handleBalance)
        }
    })

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between">
                <span>
                    <strong>Eth balance </strong>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">What is this for? </Tooltip>}>
                        <CircleQ/>
                    </OverlayTrigger>
                </span>
                <span><strong> {balance}</strong> ETH</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>
                    <strong>Estimated Runway </strong>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Based on approximate gas usage of 200,000 and 7 day periods</Tooltip>}>
                        <CircleQ/>
                    </OverlayTrigger>
                </span>
                <span><strong>{runway}</strong> days</span>
            </div>
        </div>
    )
}

export class WorkerETHAddressField extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rawValue: props.value || '',
            value: props.value || null,
            validated: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.reset = this.reset.bind(this);
      }

    handleInputChange(input){
        this.setState({rawValue: input});

        if (validateEthAdress(input)){
            this.setState({validated: true, value: input})
            this.props.onChange(input)
        }
    }

    showDescription(){
        return this.props.description && this.state.validated === false
    }

    reset(){
        this.setState({
            value: null,
            validated: false,
            rawValue: ''
        })
        this.props.onChange(null)
    }

    render(){
        return <div>
            {this.props.label ? <Form.Label>Worker Address</Form.Label>:''}
            <Form.Control
                value={this.state.rawValue}
                onChange={e => this.handleInputChange(e.target.value)}
                type="text"
                placeholder="0x...."
                className={this.state.validated ? 'valid': ''}
            />
            {this.state.validated ? <Button onClick={this.reset} variant="link">X</Button> : ''}
            {this.showDescription() ? <Form.Text className="text-muted">{this.props.description}</Form.Text> : ''}
            {this.state.validated ? <WorkerRunwayDisplay address={this.state.value}/> : ''}
        </div>
    }
}








