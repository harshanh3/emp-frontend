import React from 'react'

const Empdashboard = () => {
  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full"
     
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          
          
               {/* <tr key={emp._id} className="text-center"> */}
                <td>name</td>
                <td className="border p-2">dep</td>
                <td className="border p-2">post</td>
                <td className="border p-2">$</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                    Delete
                  </button>
                </td>
            {/* //   </tr> */}
          
        </tbody>
      </table>
    </div>
    
    </>
  )
}

export default Empdashboard