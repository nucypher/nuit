import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import {
    useRouteMatch,
    Route,
    Switch,
  } from 'react-router-dom'

import CreateWorker from './createWorker'
import CreateStake from './createStake'
import BondWorker from './bondWorker'
import Breadcrumbs from '../../components/breadcrumbs'

export function NewStake() {
    let { path, url } = useRouteMatch();
    const [workerAddress, setWorkderAddress] = useState(null)
    const [newStake, setNewStake] = useState(null)

    return (
        <Container>
            <Row>
                <Breadcrumbs paths={[
                    {path:'worker', label: 'Create Worker', enabled: true },
                    {path: 'set-stake', label: 'Set Stake', enabled: workerAddress !== null},
                    {path: 'bond', label: 'Bond', enabled: workerAddress !== null && newStake !== null}
                ]}/>
            </Row>

            <Switch>
                <Route path={`${path}/worker`}>
                    <CreateWorker />
                </Route>
                <Route path={`${path}/set-stake`}>
                    <CreateStake />
                </Route>
                <Route path={`${path}/bond`}>
                    <BondWorker />
                </Route>
            </Switch>
        </Container>
    )
}