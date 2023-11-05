import { configureStore } from '@reduxjs/toolkit';
// ...
import cityReducer from './slices/city-slice';
import provinceReducer from './slices/province-slice';

export const store = configureStore({
  reducer: {
    cities: cityReducer,
    provinces: provinceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
