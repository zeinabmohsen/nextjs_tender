import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { countplace ,countpendingplace } from "../redux/action/placeAction";
import { FaUser, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import { MdPerson, MdHourglassEmpty, MdCheckCircle } from 'react-icons/md';
import { IoPerson, IoTime, IoCheckmarkCircle } from 'react-icons/io';

const TopCards = () => {
    const dispatch = useDispatch();

    // Fetching approved data
    const ApprovedData = useSelector(({ placeReducer }) => placeReducer?.countApprovedPlaces.data.place);
    useEffect(() => {
        dispatch(countplace());
    }, [dispatch]);
    console.log(` approv ${ApprovedData}`)

    // Fetching pending data
    const PendingData = useSelector(({ placeReducer }) => placeReducer?.countPendingPlaces.data.place);
    useEffect(() => {
        dispatch(countpendingplace());
    }, [dispatch]);


  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>

        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>20</p>
                <p className='text-gray-600'>Parent</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg w-20'>
                <span className='text-green-900 text-lg center'><FaUser /></span>
            </p>
        </div>

        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{ApprovedData}</p>
                <p className='text-gray-600'>Approved Place</p>
                
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg w-20'>
                <span className='text-green-900 text-lg'><FaCheckCircle/></span>
            </p>
        </div>

        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{PendingData}</p>
                <p className='text-gray-600'>Pending Places</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg w-20'>
                <span className='text-green-900 text-lg'><FaHourglassHalf/></span>
            </p>
        </div>

    </div>
  );
};

export default TopCards;



// 1. dodajemo HTML elemente i stiliziramo ih
