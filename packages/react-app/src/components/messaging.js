import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Toast, Modal } from 'react-bootstrap/';

import { Blue, Error, PopupMessages } from '@project/react-app/src/components'

import { Context } from '@project/react-app/src/services'

import * as ModalActions from '@project/react-app/src/components/actions/modalActions'

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

    const index = props.message.index
    const onHide = props.onHide

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onHide(index)
        }, 6000);
        return () => clearTimeout(timer);
      }, [index, onHide]);

    return (
        <Toast onClose={(e) => {props.onHide(props.message.index, setShow)}} show={show}>
            <Toast.Header>
            <strong className="mr-auto"><Blue>NuCypher</Blue></strong>
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
            return m.index !== index
        })
        setMessages(visible)
        if(setShow !== undefined){
            setShow(false)
        }
    }

    useEffect(() => {
        if (context.messages.message !== null){
            const newMessage = {index: messageIndex, ...context.messages.message}
            const appended = messages
            appended.push(newMessage)
            setMessages(appended)
            incrementMessages(messageIndex + 1)
            context.messages.setMessage(null)
        }

    }, [context.messages.message, context.messages, messageIndex, messages])

    return (
        <PopupMessages>
            {messages.map((m) => {
                return <ToastMessage key={m.index} message={m} onHide={removeMessage}></ToastMessage>
            })}
        </PopupMessages>
    )
  }


  export const ModalDispatcher = () => {
    const context = useContext(Context)
    const [show, setShow] = useState(null)
    const [message, setMessage] = useState(null)
    const [component, setComponent] = useState(null)

    useEffect(() => {
        if (context.modals.modal){
            console.log(context.modals.modal)
            const modalData = context.modals.modal
            if (modalData.component){
                setComponent(modalData.component)
                setMessage(modalData.message)
                setShow(true)
            }

            context.modals.triggerModal(null)
        }
    }, [context.modals])

    let TheComponent = component ? ModalActions[component] : null

    return (
        <Modal show={show} onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {message}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                {component ? <TheComponent setShow={setShow}/> : null}
            </Modal.Body>
        </Modal>
    )
  }