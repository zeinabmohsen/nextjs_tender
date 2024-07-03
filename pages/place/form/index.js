import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlace, getAllServices } from '../../../redux/action/placeAction';

const Form = () => {
  const dispatch = useDispatch();
  const ServicesData = useSelector(({ placeReducer }) => placeReducer?.allPlaces?.data?.services);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    userid: '4',
    name: '',
    classification: '',
    region: '',
    city: '',
    services: [],
    location: '',
    photos: [],
    termsAccepted: false,
  });

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    console.log("Handling change for input:", name);
    console.log("Input type:", type);
    console.log("Input checked:", checked);
    console.log("Input value:", value);

    if (type === 'checkbox' && name === 'services') {
      const serviceId = event.target.dataset.serviceid;
      console.log("Service ID:", serviceId);
      const updatedServices = checked
        ? [...new Set([...formData.services, serviceId])]
        : formData.services.filter((id) => id !== serviceId);

      console.log("Updated services:", updatedServices);

      setFormData((prevData) => ({
        ...prevData,
        services: updatedServices,
      }));
    } else {
      console.log("Updating form data for input:", name);
      console.log("Previous value:", formData[name]);
      console.log("New value:", type === 'checkbox' ? checked : value);

      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };


  const services = [
    { id: '1', name: 'WheelChair' },
    { id: '2', name: 'ADHD' },
    { id: '3', name: 'Austtim' },
  ];


  
  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to array

    setFormData((prevData) => ({
      ...prevData,
      photos: selectedFiles,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('userid', formData.userid);
    data.append('name', formData.name);
    data.append('classification', formData.classification);
    data.append('region', formData.region);
    data.append('city', formData.city);
    data.append('location', formData.location);
    data.append('termsAccepted', formData.termsAccepted);

    formData.services.forEach(service => data.append('services', service));
    formData.photos.forEach(photo => data.append('photos', photo));

    dispatch(createPlace(data));

    setFormData({
      userid: '4',
      name: '',
      classification: '',
      region: '',
      city: '',
      services: [],
      location: '',
      photos: [],
      termsAccepted: false,
    });
  };

  return (
    <div className="bg-gray-100 px-4 py-8">
      <div className="container mx-auto px-4 py-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-[#019874] mb-4 text-center">Request to Add a New Place</h2>
        <p className="text-gray-700 mb-8 text-center">
          Please fill out the questionnaire with correct and accurate information. All information will be reviewed before adding the place.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
              Name of the Place
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="classification" className="block text-sm font-medium text-gray-800 mb-2">
              Place Classification
            </label>
            <select
              id="classification"
              name="classification"
              className="focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.classification}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Classification --</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="tourist_attraction">Tourist Attraction</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="region" className="block text-sm font-medium text-gray-800 mb-2">
              Region
            </label>
            <input
              type="text"
              id="region"
              name="region"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-800 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium text-gray-800 mb-2">Services Provided</label>
            <div className="grid grid-cols-2 gap-4">
      {services.map((service) => (
        <div key={service.id}>
          <input
            type="checkbox"
            name="services"
            className="focus:ring-green-500 h-4 w-4 text-green-500 border-gray-300 rounded"
            checked={formData.services.includes(service.id)}
            onChange={handleChange}
            data-serviceid={service.id}
          />
          <label className="ml-3" htmlFor={service.id}>{service.name}</label>
        </div>
      ))}

            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-800 mb-2">
              Location URL
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <label htmlFor="photos" className="text-sm font-medium mb-2 bg-[#019874] text-white rounded-lg px-7 py-5 cursor-pointer">
              <div style={{ textAlign: 'center' }}>
                {formData.photos && formData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index}`}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginRight: '8px' }}
                  />
                ))}
              </div>
            </label>
            <input type="file" name="photos" onChange={handleImageChange} id="photos" className="hidden" multiple />
          </div>

          <div className="mb-4">
            <label htmlFor="termsAccepted" className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                className="focus:ring-green-500 h-4 w-4 text-green-500 border-gray-300 rounded"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <span className="ml-2 text-gray-800">
                I agree to the terms and conditions and privacy policy
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-md text-white bg-[#019874] hover:bg-[#99DFBD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
