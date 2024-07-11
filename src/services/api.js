import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.foodsbymomi.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["auth", "user", "send", "receive"],
  endpoints: () => ({}),
});

//   const token = getState().magicAuth.token;
//   if (token) {
//     headers.set("Authorization", `Bearer ${token}`);
//   }
