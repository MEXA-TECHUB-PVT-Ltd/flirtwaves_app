import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Api_Url} from '../../constants/Api_Url';

// Define a service using a base URL and expected endpoints
export const authApis = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: Api_Url}),
  tagTypes: ['getUser', 'getCrushes'],
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
    getAllDashboardProfile: builder.mutation({
      query: body => {
        return {
          url: `user/getall_dashboard_profiles/${body?.id}`,
          method: 'POST',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser'],
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
    deleteUser: builder.mutation({
      query: id => {
        return {
          url: `user/deleteuser_permanently/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getUserCrushes: builder.mutation({
      query: (id, page) => {
        return {
          url: `crush/getusercrushes/${id}?page=${page}&limit=10`,
          method: 'GET',
        };
      },
    }),
    addCrush: builder.mutation({
      query: body => {
        return {
          url: `crush/add/${body?.uid}`,
          method: 'POST',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser', 'getCrushes'],
    }),
    removeCrush: builder.mutation({
      query: id => {
        return {
          url: `crush/remove_user_crush/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['getUser', 'getCrushes'],
    }),
    getFaqs: builder.query({
      query: page => `faqs/get_AllFAQs?page=${page}&limit=10`,
    }),
    getFaqById: builder.query({
      query: id => `faqs/get_FAQ_ByID/${id}`,
    }),
    addFeedBack: builder.mutation({
      query: body => {
        return {
          url: `feedback/addFeedback/${body?.uid}`,
          method: 'POST',
          body: body?.data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: body => {
        return {
          url: `user/update_password`,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    browseByPrefrence: builder.mutation({
      query: body => {
        return {
          url: `user/get_preferences_with_filters/${body?.id}`,
          method: 'POST',
          body: body?.data,
        };
      },
    }),
    reportUser: builder.mutation({
      query: body => {
        return {
          url: `report/report_user/${body?.uid}`,
          method: 'POST',
          body: body?.data,
        };
      },
    }),
    blockUser: builder.mutation({
      query: body => {
        return {
          url: `user/updateuser_status/${body?.uid}`,
          method: 'PUT',
          body: body?.data,
        };
      },
    }),
    getAllGenders: builder.query({
      query: page => `gender/getall_genders?page=${page}&limit=10`,
    }),
    getAllRelations: builder.query({
      query: page => `relationship/getall_relations?page=${page}&limit=10`,
    }),
    getAllCookings: builder.query({
      query: page => `cookingskill/getall_cookingskill?page=${page}&limit=10`,
    }),
    getAllHabbits: builder.query({
      query: page => `hobbies/getall_hobbies?page=${page}&limit=10`,
    }),
    getAllSmokings: builder.query({
      query: page => `smoking/getall_smokingopinions?page=${page}&limit=10`,
    }),
    getAllKids: builder.query({
      query: page => `kids/getall_kidsopinions?page=${page}&limit=10`,
    }),
    getAllNightLife: builder.query({
      query: page => `nightlife/getall_nightlifes?page=${page}&limit=10`,
    }),
    getAllExcercises: builder.query({
      query: page => `exercises/getall_exercises?page=${page}&limit=10`,
    }),
    whichTwoWords: builder.query({
      query: page => `habits/getall_habits?page=${page}&limit=10`,
    }),
    getAllUsers: builder.query({
      query: page => `user/get_all_users?page=${page}&limit=10`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useGetAllDashboardProfileMutation,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
  useSerchUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetUserCrushesMutation,
  useRemoveCrushMutation,
  useAddCrushMutation,
  useGetFaqByIdQuery,
  useGetFaqsQuery,
  useAddFeedBackMutation,
  useChangePasswordMutation,
  useBlockUserMutation,
  useBrowseByPrefrenceMutation,
  useReportUserMutation,
  useGetAllGendersQuery,
  useGetAllCookingsQuery,
  useGetAllExcercisesQuery,
  useGetAllHabbitsQuery,
  useGetAllKidsQuery,
  useGetAllNightLifeQuery,
  useGetAllRelationsQuery,
  useGetAllSmokingsQuery,
  useWhichTwoWordsQuery,
  useGetAllUsersQuery,
} = authApis;
