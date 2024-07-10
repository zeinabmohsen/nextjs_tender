import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getAppointmentsByDoctor } from "../../redux/action/appointmentAction";
import dynamic from "next/dynamic";
import UpdateStatusPopup from "./components/UpdateStatusPopup";

const CalendarPage = () => {
  // const [appointments, setAppointments] = useState([]); #layke hon sta3malt l use selector le 3a line 16, hay l use selector 
  // bt 5alleenna nna22e mn redux, l eshya le mnshoooofon b redux dev tools hon
  const [active, setActive] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const dispatch = useDispatch();
  const appointments = useSelector(
    ({ appointmentReducer }) => appointmentReducer.appointments
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (typeof window !== "undefined" && localStorage.getItem("userId")) {
          const doctorId = localStorage.getItem("userId");
          const doctorAppointments = await dispatch(
            getAppointmentsByDoctor(doctorId)
          );
          // setAppointments(doctorAppointments);
        } else {
          console.warn("localStorage is not available or userId is not set.");
        }
      } catch (error) {
        console.error("Error fetching appointments by doctor ID:", error);
      }
    };

    fetchAppointments();
  }, [dispatch]);

  const formattedAppointments = appointments.map((appointment) => ({
    title: `${appointment.fullName} - ${appointment.reason}`,
    start: `${appointment.appointment_date.split("T")[0]}T${
      appointment.start_time
    }`,
    end: appointment.end_time,
    status: appointment.status, // Assuming appointment.status holds 'Scheduled', 'Cancelled', 'Completed'
    appointment_id: appointment.appointment_id,
  }));
  const handleDateClick = (arg) => {
    // Redirect or handle date click as needed
    console.log("Date clicked:", arg.dateStr);
  };

  return (
    <div className="m-10 ">
      <div className="mt-10">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
            className: "custom-header-toolbar",
          }}
          height={"90vh"}
          selectable
          slotDuration="00:10:00"
          slotMinTime="08:00:00"
          slotMaxTime="22:00:00"
          slotLabelInterval={{ hours: 1 }}
          events={formattedAppointments}
          dayMaxEventRows={8}
          eventContent={(eventInfo) => (
            <div
              className={`px-2 py-1 rounded-md cursor-pointer ${
                eventInfo.event.extendedProps.status === "Scheduled"
                  ? "bg-blue-500 text-white"
                  : eventInfo.event.extendedProps.status === "Cancelled"
                  ? "bg-red-500 text-white"
                  : eventInfo.event.extendedProps.status === "Completed"
                  ? "bg-green-500 text-white"
                  : ""
              }`}
              onClick={() => {
                setActive(true);
                setSelectedAppointment(eventInfo.event.extendedProps);
              }}
            >
              <div>{eventInfo.timeText}</div>
              <div>{eventInfo.event.title}</div>
              <div>{eventInfo.event.extendedProps.status}</div>
            </div>
          )}
          dateClick={handleDateClick}
        />
      </div>
      <UpdateStatusPopup
        active={active}
        setActive={setActive}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(CalendarPage), { ssr: false });
