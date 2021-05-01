import React, { useContext, useState, useEffect } from 'react'

import { Grey, DataRow, SecondaryButton,  NuBalance} from '@project/react-app/src/components'
import { Context } from '@project/react-app/src/utils'

import { Form } from 'react-bootstrap/';

export class SubStake extends React.Component{

    constructor({ data, context, account, props }){
        super(props)

        this.context = context
        this.account = account
        this.state = data
    }


    render(){
        return <div className="mt-3" key={this.state.id}>
        <DataRow>
            <Form.Check ></Form.Check>
            <strong>start: {this.state.firstPeriod}</strong>
            <strong>end: {this.state.lastPeriod}</strong>
            <span><NuBalance balance={this.state.lockedValue}/></span>
        </DataRow>
    </div>
    }
}

export const SubStakeList = (props) => {

    const context = useContext(Context)
    const{ account, provider } = context.wallet
    const [substakes, setSubstakes] = useState([])
    let Component = props.element || "div"


    useEffect(()=>{
        setSubstakes(props.substakes)
    },[props.substakes])

    if (!account){
        return (<div></div>)
    }
    return (

        <Component {...props}>
            {substakes.map((substake)=>{
                return <SubStake key={`${account}.${substake.id}.${substake.firstPeriod}`} data={substake} context={context} account={account} />
            })}
        </Component>
    )
}



