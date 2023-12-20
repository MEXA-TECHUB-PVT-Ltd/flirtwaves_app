import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Api_Url} from '../../constants/Api_Url';

// Define a service using a base URL and expected endpoints
export const authApis = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: Api_Url}),
  tagTypes: ['getUser', 'getCrushes', 'getFav', 'getCall', 'getFaq'],
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
          url: `user/reset_password`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getAllDashboardProfile: builder.query({
      query: body =>
        `user/getall_dashboard_profiles/userId=${body?.uid}?page=${body?.page}&limit=10`,
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
    deleteUser: builder.mutation({
      query: id => {
        return {
          url: `user/deleteuser_permanently/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getUserCrushes: builder.query({
      query: body =>
        `crush/getusercrushes/${body?.id}?page=${body?.page}&limit=10`,
      providesTags: ['getCrushes'],
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
      query: body => {
        return {
          url: `crush/remove_user_crush/${body?.id}`,
          method: 'DELETE',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser', 'getCrushes'],
    }),
    getFaqs: builder.query({
      query: page => `faqs/get_AllFAQs?page=${page}&limit=10`,
      providesTags: ['getFaq'],
    }),
    getFaqById: builder.query({
      query: id => `faqs/get_FAQ_ByID/${id}`,
      providesTags: ['getFaq'],
    }),
    addFeedBack: builder.mutation({
      query: body => {
        return {
          url: `feedback/addFeedback/${body?.uid}`,
          method: 'POST',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser'],
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
          url: `user/get_preferences_with_filters/${body?.id}?page=${body?.page}&limit=10`,
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
      invalidatesTags: ['getUser'],
    }),
    blockUser: builder.mutation({
      query: body => {
        return {
          url: `user/updateuser_status/${body?.uid}`,
          method: 'PUT',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getAllGenders: builder.query({
      query: page => `gender/getall_genders?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllRelations: builder.query({
      query: page => `relationship/getall_relations?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllCookings: builder.query({
      query: page => `cookingskill/getall_cookingskill?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllHabbits: builder.query({
      query: page => `hobbies/getall_hobbies?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllSmokings: builder.query({
      query: page => `smoking/getall_smokingopinions?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllKids: builder.query({
      query: page => `kids/getall_kidsopinions?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllNightLife: builder.query({
      query: page => `nightlife/getall_nightlifes?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllExcercises: builder.query({
      query: page => `exercises/getall_exercises?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    whichTwoWords: builder.query({
      query: page => `habits/getall_habits?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getAllUsers: builder.query({
      query: page => `user/get_all_users?page=${page}&limit=10`,
      providesTags: ['getUser'],
    }),
    addToFav: builder.mutation({
      query: body => {
        return {
          url: `favourites/add/user_id/${body.uid}`,
          method: 'POST',
          body: body.data,
        };
      },
      invalidatesTags: ['getUser', 'getFav'],
    }),
    updateOnlineStatus: builder.mutation({
      query: body => {
        return {
          url: `user/update_onlineuser_status/${body?.id}`,
          method: 'PUT',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    updateVerifyStatus: builder.mutation({
      query: body => {
        return {
          url: `updateuser_verificationstatus/${body?.id}`,
          method: 'PUT',
          body: body?.data,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    removeFav: builder.mutation({
      query: body => {
        return {
          url: `favourites/remove/user_id=${body?.id}/favorite_id=${body?.fav}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['getUser', 'getFav'],
    }),
    getFavofUser: builder.query({
      query: body =>
        `favourites/getFavoritesbyuserID/${body.id}?page=${body.page}&limit=10`,
      providesTags: ['getUser', 'getFav'],
    }),
    getVerifiedProfiles: builder.query({
      query: body =>
        `user/get_verified_users/userId=${body?.uid}?page=${body?.page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getNewUsers: builder.query({
      query: body =>
        `user/get_recent_profiles/userId=${body?.uid}?page=${body?.page}&limit=10`,
      providesTags: ['getUser'],
    }),
    getLikes: builder.query({
      query: body =>
        `favourites/get_received_favourite/user_id=${body?.uid}?page=${body?.page}&limit=10`,
      providesTags: ['getUser', 'getFav'],
    }),
    getOnlineUsers: builder.query({
      query: body =>
        `user/get_onlineusers/userId=${body?.uid}?page=${body?.page}&limit=10`,
      providesTags: ['getUser', 'getFav'],
    }),
    getUserofCooking: builder.mutation({
      query: body => {
        return {
          url: `cookingskill/get_usersof_cookingskill?page=${body?.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofRelation: builder.mutation({
      query: body => {
        return {
          url: `relationship/get_users_relation?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofNight: builder.mutation({
      query: body => {
        return {
          url: `nightlife/get_usersof_nightlifeopinion?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofExercise: builder.mutation({
      query: body => {
        return {
          url: `exercises/get_usersof_exercise?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofHabit: builder.mutation({
      query: body => {
        return {
          url: `habits/get_usersof_habit?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofHoby: builder.mutation({
      query: body => {
        return {
          url: `hobbies/get_users_ofhobby?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofSmoking: builder.mutation({
      query: body => {
        return {
          url: `smoking/get_usersof_smokingopinion?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getUserofKids: builder.mutation({
      query: body => {
        return {
          url: `kids/get_usersof_kidopinion?page=${body.page}&limit=10`,
          method: 'POST',
          body: body.data,
        };
      },
    }),
    getFavStatus: builder.mutation({
      query: body => {
        return {
          url: `favourites/get_favourite_status`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getFav'],
    }),
    makeCall: builder.mutation({
      query: body => {
        return {
          url: `calls/create_call`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser', 'getCall'],
    }),
    updateCallDuration: builder.mutation({
      query: body => {
        return {
          url: `calls/update_call_duration`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getCall'],
    }),
    updateCallStatus: builder.mutation({
      query: body => {
        return {
          url: `calls/update_call_status`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getCall'],
    }),
    getUserCalls: builder.query({
      query: body =>
        `/calls/get_user_callshistory/caller_id=${body?.uid}?page=${body.page}&limit=10`,
      providesTags: ['getCall'],
    }),
    getCallById: builder.mutation({
      query: body => {
        return {url: `calls/get_user_call_bycallID`, method: 'POST', body};
      },
      invalidatesTags: ['getCall'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,

  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
  useSerchUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetUserCrushesQuery,
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
  useGetAllDashboardProfileQuery,
  useAddToFavMutation,
  useUpdateOnlineStatusMutation,
  useUpdateVerifyStatusMutation,
  useRemoveFavMutation,
  useGetFavofUserQuery,
  useGetVerifiedProfilesQuery,
  useGetNewUsersQuery,
  useGetLikesQuery,
  useGetOnlineUsersQuery,
  useGetUserofCookingMutation,
  useGetUserofExerciseMutation,
  useGetUserofHabitMutation,
  useGetUserofHobyMutation,
  useGetUserofKidsMutation,
  useGetUserofNightMutation,
  useGetUserofRelationMutation,
  useGetUserofSmokingMutation,
  useGetFavStatusMutation,
  useGetUserCallsQuery,
  useUpdateCallDurationMutation,
  useMakeCallMutation,
  useUpdateCallStatusMutation,
  useGetCallByIdMutation,
} = authApis;
