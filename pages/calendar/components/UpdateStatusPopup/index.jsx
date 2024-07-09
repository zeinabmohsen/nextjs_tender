import Popup from "@/components/Popup";
import { updateAppointmentStatus } from "@/redux/action/appointmentAction";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UpdateStatusPopup = ({ appointment, active, setActive }) => {
  const [newStatus, setNewStatus] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    await dispatch(
      updateAppointmentStatus(appointment.appointment_id, newStatus)
    );
    setActive(false);
  }, [dispatch, appointment, newStatus]);

  useEffect(() => {
    setNewStatus(appointment?.status);
  }, [appointment]);

  return (
    <Popup
      header="Update Appointment Status"
      children={
        <div className="flex flex-col items-center mt-2 gap-4">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-019874 mr-2 w-full"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            className="bg-[#019874] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full"
            onClick={handleSubmit}
          >
            Update Status
          </button>
        </div>
      }
      isOpen={active}
      setIsOpen={setActive}
    />
  );
};

export default UpdateStatusPopup;
