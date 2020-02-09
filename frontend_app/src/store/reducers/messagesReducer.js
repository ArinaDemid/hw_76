import {FETCH_MESSAGES_SUCCESS, SAVE_LAST_DATE, CREATE_MESSAGE_ERROR, CREATE_MESSAGE_REQUEST} from "../actions/messagesActions";

const initialState = {
  messages: [],
  lastTime: 0,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      return {...state, messages: [...state.messages, ...action.messages]};
    case SAVE_LAST_DATE:
      return {...state, lastTime: action.date};
    case CREATE_MESSAGE_ERROR:
      return {...state, error: action.error};
    case CREATE_MESSAGE_REQUEST:
      return {...state, error: null};
    default:
      return state;
  }
};

export default reducer;