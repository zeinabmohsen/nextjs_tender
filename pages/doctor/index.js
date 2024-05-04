import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill, BsThreeDotsVertical, BsSearch } from 'react-icons/bs';
import Link from "next/link";
import { getAllDoctors , deleteDoctor } from "../../redux/action/doctorAction";

const Doctors = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const doctorsData = useSelector(({ doctorReducer }) => doctorReducer?.allDoctors.data.doctors);

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

     const handleDeleteDr = ()=>{
        dispatch(deleteDoctor(doctor.id));
        toast.success("dr deleted successfully");
     }

    const filteredDoctors = doctorsData && doctorsData.length > 0 ? doctorsData.filter((doctor) =>
        doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between p-4'>
                <h2>Doctor</h2>
                <h2>Welcome Back, User</h2> {/* Replace "User" with actual user's name */}
            </div>

            <div className='p-10'>
                <div className='flex items-center justify-between mb-5'>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            className="px-4 py-2  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#019874] placeholder-gray-500"
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
                    <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Name</span>
                        <span className='sm:text-left text-right'>Phone</span>
                        <span className='hidden md:grid'>Specialty</span>
                        <span className='hidden sm:grid'>Description</span>
                    </div>

                    <ul>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <li key={doctor.doctor_id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                                    <div className='flex items-center'>
                                        <div className='bg-purple-200 p-3 rounded-lg'>
                                            <BsPersonFill className='text-purple-800'/>
                                        </div>
                                        <p className='pl-4'>{doctor.doctor_name}</p>
                                    </div>
                                    <p className='text-gray-600 sm:text-left text-right'>{doctor.number}</p>
                                    <p className='hidden md:flex'>{doctor.specialty}</p>
                                    
                                    <div className='hidden sm:flex justify-between items-center'>
                                        <p>{doctor.description}</p>
                                        <BsThreeDotsVertical />
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>No doctors found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Doctors;


