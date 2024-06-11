import axios from "../../Api/baseUrl"
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_PLACE: "/place/createplace",
  GET_ALL_APPROVED_PLACE:"/place/approved",
  GET_ALL_PENDING_PLACE:"/place/places/pending",
  COUNT_PLACE:"/place/approved/count",
  COUNT_PENDING_PLACE:"/place/pending/count",
  GET_ALL_SERVICES:"/place/places/services",
  CONFIRM_PLACE:"/place/confirm-place/:id",
  REJECT_PLACE:"/place/reject-place/:id",
  DELETE_PLACE:"/place/:id",

  CONFIRM_PLACE_SUCCESS: "CONFIRM_PLACE_SUCCESS",
  CONFIRM_PLACE_ERROR: "CONFIRM_PLACE_ERROR",
  REJECT_PLACE_SUCCESS: "REJECT_PLACE_SUCCESS",
  REJECT_PLACE_ERROR: "REJECT_PLACE_ERROR",
};

export const createPlace = (place) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(ACTIONS.CREATE_PLACE, place, config);

    dispatch({ type: ACTIONS.CREATE_PLACE, payload: data });

    toast.success("Place created successfully");
  } catch (error) {
    console.error("Error creating place:", error);

    toast.error("Error creating place");
  }
};


export const countplace = ()=>async (dispatch) => {
  try {
    const { data } = await axios.get(ACTIONS.COUNT_PLACE);
    dispatch({ type: ACTIONS.COUNT_PLACE, data });
  } catch (error) {
    console.error("Error counting places:", error);
    toast.error("Error counting places");
  }
}

export const getAllServices = ()=>async (dispatch) => {
  try {
    const { data } = await axios.get(ACTIONS.GET_ALL_SERVICES);
    dispatch({ type: ACTIONS.GET_ALL_SERVICES, data });
  } catch (error) {
    console.error("Error service ", error);
    toast.error("Error service");
  }
}

export const countpendingplace = ()=>async (dispatch) => {
  try {
    const { data } = await axios.get(ACTIONS.COUNT_PENDING_PLACE);
    dispatch({ type: ACTIONS.COUNT_PENDING_PLACE, data });
  } catch (error) {
    console.error("Error counting places:", error);

  }
}

export const approvedplace = ()=>async (dispatch) => {
  try {
    const { data } = await axios.get(ACTIONS.GET_ALL_APPROVED_PLACE);
    dispatch({ type: ACTIONS.GET_ALL_APPROVED_PLACE, data });
  } catch (error) {
    toast.error("Error approved places");
  }
}

export const pendingplace = ()=>async (dispatch) => {
  try {
    const { data } = await axios.get(ACTIONS.GET_ALL_PENDING_PLACE);
    dispatch({ type: ACTIONS.GET_ALL_PENDING_PLACE, data });
  } catch (error) {
    console.error("Error pending places:", error);
    toast.error("Error pending places");
  }
}

export const confirmPlace = (id) => async (dispatch) => {
  try {
    await axios.put(`/place/confirm-place/${id}`);
    dispatch({ type: ACTIONS.CONFIRM_PLACE_SUCCESS });
    toast.success("Place confirmed successfully");
  } catch (error) {
    console.error("Error confirming place:", error);
    dispatch({ type: ACTIONS.CONFIRM_PLACE_ERROR });
    toast.error("Error confirming place");
  }
};

export const rejectPlace = (id) => async (dispatch) => {
  try {
    await axios.delete(`/place/reject-place/${id}`);
    dispatch({ type: ACTIONS.REJECT_PLACE_SUCCESS });
    toast.success("Place rejected successfully");
  } catch (error) {
    console.error("Error rejecting place:", error);
    dispatch({ type: ACTIONS.REJECT_PLACE_ERROR });
    toast.error("Error rejecting place");
  }
};


export const deletePlace = (id) => async (dispatch) => {
  try {
    await axios.delete(`/place/${id}`);
    dispatch({ type: ACTIONS.DELETE_PLACE });
    toast.success("Place rejected successfully");
  } catch (error) {
    console.error("Error rejecting place:", error);
    toast.error("Error rejecting place");
  }
};
