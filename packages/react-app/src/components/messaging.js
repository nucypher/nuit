import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Toast, Modal } from 'react-bootstrap/';

import { Blue, Error, PopupMessages } from '@project/react-app/src/components'

import { Context } from '@project/react-app/src/utils'


const ShowMessage = (message) => {

    switch(message.type) {
        case 'error':
            return <Error>{message.message}</Error>
        default:
            return <Blue>{message.message}</Blue>
    }
}

const ToastMessage = (props) => {

    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(false)
    })

    return (
        <Toast onClose={(e) => {props.onHide(props.message.index, setShow)}} show={show} delay={6000} autohide>
            <Toast.Header>
            <strong className="mr-auto"><Blue>NuCypher {props.message.index}</Blue></strong>
            </Toast.Header>
            <Toast.Body>{ShowMessage(props.message)}</Toast.Body>
        </Toast>
    )
}

export const MessagePublisher = () => {

    const [messages, setMessages] = useState([])
    const [messageIndex, incrementMessages] = useState(0)
    const context = useContext(Context)

    const removeMessage = (index, setShow) => {

        const visible = messages.filter((m) => {
            return m.index != index
        })
        setMessages(visible)
        setShow(false)
    }

    useEffect(() => {
        if (context.messages.message !== null){
            const newMessage = {index: messageIndex, ... context.messages.message}

            const appended = messages
            appended.push(newMessage)

            setMessages(appended)
            incrementMessages(messageIndex + 1)
            context.messages.setMessage(null)
        }

    }, [context.messages.message, context.messages])

    return (
        <PopupMessages>
            {messages.map((m) => {
                return <ToastMessage key={m.index} message={m} onHide={removeMessage}></ToastMessage>
            })}
        </PopupMessages>
    )
  }


  export const ModalPopup = () => {
    const context = useContext(Context)

    useEffect(() => {

    }, [context.modals.modal, context.modals])




  }