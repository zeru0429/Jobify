import { configureStore } from "@reduxjs/toolkit";
import { publicApi } from "../services/public_service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/user_service";
import { companyApi } from "../services/company_service";
import { jobApi } from "../services/job_service";
import { applicantApi } from "../services/applicants_service";

export const store = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [applicantApi.reducerPath]: applicantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(publicApi.middleware)
      .concat(userApi.middleware)
      .concat(companyApi.middleware)
      .concat(jobApi.middleware)
      .concat(applicantApi.middleware),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
