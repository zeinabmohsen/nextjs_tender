import { ACTIONS } from "../action/communityAction";

const initialState = {
  allComments: {
    loaded: false,
    data: [],
  },
  commentDetails: {
    loaded: false,
    data: {},
  },
  commentReplies: {
    loaded: false,
    data: [],
  },
};

const communityReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_COMMENTS:
      return {
        ...state,
        allComments: {
          loaded: true,
          data,
        }
      };
    case ACTIONS.GET_COMMENT_BY_ID:
      return {
        ...state,
        commentDetails: {
          loaded: true,
          data,
        }
      };
    case ACTIONS.GET_REPLIES_BY_COMMENT_ID:
      return {
        ...state,
        commentReplies: {
          loaded: true,
          data,
        }
      };
    case ACTIONS.ADD_COMMENT:
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: [...state.allComments.data, data],
        }
      };
    case ACTIONS.DELETE_COMMENT:
      return state;
    case ACTIONS.UPDATE_COMMENT:
      // Handle updating a comment if needed
      return state;
    case ACTIONS.ADD_REPLY:
      // Handle adding a reply to a comment if needed
      return state;
    case ACTIONS.ADD_LIKE:
      // Handle adding a like to a comment if needed
      return state;
    case ACTIONS.UNLIKE_COMMENT:
      // Handle removing a like from a comment if needed
      return state;
    case ACTIONS.TOTAL_LIKES:
      // Handle getting total likes of a comment if needed
      return state;
    default:
      return state;
  }
};

export default communityReducer;
