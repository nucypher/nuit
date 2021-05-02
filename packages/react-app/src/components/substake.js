import React, { useContext, useState, useEffect } from 'react'

import { Grey, DataRow, PrimaryButton, SecondaryButton,  NuBalance} from '@project/react-app/src/components'
import { Context, validateMerge } from '@project/react-app/src/services'

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


const STActionButton = (props) => {

    const isActive = (props) =>{
        return props.validate(props.selection, props.substakes)
    }

    return (
        <span>
        {isActive(props) ? <PrimaryButton>{props.children}</PrimaryButton> : <SecondaryButton>{props.children}</SecondaryButton>}
        </span>
    )
}




export const SubStakeList = (props) => {

    const context = useContext(Context)
    const{ account, provider } = context.wallet

    const [substakes, setSubstakes] = useState([])
    const [selection, setSelection] = useState([])


    let Component = props.element || "div"


    useEffect(()=>{
        console.log(props.substakes)
        setSubstakes(props.substakes)
        setSelection(props.substakes.map(() => false))
    },[account, props.substakes])

    const handleSelection = (index) => {
        setSelection(selection.map((s, i) => {return i == index ? !s : s }))
    }


    if (!account){
        return (<div></div>)
    }
    return (

        <Component {...props}>
            <DataRow>
                <STActionButton selection={selection} substakes={substakes} validate={validateMerge}>merge</STActionButton>
            </DataRow>
            {substakes.map((substake)=>{
                return <SubStake key={`${account}.${substake.id}`} selected={selection[parseInt(substake.id)]} onSelect={handleSelection} data={substake} context={context} account={account} />
            })}
            {selection.map((s, index)=>{return <span key={index}>{s ? 'true': 'false'}</span>})}
        </Component>
    )
}



