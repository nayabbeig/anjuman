// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import path from "../features/router/paths";
import axiosBaseQuery from "./customApi";

export const votersApi = createApi({
  reducerPath: "voter",
  baseQuery: axiosBaseQuery({
    baseUrl: path.api.voters.root,
  }),
  endpoints(builder) {
    return {
      getVoters: builder.query({
        query: ({ page = 1, pageSize = 25 } = {}) => ({
          url: `?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
          method: "get",
        }),
      }),
      createVoter: builder.mutation({
        query: (data) => {
          return { url: "/", method: "post", data };
        },
      }),
      updateVoter: builder.mutation({
        query: (data) => {
          return { url: `/${data.id}`, method: "put", data };
        },
      }),
      deleteVoter: builder.mutation({
        query: (data) => {
          return { url: `/${data.id}`, method: "delete" };
        },
      }),
    };
  },
});

export const {
  useGetVotersQuery,
  useCreateVoterMutation,
  useUpdateVoterMutation,
  useDeleteVoterMutation,
} = votersApi;
