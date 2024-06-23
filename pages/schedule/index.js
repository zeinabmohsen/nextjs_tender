import React, { useEffect, useState } from 'react';
import { getScheduleByDoctorId, createSchedule, updateSchedule, deleteSchedule } from '../../redux/action/scheduleAction';
import { useDispatch, useSelector } from 'react-redux';

const Schedule = () => {
  const dispatch = useDispatch();
  const [scheduleForm, setScheduleForm] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');
  const [slotDuration, setSlotDuration] = useState(30);

  useEffect(() => {
    const fetchScheduleData = () => {
      const doctorId = localStorage.getItem('userId');
      if (doctorId) {
        dispatch(getScheduleByDoctorId(doctorId));
      } else {
        console.log("userId not found in localStorage");
      }
    };

    fetchScheduleData();

    const intervalId = setInterval(fetchScheduleData, 8000 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const scheduleData = useSelector(({ scheduleReducer }) => scheduleReducer?.allSchedules?.data?.schedule);

  useEffect(() => {
    if (scheduleData) {
      setScheduleForm(scheduleData.map(schedule => ({
        id: schedule.id,
        day: schedule.day_of_week,
        startTime: schedule.start_time,
        endTime: schedule.end_time,
        slotDuration: schedule.slot_duration
      })));
    }
  }, [scheduleData]);

  const addOrUpdateDay = () => {
    const doctorId = localStorage.getItem('userId');
    if (!doctorId) {
      console.log("userId not found in localStorage");
      return;
    }

    const existingDayIndex = scheduleForm.findIndex(day => day.day === selectedDay);

    if (existingDayIndex !== -1) {
      const updatedSchedule = [...scheduleForm];
      updatedSchedule[existingDayIndex] = { day: selectedDay, startTime, endTime, slotDuration };
      setScheduleForm(updatedSchedule);

      const scheduleId = updatedSchedule[existingDayIndex].id;
      dispatch(updateSchedule({
        scheduleId,
        doctorId,
        dayOfWeek: selectedDay,
        startTime,
        endTime,
        slotDuration
      }));
    } else {
      const newDay = {
        day: selectedDay,
        startTime,
        endTime,
        slotDuration
      };
      setScheduleForm([...scheduleForm, newDay]);

      dispatch(createSchedule({
        doctorId,
        dayOfWeek: selectedDay,
        startTime,
        endTime,
        slotDuration
      }));
    }

    resetForm();
  };

  const handleTimeChange = (index, field, value) => {
    const updatedSchedule = [...scheduleForm];
    updatedSchedule[index][field] = value;
    setScheduleForm(updatedSchedule);
  };

  const handleEditDay = (index) => {
    const { day, startTime, endTime, slotDuration } = scheduleForm[index];
    setSelectedDay(day);
    setStartTime(startTime);
    setEndTime(endTime);
    setSlotDuration(slotDuration);
  };

  const handleDeleteDay = (scheduleId) => {
    const doctorId = localStorage.getItem('userId');
    if (!doctorId) {
      console.log("userId not found in localStorage");
      return;
    }

    // Optimistically remove the day from UI
    const updatedSchedule = scheduleForm.filter(day => day.id !== scheduleId);
    setScheduleForm(updatedSchedule);

    // Delete the schedule from backend
    dispatch(deleteSchedule(scheduleId));
  };

  const resetForm = () => {
    setSelectedDay('Monday');
    setStartTime('08:00');
    setEndTime('16:00');
    setSlotDuration(30);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#019874]">Doctor Schedule</h1>
        <div className="flex justify-center items-center mb-4">
          <label className="mr-2">Select Day:</label>
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="mr-4 rounded border border-gray-300 px-3 py-2 focus:outline-none">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <label className="mr-2">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mr-4 rounded border border-gray-300 px-3 py-2 focus:outline-none"
            step="60" // Added step attribute to allow minutes in increments of 1 minute
          />
          <label className="mr-2">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mr-4 rounded border border-gray-300 px-3 py-2 focus:outline-none"
            step="60" // Added step attribute to allow minutes in increments of 1 minute
          />
          <label className="mr-2">Slot Duration (mins):</label>
          <input
            type="number"
            value={slotDuration}
            min={0}
            max={59}
            onChange={(e) => setSlotDuration(e.target.value)}
            className="mr-4 rounded border border-gray-300 px-3 py-2 focus:outline-none"
          />

          <button
            onClick={addOrUpdateDay}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Add/Update Day
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-[#019874] dark:text-gray-400 shadow-md rounded-lg">
            <thead className="text-xs text-white uppercase bg-[#019874] rounded-t-lg">
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4">Day</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4">Start Time</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4">End Time</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4">Slot Duration (mins)</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduleForm.map((day, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{day.day}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(event) => handleTimeChange(index, 'startTime', event.target.value)}
                      className="border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:shadow-outline-green px-3 py-2 w-32"
                      step="60" // Added step attribute to allow minutes in increments of 1 minute
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(event) => handleTimeChange(index, 'endTime', event.target.value)}
                      className="border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:shadow-outline-green px-3 py-2 w-32"
                      step="60" // Added step attribute to allow minutes in increments of 1 minute
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <input
                      type="number"
                      value={day.slotDuration}
                      onChange={(event) => handleTimeChange(index, 'slotDuration', event.target.value)}
                      className="border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:shadow-outline-green px-3 py-2 w-32"
                      min={0}
                      max={59}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button
                      onClick={() => handleEditDay(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDay(day.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
