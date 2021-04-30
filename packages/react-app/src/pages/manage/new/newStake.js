import React, {useState, useContext} from 'react'
import { Container, Row } from 'react-bootstrap/';
import {
    useRouteMatch,
    Route,
    Switch,
  } from 'react-router-dom'

import { Context } from '@project/react-app/src/utils'
import CreateWorker from './createWorker'
import CreateStake from './createStake'
import BondWorker from './bondWorker'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'

export function NewStake() {
    let { path } = useRouteMatch();
    const [workerAddress, setWorkerAddress] = useState()
    const [newStake, setNewStake] = useState(null)

    const context = useContext(Context)
    const stakerData = context.stakerData

    return (
        <Container>
            <Row>
                <Breadcrumbs paths={[
                    {path:'/', label: 'root', enabled: true },
                    {path:'worker', label: 'Create Worker', enabled: true },
                    {path: 'set-stake', label: 'Set Stake', enabled: workerAddress !== undefined || context.workerAddress.get},
                    {path: 'bond', label: 'Bond', enabled: workerAddress !== null && stakerData.lockedNU > 15000}
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