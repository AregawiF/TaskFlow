
const OwnerOverview = () => {
  return (
    <div>
        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-6">
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 shadow rounded-md">
              <h2 className="text-xl font-bold">Total Members</h2>
              <p className="text-3xl font-semibold mt-2">120</p>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
              <h2 className="text-xl font-bold">Revenue</h2>
              <p className="text-3xl font-semibold mt-2">$45,000</p>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
              <h2 className="text-xl font-bold">Pending Tasks</h2>
              <p className="text-3xl font-semibold mt-2">5</p>
            </div>
          </section>

          {/* Management Section */}
          <section className="bg-white p-6 shadow rounded-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Manage Members</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4">Name</th>
                  <th className="border-b py-2 px-4">Role</th>
                  <th className="border-b py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b py-2 px-4">John Doe</td>
                  <td className="border-b py-2 px-4">Admin</td>
                  <td className="border-b py-2 px-4">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline ml-4">Remove</button>
                  </td>
                </tr>
                <tr>
                  <td className="border-b py-2 px-4">Jane Smith</td>
                  <td className="border-b py-2 px-4">Member</td>
                  <td className="border-b py-2 px-4">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline ml-4">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Task Summary</h2>
            <p>Total Tasks: 10</p>
            <p>Completed Tasks: 7</p>
          </section>
        </main>
    </div>
  )
}

export default OwnerOverview