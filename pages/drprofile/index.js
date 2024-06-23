import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDoctor, getDoctorById } from '../../redux/action/doctorAction';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

const EditDoctorForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = localStorage.getItem('userId'); // Retrieve doctor ID from local storage
  const [img, setImage] = useState(null);

  const doctorData = useSelector(({ doctorReducer }) => doctorReducer.doctor?.doctor);

  useEffect(() => {
    if (id) {
      dispatch(getDoctorById(id))
        .then((response) => {
          setFormData(response.data);
          setImage(response.data.doctor_image);
        })
        .catch((error) => {
          console.error('Error fetching doctor details:', error);
        });
    }
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    doctor_name: '',
    specialty: '',
    experience: '',
    number: '',
    description: '',
    doctor_image: null,
    email: '',
    password: '',
    termsAccepted: false,
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        doctor_name: doctorData.doctor_name || '',
        specialty: doctorData.specialty || '',
        experience: doctorData.experience || '',
        number: doctorData.number || '',
        description: doctorData.description || '',
        doctor_image: null,
        email: doctorData.email || '',
        password: doctorData.password || '',
        termsAccepted: false,
      });
      setImage(doctorData.doctor_image);
    }
  }, [doctorData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setFormData((prevData) => ({
        ...prevData,
        doctor_image: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `${id}`;

    dispatch(updateDoctor(url, formData))
      .then(response => {
        console.log("Update Doctor Response:", response);
        // Optionally, redirect or show success message
      })
      .catch(error => {
        console.error("Update Doctor Error:", error);
        // Optionally, show error message
      });
  };

  const isFile = (file) => {
    return file instanceof File;
  };

  return (
    <div className="bg-gray-100 px-4 py-8">
      <div className="container mx-auto px-4 py-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-[#019874] mb-4 text-center">Profile</h2>
        <p className="text-gray-700 mb-8 text-center">
          Please fill out the form with accurate information.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="doctor_name" className="block text-sm font-medium text-gray-800 mb-2">Doctor Name</label>
            <input
              type="text"
              id="doctor_name"
              name="doctor_name"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.doctor_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-800 mb-2">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-800 mb-2">Experience Years</label>
            <input
              type="number"
              id="experience"
              name="experience"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-sm font-medium text-gray-800 mb-2">Phone Number</label>
            <input
              type="tel"
              id="number"
              name="number"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4 flex justify-center items-center">
            <label htmlFor="doctor_image" className="text-sm font-medium mb-2 bg-[#019874] text-white rounded-lg px-7 py-5 cursor-pointer">
              <div style={{ textAlign: 'center' }}>
                {img && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {isFile(img) ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Uploaded"
                        style={{ maxWidth: '20%', height: 'auto' }}
                      />
                    ) : (
                      <img
                        src={`http://localhost:3000${img}`}
                        alt="Uploaded"
                        style={{ maxWidth: '20%', height: 'auto' }}
                      />
                    )}
                  </div>
                )}
                {!img && <p>+</p>}
              </div>
            </label>
            <input type="file" name="doctor_image" onChange={onImageChange} id="doctor_image" className="hidden" />
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
            Update Doctor
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditDoctorForm;
