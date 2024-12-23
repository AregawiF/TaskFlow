import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/notification',
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

    // Get notifications for a user
    getUserNotifications: builder.query({
      query: (userId) => `/${userId}`,
    }),

    // Mark a notification as read
    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/${id}/read`,
        method: 'PUT',
      }),
    }),

    createNotification: builder.mutation({
      query: (notification) => ({
        url: '/',
        method: 'POST',
        body: notification,
      }),
    }),

    // Delete a notification
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),





  }),
});

export const { 
    useGetUserNotificationsQuery, 
    useCreateNotificationMutation, 
    useMarkNotificationAsReadMutation, 
    useDeleteNotificationMutation  
} = notificationApi;
