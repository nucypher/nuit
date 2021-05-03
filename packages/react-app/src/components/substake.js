import React, { useContext, useState, useEffect } from 'react'

import { Grey, DataRow, PrimaryButton, SecondaryButton,  NuBalance, Spinner} from '@project/react-app/src/components'
import { Context, Merge, Divide } from '@project/react-app/src/services'

import { Form } from 'react-bootstrap/';
import { ContextProvider } from 'react-is';

const SubStake = (props) => {

    const context = useContext(Context)

    const pending = () => {
        return context.pending.indexOf(`substakeupdate${props.data.id}`) > -1
    }

    return(
    <div className="mt-3" key={props.data.id}>
        <DataRow>
            {pending() ? <Spinner/> : <Form.Check disabled={pending()} onClick={(e) => props.onSelect(props.data.index, e)}></Form.Check>}
            <strong>start: {props.data.firstPeriod}</strong>
            <strong>end: {props.data.lastPeriod}</strong>
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
        return props.action.execute(props.selection, props.substakes, context)
    }

    return (
        <span>
        {isActive(props) ? <PrimaryButton small onClick={e => execute(props)}>{props.children}</PrimaryButton> : <SecondaryButton small>{props.children}</SecondaryButton>}
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


    if (!account){
        return (<div></div>)
    }
    return (

        <Component {...props}>
            <DataRow>
                <STActionButton selection={selection} substakes={substakes} action={Merge}>merge</STActionButton>
                {/* <STActionButton selection={selection} substakes={substakes} action={Divide}>divide</STActionButton> */}
            </DataRow>
            {substakes.map((substake)=>{
                return <SubStake key={`${account}.${substake.id}`} selected={selection[parseInt(substake.id)]} onSelect={handleSelection} data={substake} context={context} account={account} />
            })}
        </Component>
    )
}



