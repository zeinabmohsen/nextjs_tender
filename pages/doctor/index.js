import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill, BsThreeDotsVertical, BsSearch, BsPencilSquare, BsTrash, BsCheck } from 'react-icons/bs';
import Link from "next/link";
import { getAllDoctors, updateDoctor, deleteDoctor } from "../../redux/action/doctorAction";

const Doctors = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [editedDoctor, setEditedDoctor] = useState(null);
    // Changed this line to correctly access the doctors data
    const doctorsData = useSelector(({ doctorReducer }) => doctorReducer?.allDoctors?.data);


    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEditDoctor = (doctor) => {
        setEditedDoctor(doctor);
    };

    const handleSaveDoctor = () => {
        if (editedDoctor) {
            // Create a copy of the edited doctor
            const updatedDoctor = { ...editedDoctor };
            // Dispatch the updateDoctor action with the updated doctor
            dispatch(updateDoctor(updatedDoctor.doctor_id, updatedDoctor));
            // Clear the editedDoctor state
            setEditedDoctor(null);
        }
    };
    

    const handleDeleteDoctor = (doctorId) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            dispatch(deleteDoctor(doctorId));
            console.log(doctorId)
        }
    };

    const handleInputChange = (e, field) => {
        setEditedDoctor({
            ...editedDoctor,
            [field]: e.target.value
        });
    };

    const filteredDoctors = doctorsData && doctorsData.length > 0 ? doctorsData.filter((doctor) =>
        doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>Doctors</h1>
                    <div className='flex items-center space-x-4'>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#019874] placeholder-gray-500"
                                placeholder="Search doctors..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <BsSearch className="absolute left-3 top-3 text-[#019874] cursor-pointer" />
                        </div>
                        <Link href="/doctor/form">
                            <button className="bg-[#019874] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition duration-300">Add Doctor</button>
                        </Link>
                    </div>
                </div>

                <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                    <table className='w-full'>
                        <thead className='bg-gradient-to-r from-[#019874] to-[#99DFBD] text-white'>
                            <tr>
                                <th className='px-4 py-3 text-left'>Name</th>
                                <th className='px-4 py-3 text-left'>Phone</th>
                                <th className='px-4 py-3 text-left'>Specialty</th>
                                <th className='px-4 py-3 text-left'>Description</th>
                                <th className='px-4 py-3 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor.doctor_id} className='border-t hover:bg-gray-100 transition duration-300'>
                                    <td className='px-4 py-3'>
                                        {editedDoctor && editedDoctor.doctor_id === doctor.doctor_id ? (
                                            <input type="text" value={editedDoctor.doctor_name} onChange={(e) => handleInputChange(e, 'doctor_name')} className='border rounded-md px-2 py-1 w-full focus:outline-none focus:border-[#019874]' />
                                        ) : (
                                            <span>{doctor.doctor_name}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-3'>
                                        {editedDoctor && editedDoctor.doctor_id === doctor.doctor_id ? (
                                            <input type="text" value={editedDoctor.number} onChange={(e) => handleInputChange(e, 'number')} className='border rounded-md px-2 py-1 w-full focus:outline-none focus:border-[#019874]' />
                                        ) : (
                                            <span>{doctor.number}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-3'>
                                        {editedDoctor && editedDoctor.doctor_id === doctor.doctor_id ? (
                                            <input type="text" value={editedDoctor.specialty} onChange={(e) => handleInputChange(e, 'specialty')} className='border rounded-md px-2 py-1 w-full focus:outline-none focus:border-[#019874]' />
                                        ) : (
                                            <span>{doctor.specialty}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-3'>
                                        {editedDoctor && editedDoctor.doctor_id === doctor.doctor_id ? (
                                            <input type="text" value={editedDoctor.description} onChange={(e) => handleInputChange(e, 'description')} className='border rounded-md px-2 py-1 w-full focus:outline-none focus:border-[#019874]' />
                                        ) : (
                                            <span>{doctor.description}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-3'>
                                        {editedDoctor && editedDoctor.doctor_id === doctor.doctor_id ? (
                                            <button onClick={handleSaveDoctor} className='text-[#019874]'>
                                                <BsCheck />
                                            </button>
                                        ) : (
                                            <div className='flex space-x-2'>
                                                <button onClick={() => handleEditDoctor(doctor)} className='text-[#4a90e2] hover:text-[#047857] transition duration-300'>
                                                    <BsPencilSquare />
                                                </button>
                                                <button onClick={() => handleDeleteDoctor(doctor.doctor_id)} className='text-red-600 hover:text-red-800 transition duration-300'>
                                                    <BsTrash />
                                                </button>
                                            </div>
                                        )}
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

export default Doctors;




