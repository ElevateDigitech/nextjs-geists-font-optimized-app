import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getEvents: builder.query<any, void>({
      query: () => 'events',
    }),
    getEventById: builder.query<any, string>({
      query: (id: string) => `events/${id}`,
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<any, { username: string; email: string; password: string }>({
      query: (user) => ({
        url: 'auth/signup',
        method: 'POST',
        body: user,
      }),
    }),
    getBookings: builder.query<any, string>({
      query: (userId: string) => `bookings/user/${userId}`,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventByIdQuery, useLoginMutation, useSignupMutation, useGetBookingsQuery } = api;
