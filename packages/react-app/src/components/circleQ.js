import React from 'react';
import { ReactComponent as TheIcon } from '@project/react-app/src/assets/icons/circleQ.svg'
import { Tooltip, OverlayTrigger} from 'react-bootstrap/';

export const CircleQ = ({ tooltip }) => {

    return (
        <span className="circleQ">
            <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>
            <TheIcon/>
        </OverlayTrigger>
        </span>
    )
}