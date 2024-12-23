import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/users/profile',
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
    getprofile: builder.query({
      query: () => '/', 
    }),

    deleteprofile: builder.mutation({
        query: () => ({
            url: '/',
            method: 'DELETE',
        })
    })


  }),
});

export const { useGetprofileQuery, useDeleteprofileMutation } = profileApi;
