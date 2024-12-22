import React from "react";
import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "../services/projectApi";

const CreateProject: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [createProject, { isLoading, isError, isSuccess }] = useCreateProjectMutation();

  const onSubmit = async (data: any) => {
    try {
        console.log(data);
      await createProject(data).unwrap(); // Call the mutation
      console.log("Project created successfully:", data);
      reset(); // Reset form fields after successful submission
      refetch(); // Refetch the projects
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      {isError && <p className="text-red-500 mb-4">Failed to create project.</p>}
      {isSuccess && <p className="text-green-500 mb-4">Project created successfully!</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6">
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
          {errors.title?.message && <p className="text-red-500">{String(errors.title.message)}</p>}
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
            type="date"
            id="deadline"
            {...register("deadline", { required: "Deadline is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.deadline && <p className="text-red-500">{String(errors.deadline.message)}</p>}
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;