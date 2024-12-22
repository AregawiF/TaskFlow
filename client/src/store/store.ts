import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../services/authApi';
import { projectsApi } from '../services/projectApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
