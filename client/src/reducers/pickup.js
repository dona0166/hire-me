import { 
  GET_CHILDREN, 
  FETCHING_CHILDREN, 
  FETCHED_CHILDREN, 
  SELECT_CHILD,
  CHECKIN_CHILD,
  CHECKOUT_CHILD
} from '../actions/types'

const initialState = {
  accessToken: '234ffdb8-0889-4be3-b096-97ab1679752c',
	groupId: '11fc220c-ebba-4e55-9346-cd1eed714620',
  institutionId: 'fb6c8114-387e-4051-8cf7-4e388a77b673',
  children: [],
  fetched: false,
  selectedChild: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CHILDREN:  
      return {
        ...state,
        children: action.payload
      }
    
    case SELECT_CHILD: 
      return {
        ...state,
        selectedChild: action.payload
      }
    
    case CHECKIN_CHILD: { 
      const updatingChildren = [...state.children]
      const updatedChildren = updatingChildren.map(child => {
        if(child.childId === action.payload){
          child.checkedIn = true
        }
        return child
      })

      return {
        ...state,
        children: updatedChildren
      }
    }

    case CHECKOUT_CHILD: {
      const updatingChildren = [...state.children]
      const updatedChildren = updatingChildren.map(child => {
        if(child.childId === action.payload){
          child.checkedIn = false
        }
        return child
      })

      return {
        ...state,
        children: updatedChildren
      }
    }

    case FETCHING_CHILDREN: 
      return {
        ...state,
        fetched: false
      }

    case FETCHED_CHILDREN: 
      return {
        ...state,
        fetched: true
      }
      
    default: 
      return state
  }
}