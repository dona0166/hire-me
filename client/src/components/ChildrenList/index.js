import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { BigInputMoment } from 'react-input-moment'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { getchildren, selectChild, checkinChild, checkoutChild } from '../../actions/pickup'
import './styles'

const ChildrenList = () => {
    const [pickupTime, setPickupTime] = useState(moment())
    const [elementEntered, setElementEntered] = useState(null)
    const [openModal, setOpenModal] = useState(false) 
    const { children, fetched, selectedChild } = useSelector((state) => state.pickup)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getchildren())
        console.log(children)
    }, [])

    const handleMouseEntered = (i) => {
        setElementEntered(i)
    }

    const handleMouseLeave = () => {
        setElementEntered(null)
    }

    const handleChildClick = (child) => {
        dispatch(selectChild(child))
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleChange = m => {
        setPickupTime(m)
    }

    const handleCheckin = () => {
        dispatch(checkinChild(pickupTime))
        setOpenModal(false)
    }

    const handleCheckout = () => {
        dispatch(checkoutChild())
        setOpenModal(false)
    }

    const renderModal = () => {
        if(selectedChild) {
            if(!selectedChild.checkedIn) {
                return (
                    <Modal 
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={openModal} 
                        onHide={handleClose}
                        size='lg'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedChild.name.fullName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BigInputMoment 
                                moment={pickupTime}
                                onChange={handleChange}
                                locale='en'
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="warning" onClick={handleCheckin}>
                                Check-in 
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            } else {
                return (
                    <Modal 
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={openModal} 
                        onHide={handleClose}
                        size='lg'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedChild.name.fullName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Modal.Title>You are already checked-in</Modal.Title>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="warning" onClick={handleCheckout}>
                                Check-out
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        }
        
        
    }
  
    if(fetched) {
        return (
            <div className="container overflow-hidden">
                <div className="text-center d-flex flex-row flex-wrap overflow-hidden">
                    {children.map((child, index) => (
                        <div 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => handleMouseEntered(index)} 
                            onMouseLeave={() => handleMouseLeave()} 
                            onClick={() => handleChildClick(child)}
                            tabIndex={index} 
                            key={child.childId} 
                            className="bubble p-2 mx-auto my-1"
                        >
                            <div className="image-overlay">{index === elementEntered && child.name.firstName}</div>
                            <Image style={{maxWidth:'100%', maxHeight:'100%'}} src={child.image.small ? child.image.small : process.env.PUBLIC_URL + '/images/not-found-image.png'} roundedCircle />
                        </div>
                    ))}
                </div>
                {renderModal()}
                
            </div>
        )
    } 

    return (
        <div className="container d-flex justify-content-center align-content-center">
            <Spinner className="center-block" animation="border" />
        </div>
    )  
}

export default ChildrenList;
