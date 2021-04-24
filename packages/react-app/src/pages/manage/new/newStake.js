import React, {useState} from 'react'
import { Container, Row } from 'react-bootstrap/';
import {
    useRouteMatch,
    Route,
    Switch,
  } from 'react-router-dom'

import CreateWorker from './createWorker'
import CreateStake from './createStake'
import BondWorker from './bondWorker'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'

export function NewStake() {
    let { path } = useRouteMatch();
    const [workerAddress, setWorkerAddress] = useState()
    const [newStake, setNewStake] = useState(null)

    return (
        <Container>
            <Row>
                <Breadcrumbs paths={[
                    {path:'worker', label: 'Create Worker', enabled: true },
                    {path: 'set-stake', label: 'Set Stake', enabled: workerAddress !== undefined},
                    {path: 'bond', label: 'Bond', enabled: workerAddress !== null && newStake !== null}
                ]}/>
            </Row>

            <Switch>
                <Route path={`${path}/worker`}>
                    <CreateWorker workerAddress={workerAddress} setWorkerAddress={setWorkerAddress}/>
                </Route>
                <Route path={`${path}/set-stake`}>
                    <CreateStake stake={newStake} setStake={setNewStake} />
                </Route>
                <Route path={`${path}/bond`}>
                    <BondWorker workerAddress={workerAddress}/>
                </Route>
            </Switch>
        </Container>
    )
}