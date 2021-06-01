import React, {useContext, useEffect, useState} from 'react'

import {CircleQ, NuBalance, Period, PrimaryButton, SecondaryButton, Spinner} from '@project/react-app/src/components'
import {Context, Divide, Extend, Merge, Remove, Increase} from '@project/react-app/src/services'

import {Col, Form, Row} from 'react-bootstrap/';

const SubStake = (props) => {

    const context = useContext(Context)
    const pending = () => context.pending.indexOf(`substakeupdate${props.data.id}`) > -1

    return (
        <Row key={props.data.id} className="d-flex justify-content-between substake">
            <Col xs={1} className="d-flex justify-content-start">
                {pending()
                    ? <Spinner/>
                    : <Form.Check checked={props.selected}
                                  disabled={pending()}
                                  onChange={(e) => props.onSelect(props.data.index, e)}>
                    </Form.Check>}
            </Col>
            <Col xs={12} sm={3} className="d-flex justify-content-start">
                <strong><Period>{props.data.firstPeriod}</Period></strong>
            </Col>
            <Col xs={12} sm={3} className="d-flex justify-content-start">
                <strong><Period>{parseInt(props.data.lastPeriod) + 1}</Period></strong>
            </Col>
            <Col xs={12} sm={3} className="d-flex justify-content-end">
                <NuBalance balance={props.data.lockedValue}/>
            </Col>
        </Row>
    )
}

const STActionButton = (props) => {

    const context = useContext(Context)

    const isActive = (props) => {
        return props.action.validate(props.selection, props.substakes, context)
    }

    const execute = (props) => {
        props.action.execute(props.selection, props.substakes, context)
    }

    return (
        <div className="mb-1">
            {isActive(props) ?
                <PrimaryButton tiny onClick={e => execute(props)}>{props.children}</PrimaryButton> :
                <SecondaryButton disabled tiny>{props.children}</SecondaryButton>}
        </div>
    )
}


export const SubStakeList = (props) => {

    const context = useContext(Context)
    const {account} = context.wallet

    const [substakes, setSubstakes] = useState([])
    const [selection, setSelection] = useState([])

    let Component = props.element || "div"

    useEffect(() => {
        setSubstakes(props.substakes)
        setSelection(props.substakes.map(() => false))
    }, [context.stakerData.lockedNU, account, props.substakes])

    const handleSelection = (index) => {
        setSelection(selection.map((s, i) => {
            return i == index ? !s : s
        }))
    }

    const resetSelection = () => setSelection(props.substakes.map(() => false))
    if (!account) return (<div></div>)

    return (

        <Component {...props} id="substake-control" className="control-box">
            <div id="substake-control-buttons" className="d-flex justify-content-around w100">
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Increase}>Increase<CircleQ>Add more NU to an existing stake</CircleQ></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Merge}>Merge<CircleQ>Merge two stakes with matching end dates</CircleQ></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Divide}>Divide<CircleQ>Divide a stake into two of at least 15000 each</CircleQ></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Extend}>Extend<CircleQ>Add more duration to a stake</CircleQ></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Remove}>Remove<CircleQ>Remove a completed or unlocked stake</CircleQ>
                </STActionButton>
            </div>
            <Row className="d-flex justify-content-between" id="substake-list-header">
                <Col xs={1} className="d-flex justify-content-start"></Col>
                <Col xs={12} sm={3} className="d-flex justify-content-start">
                    Start
                </Col>
                <Col xs={12} sm={3} className="d-flex justify-content-start">
                    Unlock
                </Col>
                <Col xs={12} sm={3}></Col>
            </Row>

            {substakes.map((substake) => {
                return <SubStake key={`${account}.${substake.id}`}
                                 selected={selection[parseInt(substake.id)]}
                                 onSelect={handleSelection} data={substake}
                                 context={context}
                                 account={account}/>
            })}
        </Component>
    )
}
