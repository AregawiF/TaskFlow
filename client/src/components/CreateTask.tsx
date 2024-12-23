// @ts-nocheck
import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../services/taskApi";

const CreateTask: React.FC<{ projectId: string; refetch: () => void }> = ({ projectId, refetch }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [createTask, { isLoading, isError, isSuccess }] = useCreateTaskMutation();

  const onSubmit = async (data: any) => {
    try {
      await createTask({ ...data, projectId }).unwrap(); // Call the mutation with projectId
      console.log("Task created successfully:", data);
      reset(); // Reset form fields after successful submission
      refetch(); // Refetch the project tasks
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      {isError && <p className="text-red-500 mb-4">Failed to create task.</p>}
      {isSuccess && <p className="text-green-500 mb-4">Task created successfully!</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
          {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="deadline">
            Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="deadline"
            {...register("deadline", { required: "Deadline is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.deadline && <p className="text-red-500">{String(errors.deadline.message)}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="priority">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            id="priority"
            {...register("priority", { required: "Priority is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && <p className="text-red-500">{String(errors.priority.message)}</p>}
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;