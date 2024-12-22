import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/tasks',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/create',
        method: 'POST',
        body: newTask,
      }),
    }),
    getTask: builder.query({
      query: (taskId) => `/${taskId}`, 
    }),
    markTaskAsDone: builder.mutation({
      query: (taskId) => ({
        url: `/${taskId}/mark-done`,
        method: 'PUT',
      }),
    }),
    assignUsersToTask: builder.mutation({
      query: ({ taskId, users }) => ({
        url: '/assign-users',
        method: 'PUT',
        body: { taskId, users },
      }),
    }),

  }),
});

export const { useCreateTaskMutation, useGetTaskQuery, useMarkTaskAsDoneMutation, useAssignUsersToTaskMutation } = taskApi;