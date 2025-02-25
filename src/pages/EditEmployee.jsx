

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editEmpDetailsAPI, allempdetailsAPI } from "../services/allAPI";
import SERVER_URL from "../services/serverUrl";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    postion: "",
    department: "",
    salary: "",
    empImg: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = { Authorization: `Bearer ${token}` };
        try {
          const result = await allempdetailsAPI(reqHeader);
          if (result.status === 200) {
            const empData = result.data.find((emp) => emp._id === id);
            if (empData) {
              setEmployee(empData);
            }
          }
        } catch (err) {
          console.log("Error fetching employee:", err);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview image
      setEmployee({ ...employee, empImg: file }); // Store file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("postion", employee.postion);
      formData.append("department", employee.department);
      formData.append("salary", employee.salary);
      if (employee.empImg) {
        formData.append("empImg", employee.empImg);
      }

      try {
        await editEmpDetailsAPI(id, formData, reqHeader);
        alert("Employee updated successfully!");
        navigate("/dashboard");
      } catch (err) {
        console.log("Error updating employee:", err);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <label className="block mb-2">Position:</label>
        <input
          type="text"
          name="postion"
          value={employee.postion}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <label className="block mb-2">Department:</label>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <label className="block mb-2">Salary:</label>
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <label className="block mb-2">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded mb-4"
        />
        {selectedImage || employee.empImg ? (
          <img
            src={selectedImage || `${SERVER_URL}/${employee.empImg}`}
            alt="Employee"
            className="w-32 h-32 object-cover rounded-md mb-4"
          />
        ) : null}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
