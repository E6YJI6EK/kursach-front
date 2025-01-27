import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBaseSelector, registerSlice } from '@/lib/redux.ts';

type UserState = {
  userIdToShow: number | null;
  userShowed: boolean;
};

const initialState: UserState = {
  userIdToShow: null,
  userShowed: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    openUserInfo(state, action: PayloadAction<number>) {
      state.userShowed = true;
      state.userIdToShow = action.payload;
    },
    closeUserInfo(state) {
      state.userShowed = false;
      state.userIdToShow = null;
    },
  },
});

registerSlice([adminSlice]);

const userBaseSelector = createBaseSelector(adminSlice);

export const adminStore = {
  actions: { ...adminSlice.actions },
  selectors: {
    userInfo: createSelector(userBaseSelector, (state) => ({
      userId: state.userIdToShow,
      userShowed: state.userShowed,
    })),
  },
};
