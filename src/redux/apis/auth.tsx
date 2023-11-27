import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Api_Url} from '../../constants/Api_Url';

// Define a service using a base URL and expected endpoints
export const authApis = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: Api_Url}),
  tagTypes: ['getUser'],
  endpoints: builder => ({
    postUser: builder.mutation({
      query: body => {
        return {
          url: `user/user_signup`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    loginUser: builder.mutation({
      query: body => {
        return {
          url: `user/user_signin`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    forgetPassword: builder.mutation({
      query: body => {
        return {
          url: `user/forget_password`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    updatePassword: builder.mutation({
      query: body => {
        return {
          url: `user/update_password`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getAllDashboardProfile: builder.query({
      query: body => {
        return {
          url: `user/getall_dashboard_profiles?page=${body?.page}&limit=${body?.limit}`,
          method: 'GET',
        };
      },
      providesTags: ['getUser'],
    }),
    updateUserProfile: builder.mutation({
      query: body => {
        return {
          url: `user/update_userprofile/${body?.id}`,
          method: 'PUT',
          body: body.data,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    serchUser: builder.mutation({
      query: body => {
        return {
          url: `user/searchuser_byname`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getUserById: builder.query({
      query: id => `user/get_user_by_ID/${id}`,
      providesTags: ['getUser'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useGetAllDashboardProfileQuery,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
  useSerchUserMutation,
  useGetUserByIdQuery,
} = authApis;
