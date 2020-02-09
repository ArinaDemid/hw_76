import axiosApi from "../../axiosApi";

export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';
export const CREATE_MESSAGE_ERROR = 'CREATE_MESSAGE_ERROR';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';

export const SAVE_LAST_DATE = 'SAVE_LAST_DATE';

export const fetchProductsSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});
export const createMessageSuccess = () => ({type: CREATE_MESSAGE_SUCCESS});
export const saveLastDate = (date) => ({type: SAVE_LAST_DATE, date});
export const createMessageError = (error) => ({type: CREATE_MESSAGE_ERROR, error});
export const createMessageReguest= () => ({type: CREATE_MESSAGE_REQUEST});

export const fetchMessages = (date) => {
  return async dispatch => {
    const response = await axiosApi.get('/messages?datetime=' + date);
    if (response.data) {
      if (response.data.length === 0) {
        dispatch(fetchProductsSuccess(response.data));
      } else {
        dispatch(saveLastDate(response.data.slice(-1)[0].datetime));
        dispatch(fetchProductsSuccess(response.data));
      }
    }
  };
};

export const onSubmitMessage = (message) => {
  return async dispatch => {
    dispatch(createMessageReguest());
    try {
      await axiosApi.post('/messages', message);
      dispatch(createMessageSuccess());
    } catch(error) {
      dispatch(createMessageError(error.response.data.error));
    }
  };
};