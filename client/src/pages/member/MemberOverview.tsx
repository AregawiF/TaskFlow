
const MemberOverview = () => {
  return (
    <div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 shadow rounded-md">
              <h2 className="text-xl font-bold">Personal Progress</h2>
              <p className="text-3xl font-semibold mt-2">Tasks Completed: 8</p>
              <p className="text-lg mt-2">Points Earned: 80</p>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
              <h2 className="text-xl font-bold">Notifications</h2>
              <ul className="mt-2">
                <li className="border-b py-2">New task assigned: Project A</li>
                <li className="border-b py-2">Meeting scheduled for Monday</li>
              </ul>
            </div>
          </section>

          {/* Upcoming Tasks Section */}
          <section className="bg-white p-6 shadow rounded-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
            <ul>
              <li className="flex justify-between py-2 border-b">
                <span>Task 1: Complete project report</span>
                <span>Due: 2024-12-25</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span>Task 2: Prepare for presentation</span>
                <span>Due: 2024-12-27</span>
              </li>
            </ul>
          </section>

          {/* Resources Section */}
          <section className="bg-white p-6 shadow rounded-md">
            <h2 className="text-2xl font-bold mb-4">Resources</h2>
            <ul>
              <li>
                <a href="#" className="text-blue-600 hover:underline">User Guide</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Helpful Tools</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
              </li>
            </ul>
          </section>
    </div>
  )
}

export default MemberOverview