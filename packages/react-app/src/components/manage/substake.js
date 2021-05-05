import React, {useContext, useEffect, useState} from 'react'

import {CircleQ, NuBalance, Period, PrimaryButton, SecondaryButton, Spinner} from '@project/react-app/src/components'
import {Context, Divide, Extend, Merge, Remove} from '@project/react-app/src/services'

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
                <strong><Period>{props.data.lastPeriod}</Period></strong>
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
        return props.action.validate(props.selection, props.substakes)
    }

    const execute = (props) => {
        props.action.execute(props.selection, props.substakes, context)
        props.resetSelection()
    }

    return (
        <Col xs={12} sm={3} className="mb-1 w100">
            {isActive(props) ?
                <PrimaryButton width="100%" tiny onClick={e => execute(props)}>{props.children}</PrimaryButton> :
                <SecondaryButton width="100%" disabled={true} tiny>{props.children}</SecondaryButton>}
        </Col>
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
    }, [account, props.substakes])

    const handleSelection = (index) => {
        setSelection(selection.map((s, i) => {
            return i == index ? !s : s
        }))
    }

    const resetSelection = () => setSelection(props.substakes.map(() => false))
    if (!account) return (<div></div>)

    return (

        <Component {...props} id="substake-control" className="control-box">
            <Row noGutters id="substake-control-buttons" className="d-flex justify-content-around">
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Merge}>Merge<CircleQ
                    tooltip="Merge two stakes with matching end dates"/></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Divide}>Divide<CircleQ
                    tooltip="Divide a stake into two of at least 15000 each."/></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Extend}>Extend<CircleQ
                    tooltip="Add more duration to a stake."/></STActionButton>
                <STActionButton resetSelection={resetSelection} selection={selection} substakes={substakes}
                                action={Remove}>Remove<CircleQ
                    tooltip="Remove a completed or unlocked stake."/></STActionButton>
            </Row>
            <Row className="d-flex justify-content-between" id="substake-list-header">
                <Col xs={1} className="d-flex justify-content-start"></Col>
                <Col xs={12} sm={3} className="d-flex justify-content-start">
                    Start
                </Col>
                <Col xs={12} sm={3} className="d-flex justify-content-start">
                    End
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
