import React, { useContext, useState, useEffect } from 'react'

import { Grey, DataRow, SecondaryButton,  NuBalance} from '@project/react-app/src/components'
import { Context } from '@project/react-app/src/utils'

import { Form } from 'react-bootstrap/';

const SubStake = (props) => {

    return(
    <div className="mt-3" key={props.data.id}>
        <DataRow>
            <Form.Check onClick={(e) => props.onSelect(props.data.index, e)}></Form.Check>
            <strong>start: {props.data.firstPeriod}</strong>
            <strong>end: {props.data.lastPeriod}</strong>
            <span><NuBalance balance={props.data.lockedValue}/></span>
        </DataRow>
    </div>
    )
}

export const SubStakeList = (props) => {

    const context = useContext(Context)
    const{ account, provider } = context.wallet

    const [substakes, setSubstakes] = useState([])
    const [selection, setSelection] = useState([])


    let Component = props.element || "div"


    useEffect(()=>{
        setSubstakes(props.substakes)
        setSelection(props.substakes.map(() => false))
    },[props.substakes])

    const handleSelection = (index) => {
        setSelection(selection.map((s, i) => {return i == index ? !s : s }))
    }



    if (!account){
        return (<div></div>)
    }
    return (

        <Component {...props}>
            <DataRow>

            </DataRow>
            {substakes.map((substake)=>{
                return <SubStake key={`${account}.${substake.id}`} selected={selection[parseInt(substake.id)]} onSelect={handleSelection} data={substake} context={context} account={account} />
            })}
            {selection.map((s)=>{return <span>{s ? 'true': 'false'}</span>})}
        </Component>
    )
}



