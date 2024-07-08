import { api } from "./api";

const waitlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    joinWaitlist: builder.mutation({
      query: (data) => ({
        url: "/wait-list/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useJoinWaitlistMutation } = waitlistApi;

// getBeneficiaries: builder.query({
//     query: () => ({
//       url: "/beneficiaries/list",
//       method: "GET",
//     }),
//   }),
