import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { pendingplace } from "../redux/action/placeAction";
import { MdPlace } from 'react-icons/md';
import Modal from './PendingPlaceModal';

const POLLING_INTERVAL = 1000; // Polling interval in milliseconds

const RecentOrders = () => {
    const dispatch = useDispatch();
    const pendingData = useSelector(({ placeReducer }) => placeReducer?.pendingPlaces.data.places);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const fetchPendingPlaces = () => {
        dispatch(pendingplace())
        .then((response) => {
            // Update state with the fetched pending places
            if (response.data && response.data.places) {
                setPendingData(response.data.places);
            }
        })
        .catch((error) => {
            // Handle error if any
            console.error('Error fetching pending places:', error);
        });
    };

    useEffect(() => {
        fetchPendingPlaces(); // Fetch pending places when component mounts

        // Polling: Fetch pending places at regular intervals
        const intervalId = setInterval(fetchPendingPlaces, POLLING_INTERVAL);

        return () => {
            clearInterval(intervalId); // Clean up the interval on component unmount
        };
    }, [dispatch]);

    const handlePlaceClick = (place) => {
        setSelectedPlace(place);
        setIsModalOpen(true);
    };
    
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedTime = `${formattedHours}:${formattedMinutes}`;
        return formattedTime;
    }

    return (
        <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <h1>Pending Places</h1>
            <ul>
                {pendingData && Array.isArray(pendingData) && pendingData.map((place, id) => (
                    <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer' onClick={() => handlePlaceClick(place)}>
                        <div className='bg-purple-200 rounded-lg p-3'>
                            <MdPlace className='text-purple-800' />
                        </div>
                        <div className='pl-4'>
                            <p className='text-gray-800 font-bold'>{place.classification}</p>
                            <p className='text-gray-400 text-sm'>{place.name}</p>
                        </div>
                        <p className='lg:flex md:hidden absolute right-6 tex-sm'>
                            {formatTime(place.created_at)}
                        </p>
                    </li>
                ))}
            </ul>
            {isModalOpen && selectedPlace && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} place={selectedPlace} />}
        </div>
    );
};

export default RecentOrders;


