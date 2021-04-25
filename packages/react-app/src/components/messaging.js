import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Toast, Row, Col, Button, Container } from 'react-bootstrap/';

import { Blue, Error, PopupMessage } from '@project/react-app/src/components'

import { Context } from '@project/react-app/src/utils'

export function MessagePublisher (){
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')

    const context = useContext(Context)

    useEffect(() => {
        if (context.messages.message){
            setShow(true)
            setMessage(context.messages.message)
            context.messages.publishMessage()
        }

    }, [context.messages.message])

    return (
        <PopupMessage>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                <strong className="mr-auto"><Blue>NuCypher</Blue></strong>
                </Toast.Header>
                <Toast.Body><Error>{message}</Error></Toast.Body>
            </Toast>
        </PopupMessage>
    )
  }