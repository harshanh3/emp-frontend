import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { allempdetailsAPI, empRemoveAPI } from '../services/allAPI';
import SERVER_URL from '../services/serverUrl';

const Dashboard = () => {
  const [alldetails, setAlldetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate(); 
  
  
  useEffect(() => {
    getAlldetails();
  }, []);

  const getAlldetails = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await allempdetailsAPI(reqHeader);
        if (result.status === 200) {
          setAlldetails(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Delete 
  const deleteemployee = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        await empRemoveAPI(id, reqHeader);
        getAlldetails();
      } catch (err) {
        console.log(err);
      }
    }
  };


  const handleLogout = () => {
    sessionStorage.removeItem("token"); 
    navigate("/"); 
  };

  const addEmployee = () => {
    navigate("/employeeform");
  };

  //
  const sortedEmployees = [...alldetails].sort((a, b) => {
    const aMatches = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const bMatches = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    return aMatches && !bMatches ? -1 : !aMatches && bMatches ? 1 : 0;
  });


  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <div>
            <button onClick={addEmployee} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Add Employee</button>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 mb-4 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">ID</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((emp) => (
                <tr key={emp.id} className="text-center border">
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.id}</td>
                  <td className="border p-2">{emp.postion}</td>
                  <td className="border p-2">{emp.department}</td>
                  <td className="border p-2">${emp.salary}</td>
                  <td className="border p-2">
                    <img
                      src={`${SERVER_URL}/uploads/${emp.empImg}`}
                      alt={emp.name}
                      className="h-12 w-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border p-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <button
                      onClick={() => deleteemployee(emp?._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
