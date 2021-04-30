import React, { useContext, useState } from 'react'

import { Grey, DataRow, SecondaryButton,  NuBalance} from '@project/react-app/src/components'
import { Context } from '@project/react-app/src/utils'

export class SubStake extends React.Component{

    constructor({ data, context, account, props }){
        super(props)

        this.stakedata = data
        this.context = context
        this.account = account

    }


    render(){
        return <div className="mt-3" key={this.stakedata.index}>
        <DataRow>
            <strong>start: {this.stakedata.firstPeriod}</strong>
            <strong>end: {this.stakedata.lastPeriod}</strong>
            <span><NuBalance balance={this.stakedata.lockedValue}/></span>
        </DataRow>
        <div className="d-flex justify-content-between">
        {parseInt(this.stakedata.unlockingDuration) ? <div className="nowrap">
            <SecondaryButton onClick={this.handleProlong} className="mr-1" width="70px" tiny>Prolong</SecondaryButton>
            <SecondaryButton className="mr-1" width="70px" tiny>Divide</SecondaryButton>
            <SecondaryButton className="mr-1" width="70px" tiny>Increase</SecondaryButton>
            <SecondaryButton className="mr-1" width="70px" tiny>Merge</SecondaryButton>
            <SecondaryButton className="mr-1" width="70px" tiny>Remove</SecondaryButton>
        </div> : <Grey>unlocked</Grey>}
        </div>
    </div>
    }
}

export const SubStakeList = (props) => {

    const context = useContext(Context)
    const{ contracts, account } = context.wallet
    let Component = props.element || "div"

    if (!account){
        return (<div></div>)
    }
    return (

        <Component {...props}>
            {props.substakes.map((substake)=>{
                return <SubStake key={substake.id} data={substake} context={context} account={account} />
            })}
        </Component>
    )
}



