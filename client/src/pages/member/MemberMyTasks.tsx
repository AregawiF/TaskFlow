// @ts-nocheck
import { jwtDecode } from 'jwt-decode';
import { useGetUserTasksQuery } from '../../services/taskApi'; 
import { TaskType } from '../../types/task';
import MemberTask from '../../components/MemberTask';

const MemberMyTasks = () => {
    const token = localStorage.getItem('token');
    let userId;

  // Decode the token to get userId
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.payload.userId; 
  }

  // Ensure userId is defined before fetching tasks
  const { data: tasks, error, isLoading } = useGetUserTasksQuery(userId);

  if (token) {
    const decodedToken:any = jwtDecode(token);
    userId = decodedToken.payload.userId; 
  }
    if (isLoading) return <div>Loading tasks...</div>;
    if (error) {
    console.error('Error fetching tasks:', error);
    return <div>Error fetching tasks: {error?.data?.message || 'Unknown error'}</div>;
    }


  console.log('Tasks: ', tasks);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <div className="space-y-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task:TaskType) => (
            <MemberTask key={task._id} taskId={task._id} /> 
          ))
        ) : (
          <div>No tasks available.</div>
        )}
      </div>
    </div>
  );
};

export default MemberMyTasks;