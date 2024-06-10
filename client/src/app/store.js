import { configureStore } from '@reduxjs/toolkit';
import Authreducer from '../reducers/Authreducer'
export const store = configureStore({
  reducer: {
    user: Authreducer,
  },
});
