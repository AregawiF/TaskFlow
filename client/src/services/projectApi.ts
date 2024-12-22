import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/projects',
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      if (token) {
        // Attach the token to the Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/', // This will send a GET request to the base URL
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
