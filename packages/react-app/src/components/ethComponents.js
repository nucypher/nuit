import React from 'react'
import { useState, useEffect, useContext } from 'react';

import { Context, validateEthAdress } from '@project/react-app/src/utils'


import { Form, Button, Tooltip, OverlayTrigger} from 'react-bootstrap/';

import { ReactComponent as CircleQ } from '@project/react-app/src/assets/icons/circleQ.svg'

import { Grey, Blue } from '@project/react-app/src/components'


export const WorkerRunwayDisplay = (props) => {
    const [address, setAddress] = useState(props.address)
    const [balance, setBalance] = useState(null)
    const [runway, setRunway] = useState(null)
    const {provider, web3 } = useContext(Context).wallet

    useEffect(() => {
        function handleBalance(balance) {
            const ethAmount = web3.utils.fromWei(balance, 'ether')
            setBalance(parseFloat(ethAmount).toFixed(2))

            const periodLength = 7  // Todo : get this from the contract?
            const ethCostPerDay = .03  // Todo : use a price oracle
            setRunway(((ethAmount / ethCostPerDay).toFixed() * periodLength).toFixed(0))
        }
        if (provider){
            web3.eth.getBalance(address).then(handleBalance)
        }
    }, [address])

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
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.reset = this.reset.bind(this);
        if (props.value) {
            this.handleInputChange(props.value)
        }
      }

    handleInputChange(input){
        console.log(input)
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
            {this.props.label ? <Form.Label>Worker Address</Form.Label>:<span/>}
            <Form.Control
                value={this.state.rawValue}
                onChange={e => this.handleInputChange(e.target.value)}
                type="text"
                placeholder="0x...."
                className={this.state.validated ? 'valid': <span/>}
            />
            {this.state.validated ? <Button onClick={this.reset} variant="link">X</Button> : null}
            {this.showDescription() ? <Form.Text className="text-muted">{this.props.description}</Form.Text> : <span/>}
            {this.state.validated ? <WorkerRunwayDisplay address={this.state.value}/> :<span/>}
        </div>
    }
}



export const EthBalance = (props) => {
    const context = useContext(Context)
    const {provider, account, web3} = context.wallet

    let address = props.address || account

    useEffect(() => {
        if (!props.balance){
            function handleBalance(wei) {
                const Amount = (parseFloat(wei) / 10 ** 18).toFixed(2);
                props.onBalance(Amount)
            }
            if (provider && address){
                web3.eth.getBalance(address).then(handleBalance)
            }
        }
    }, [ address, props, provider, web3 ])

    return (
        <div>
            {props.balance ? <strong><Blue>{props.balance}</Blue> <Grey>ETH</Grey></strong> : ''}
        </div>
    )
}





