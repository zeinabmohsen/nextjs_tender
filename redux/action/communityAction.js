import axios from "../../Api/baseUrl";
import { toast } from "react-toastify";

export const ACTIONS = {
  ADD_COMMENT: "/community/addcomment",
  DELETE_COMMENT: "/community/deletecomment/:commentID",
  UPDATE_COMMENT: "/community/updatecomment/:commentID",
  ADD_REPLY: "/community/addreply/:commentID",
  ADD_LIKE: "/community/addlike/:commentID",
  UNLIKE_COMMENT: "/community/unlike/:commentID",
  TOTAL_LIKES: "/community/totallikes/:commentID",
  GET_COMMENT_BY_ID: "/community/comment/:commentID",
  GET_REPLIES_BY_COMMENT_ID: "/community/comment/:commentID/replies",
  GET_ALL_COMMENTS: "/community/comments",
  GET_COMMENTS_BY_USER_ID: "/community/comments/user/:userID",
};

export const addComment = (comment) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    };

    const { data } = await axios.post(ACTIONS.ADD_COMMENT, comment, config);
    dispatch({ type: ACTIONS.ADD_COMMENT, data });
    toast.success("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

export const deleteComment = (commentID) => async (dispatch) => {
  try {
    await axios.delete(`/community/deletecomment/${commentID}`);
    dispatch({ type: ACTIONS.DELETE_COMMENT });
    toast.success("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    toast.error("Error deleting comment");
  }
};

// Similar implementations for other CRUD operations...

// Additional actions...

export const getCommentById = (commentID) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/community/comment/${commentID}`);
    dispatch({ type: ACTIONS.GET_COMMENT_BY_ID, data });
  } catch (error) {
    console.error("Error getting comment by ID:", error);
    toast.error("Error getting comment by ID");
  }
};

export const getRepliesByCommentId = (commentID) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/community/comment/${commentID}/replies`);
    dispatch({ type: ACTIONS.GET_REPLIES_BY_COMMENT_ID, data });
  } catch (error) {
    console.error("Error getting replies by comment ID:", error);
    toast.error("Error getting replies by comment ID");
  }
};

export const getAllComments = () => async (dispatch) => {
  try {
    const { data } = await axios.get(ACTIONS.GET_ALL_COMMENTS);
    dispatch({ type: ACTIONS.GET_ALL_COMMENTS, data });
  } catch (error) {
    console.error("Error getting all comments:", error);
    toast.error("Error getting all comments");
  }
};

export const getCommentsByUserId = (userID) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/community/comments/user/${userID}`);
    dispatch({ type: ACTIONS.GET_COMMENTS_BY_USER_ID, data });
  } catch (error) {
    console.error("Error getting comments by user ID:", error);
    toast.error("Error getting comments by user ID");
  }
};
