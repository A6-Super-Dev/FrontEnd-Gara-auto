import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ClientInfoAttributes, WishList } from '../../types/auth';

export interface ClientDetailAttributes extends ClientInfoAttributes {
  id: number;
  userId: number;
}

const initialState: ClientDetailAttributes = {
  id: 0,
  userId: 0,
  firstName: '',
  lastName: '',
  gender: '',
  phoneNumber: '',
  dob: '',
  addressCountry: '',
  addressProvince: '',
  addressDistrict: '',
  addressWard: '',
  addressDetail: '',
  timezone: '',
  stripeCustomerId: '',
  avatar: '',
  coupons: [],
  wishlist: [],
};

export const UserSlice = createSlice({
  name: 'clientInfo',
  initialState,
  reducers: {
    setClientRelatedInfo: (state: ClientDetailAttributes, action: PayloadAction<ClientInfoAttributes>) => {
      return { ...state, ...action.payload };
    },
    setKeyInfo: (state: ClientDetailAttributes, action: PayloadAction<{ id: number; userId: number }>) => {
      const { id, userId } = action.payload;
      return { ...state, id, userId };
    },
    setWishList: (state: ClientDetailAttributes, action: PayloadAction<WishList[]>) => {
      state.wishlist = action.payload;
    },
    resetEmpty: (state: ClientDetailAttributes) => {
      state.wishlist = [];
    },
    adjustList: (state: ClientDetailAttributes, action: PayloadAction<WishList>) => {
      const { wishlist } = state;
      const index = wishlist.findIndex((each) => action.payload.carId === each.carId);
      if (index !== -1) {
        wishlist.splice(index, 1);
      } else {
        wishlist.push(action.payload);
      }
    },
  },
});

export const { setClientRelatedInfo, setKeyInfo, setWishList, resetEmpty, adjustList } = UserSlice.actions;

export default UserSlice.reducer;
