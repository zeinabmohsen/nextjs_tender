import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill, BsThreeDotsVertical, BsSearch, BsPencilSquare, BsTrash } from 'react-icons/bs';
import Link from "next/link";
import { getAllDoctors , deleteDoctor } from "../../redux/action/doctorAction";

const Doctors = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const doctorsData = useSelector(({ doctorReducer }) => doctorReducer?.allDoctors.data);

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDeleteDoctor = (doctorId) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            dispatch(deleteDoctor(doctorId));
            // You can also show a success message here
        }
    };

    const filteredDoctors = doctorsData && doctorsData.length > 0 ? doctorsData.filter((doctor) =>
        doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="bg-gray-100 min-h-screen">
        <div className=' min-h-screen container mx-auto'>
            <div className='p-10'>
                <div className='flex items-center justify-between mb-5'>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#019874] placeholder-gray-500"
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ backgroundColor: 'white', paddingLeft: 40 }}
                        />
                        <BsSearch className="absolute left-3 top-3 text-[#019874] cursor-pointer" />
                    </div>
                    <Link href="/doctor/form">
                        <button className="bg-[#019874] text-white px-4 py-2 rounded-lg">Add Doctor</button>
                    </Link>
                </div>

                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Name</span>
                        <span className='sm:text-left text-right'>Phone</span>
                        <span className='hidden md:grid'>Specialty</span>
                        <span className='hidden sm:grid'>Description</span>
                        <span className='hidden sm:grid'>Actions</span>
                    </div>

                    <ul>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <li key={doctor.doctor_id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                                    <div className='flex items-center'>
                                        {doctor.doctor_image ? (
                                            <div className='bg-purple-200 p-1 rounded-lg' style={{ width: 40, height: 40 }}>
                                                <img src={`http://localhost:3000${doctor.doctor_image}`} alt="Doctor" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} />
                                            </div>
                                        ) : (
                                            <div className='bg-purple-200 p-3 rounded-lg' style={{ width: 40, height: 40 }}>
                                                <BsPersonFill className='text-purple-800'/>
                                            </div>
                                        )}
                                        <p className='pl-4'>{doctor.doctor_name}</p>
                                    </div>
                                    <p className='text-gray-600 sm:text-left text-right'>{doctor.number}</p>
                                    <p className='hidden md:flex'>{doctor.specialty}</p>
                                    <div className='hidden sm:flex justify-between items-center'>
                                        <p>{doctor.description}</p>
                                    </div>
                                    <div className="">
                                        <div>
                                            <Link href={`/doctor/form/${doctor.doctor_id}`}>
                                                <button className='text-purple-600 mr-2'>
                                                    <BsPencilSquare />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDeleteDoctor(doctor.doctor_id)} className='text-red-600'>
                                                <BsTrash />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>No doctors found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div></div>
    );
};

export default Doctors;




