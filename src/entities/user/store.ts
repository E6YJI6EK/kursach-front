import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBaseSelector, registerSlice } from '@/lib/redux.ts';
import { User } from '@/entities/user/types.ts';

type UserState = {
  userData: User| null
  accessToken: string | null;
};

const initialState: UserState = {
  accessToken: null,
  userData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    resetUserState(state) {
      state.accessToken = null;
      state.userData = null;
    },
    setUserData(state, action:PayloadAction<User>) {
      state.userData = action.payload;
    }
  },
});

registerSlice([userSlice]);

const userBaseSelector = createBaseSelector(userSlice);

export const userStore = {
  actions: { ...userSlice.actions },
  selectors: {
    accessToken: createSelector(userBaseSelector, (state) => state.accessToken),
    userData: createSelector(userBaseSelector, (state) => state.userData),
  },
};
