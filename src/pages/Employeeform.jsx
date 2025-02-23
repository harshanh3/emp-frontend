import React, { useState } from "react";
import { addEmpDetailsAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
    const Navigate = useNavigate()

  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    id: "",
    postion: "",
    department: "",
    salary: "",
    empImg: null,
  });

  const [preview, setPreview] = useState("");

  const handleAddEmp = async (e) => {
    e.preventDefault();

    const { name, id, postion, department, salary, empImg } = employeeDetails;
    console.log("Employee Details:", employeeDetails);

    if (name && id.trim() && postion && department && salary && empImg) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("id", id.trim());
      reqBody.append("postion", postion);
      reqBody.append("department", department);
      reqBody.append("salary", salary);
      reqBody.append("empImg", empImg);

      console.log("FormData Entries:");
      for (let pair of reqBody.entries()) {
        console.log(pair[0], pair[1]);
      }

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await addEmpDetailsAPI(reqBody,reqHeader)
          if (result.status==200) {
            alert("Employee Added Successfully");
            Navigate('/dashboard')
          } else {
            alert(result.response.data)
          }
        } catch (err) {
          console.log(err);
          
        }
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeDetails((prev) => ({ ...prev, empImg: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Employee Details</h2>
      <form className="space-y-4" onSubmit={handleAddEmp}>
        <input
          value={employeeDetails.name}
          onChange={(e) => setEmployeeDetails((prev) => ({ ...prev, name: e.target.value }))}
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          value={employeeDetails.id}
          onChange={(e) => setEmployeeDetails((prev) => ({ ...prev, id: e.target.value }))}
          type="text"
          placeholder="ID"
          className="border p-2 w-full"
          required
        />
        <input
          value={employeeDetails.postion}
          onChange={(e) => setEmployeeDetails((prev) => ({ ...prev, postion: e.target.value }))}
          type="text"
          placeholder="Position"
          className="border p-2 w-full"
          required
        />
        <input
          value={employeeDetails.department}
          onChange={(e) => setEmployeeDetails((prev) => ({ ...prev, department: e.target.value }))}
          type="text"
          placeholder="Department"
          className="border p-2 w-full"
          required
        />
        <input
          value={employeeDetails.salary}
          onChange={(e) => setEmployeeDetails((prev) => ({ ...prev, salary: e.target.value }))}
          type="number"
          placeholder="Salary"
          className="border p-2 w-full"
          required
        />
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          className="border p-2 w-full"
          required
        />
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded" />}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
