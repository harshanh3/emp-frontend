import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allempdetailsAPI, empRemoveAPI } from '../services/allAPI';
import SERVER_URL from '../services/serverUrl';
import { tokenAuthContext } from '../contexts/AuthContextAPI';

const Dashboard = () => {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const [editEmployee, setEditEmployee] = useState(null);


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


  const deleteemployee = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };

      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (!confirmDelete) return;

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
    setIsAuthorised(false)
    navigate("/");
  };

  const addEmployee = () => {
    navigate("/employeeform");
  };

  const sortedEmployees = [...alldetails].sort((a, b) => {
    const aMatches = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const bMatches = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    return aMatches && !bMatches ? -1 : !aMatches && bMatches ? 1 : 0;
  });

  return (
    <div className="p-4 md:p-6"> {/* Add responsive padding */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">Employee Dashboard</h1> {/* Responsive font size */}
        <div>
          <button onClick={addEmployee} className="bg-green-500 text-white px-3 py-2 md:px-4 md:py-2 rounded mr-2">Add Employee</button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 md:px-4 md:py-2 rounded">Logout</button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="overflow-x-auto"> {/* Horizontal scroll for small screens */}
        <table className="w-full min-w-max border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-sm md:text-base">Name</th> {/* Responsive font size */}
              <th className="border p-2 text-sm md:text-base">ID</th>
              <th className="border p-2 text-sm md:text-base">Position</th>
              <th className="border p-2 text-sm md:text-base">Department</th>
              <th className="border p-2 text-sm md:text-base">Salary</th>
              <th className="border p-2 text-sm md:text-base">Image</th>
              <th className="border p-2 text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((emp) => (
                <tr key={emp.id} className="text-center border">
                  <td className="border p-2 text-sm md:text-base">{emp.name}</td>
                  <td className="border p-2 text-sm md:text-base">{emp.id}</td>
                  <td className="border p-2 text-sm md:text-base">{emp.postion}</td>
                  <td className="border p-2 text-sm md:text-base">{emp.department}</td>
                  <td className="border p-2 text-sm md:text-base">${emp.salary}</td>
                  <td className="border p-2">
                    <img
                      src={`${SERVER_URL}/uploads/${emp.empImg}`}
                      alt={emp.name}
                      className="h-10 w-10 md:h-12 md:w-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border p-2">
                    <button onClick={() => navigate(`/edit-employee/${emp._id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-base">Edit</button>
                    <button onClick={() => deleteemployee(emp?._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2 text-xs md:text-base">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-sm md:text-base">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

