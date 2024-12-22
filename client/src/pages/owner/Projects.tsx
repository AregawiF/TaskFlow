
const Projects = () => {
  return (
    <div>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Projects Overview</h2>
        <ul>
          <li className="flex justify-between py-2 border-b">
            <span>Project A</span>
            <span>Progress: 75%</span>
          </li>
          <li className="flex justify-between py-2 border-b">
            <span>Project B</span>
            <span>Progress: 50%</span>
          </li>
        </ul>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Create New Project</button>
      </section>
    </div>
  )
}

export default Projects