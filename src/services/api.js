import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.foodsbymomi.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      //   const token = getState().magicAuth.token;
      //   if (token) {
      //     headers.set("Authorization", `Bearer ${token}`);
      //   }
      return headers;
    },
  }),
  tagTypes: ["auth", "user", "send", "receive"],
  endpoints: () => ({}),
});
