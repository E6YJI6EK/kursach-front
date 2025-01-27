import { type Slice, combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { apiSlice } from './api';

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware);
  },
  devTools: true,
});

export const useAppSelector = useSelector;
export const useAppDispatch = (): typeof store.dispatch => {
  return useDispatch();
};

export const createBaseSelector = <S, N extends string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice: Slice<S, any, N>,
) => {
  return (store: unknown) => {
    const anyStore = store as Record<string, string>;
    return anyStore[slice.name] as S;
  };
};

const slicesSet = new Set<Slice>();

export const registerSlice = (slices: Slice[]) => {
  slices.forEach((slice) => {
    slicesSet.add(slice);
  });

  const reducerObject = Array.from(slicesSet).reduce(
    (acc, slice) => ({
      ...acc,
      [slice.name]: slice.reducer,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as Record<string, any>,
  );
  store.replaceReducer(
    combineReducers({
      [apiSlice.reducerPath]: apiSlice.reducer,
      ...reducerObject,
    }),
  );
};
