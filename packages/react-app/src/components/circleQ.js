import React from 'react';
import { ReactComponent as TheIcon } from '@project/react-app/src/assets/icons/circleQ.svg'
import { Tooltip, OverlayTrigger} from 'react-bootstrap/';

export const CircleQ = (props) => {

    return (
        <span className="circleQ">
            <OverlayTrigger overlay={<Tooltip>{props.children}</Tooltip>}>
            <TheIcon/>
        </OverlayTrigger>
        </span>
    )
}