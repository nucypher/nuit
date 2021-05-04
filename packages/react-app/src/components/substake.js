import React, { useContext, useState, useEffect } from 'react'

import { Grey, DataRow, PrimaryButton, SecondaryButton,  NuBalance, Spinner, CircleQ, Period} from '@project/react-app/src/components'
import { Context, Merge, Divide, Remove, Extend } from '@project/react-app/src/services'

import { Form } from 'react-bootstrap/';
import { ContextProvider } from 'react-is';

const SubStake = (props) => {

    const context = useContext(Context)

    const pending = () => {
        return context.pending.indexOf(`substakeupdate${props.data.id}`) > -1
    }

    return(
    <div key={props.data.id} >
        <DataRow className="substake">
            {pending() ? <Spinner/> : <Form.Check checked={props.selected} disabled={pending()} onChange={(e) => props.onSelect(props.data.index, e)}></Form.Check>}
            <strong><Period>{props.data.firstPeriod}</Period></strong>
            <strong><Period>{props.data.lastPeriod}</Period></strong>
            <span><NuBalance balance={props.data.lockedValue}/></span>
        </DataRow>
    </div>
    )
}

const STActionButton = (props) => {

    const context = useContext(Context)

    const isActive = (props) =>{
        return props.action.validate(props.selection, props.substakes)
    }

    const execute = (props) =>{
        props.action.execute(props.selection, props.substakes, context)
        props.resetSelection()
    }

    return (
        <span>
        {isActive(props) ? <PrimaryButton small onClick={e => execute(props)}>{props.children}</PrimaryButton> : <SecondaryButton disabled={true} small>{props.children}</SecondaryButton>}
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
        setSubstakes(props.substakes)
        setSelection(props.substakes.map(() => false))
    },[account, props.substakes])

    const handleSelection = (index) => {
        setSelection(selection.map((s, i) => {return i == index ? !s : s }))
    }

    const resetSelection = () => {
        setSelection(props.substakes.map(() => false))
    }

    if (!account){
        return (<div></div>)
    }
    return (

        <Component {...props} id="substake-control" className="control-box">
            <div id="substake-control-buttons" className="d-flex justify-content-around">
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes} action={Merge}>Merge<CircleQ tooltip="Merge two stakes with matching end dates"/></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes} action={Divide}>Divide<CircleQ tooltip="Divide a stake into two of at least 15000 each."/></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes} action={Extend}>Extend<CircleQ tooltip="Add more duration to a stake."/></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes} action={Remove}>Remove<CircleQ tooltip="Remove a completed or unlocked stake."/></STActionButton>
            </div>
            {substakes.map((substake)=>{
                return <SubStake key={`${account}.${substake.id}`} selected={selection[parseInt(substake.id)]} onSelect={handleSelection} data={substake} context={context} account={account} />
            })}
        </Component>
    )
}



