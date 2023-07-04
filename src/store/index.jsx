import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import userSliceReducer from "../features/user/userSlice";
import themeSliceReducer from "../features/theme/themeSlice";
import measureReducer from "../features/measure/measureSlice";
import areaReducer from "../features/area/areaSlice";
import brandReducer from "../features/brand/brandSlice";
import placeReducer from "../features/place/placeSlice";
import productReducer from "../features/product/productSlice";
import notaReducer from "../features/nota/notaSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    user: userSliceReducer,
    theme: themeSliceReducer,
    measure: measureReducer,
    area: areaReducer,
    brand: brandReducer,
    place: placeReducer,
    product: productReducer,
    nota: notaReducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
