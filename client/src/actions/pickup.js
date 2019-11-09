import axios from 'axios'
import {
  GET_CHILDREN, 
  FETCHING_CHILDREN, 
  FETCHED_CHILDREN, 
  SELECT_CHILD,
  CHECKIN_CHILD,
  CHECKOUT_CHILD
} from './types'

export const getchildren = () => async (dispatch, getState) => {
  const {  accessToken, groupId, institutionId } = getState().pickup
  dispatch({ type: FETCHING_CHILDREN })
  const result = await axios.get('https://tryfamly.co/api/daycare/tablet/group', {
    params: {
      accessToken, groupId, institutionId
    }
  })
  dispatch({type: FETCHED_CHILDREN})
  dispatch({
    type: GET_CHILDREN,
    payload: result.data.children
  })
}

export const selectChild = (child) => async(dispatch) => {
  dispatch({
    type: SELECT_CHILD,
    payload: child
  })
}

export const checkinChild = (pickupTime) => async (dispatch, getState) => {
  const {  accessToken, selectedChild } = getState().pickup
  try {
    const result = await axios.post(`https://tryfamly.co/api/v2/children/${selectedChild.childId}/checkins`, null, {
      params: {
        accessToken,
        pickupTime
      }
    })
    dispatch({
      type: CHECKIN_CHILD,
      payload: result.data.childId
    })
  } catch(err) {

  }
}

export const checkoutChild = () => async (dispatch, getState) => {
  const {  accessToken, selectedChild } = getState().pickup
  try {
    const result = await axios.post(`https://tryfamly.co/api/v2/children/${selectedChild.childId}/checkout`, null, {
      params: {
        accessToken
      }
    })
    dispatch({
      type: CHECKOUT_CHILD,
      payload: result.data[0].childId
    })
  } catch(err) {

  }
}
