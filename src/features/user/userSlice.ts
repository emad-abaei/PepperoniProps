import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { UserStateType } from "../../types";

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function (_, { rejectWithValue }) {
    try {
      // 1) Get user's geolocation
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Reverse geocoding
      const addressObj = await getAddress(position);

      if (!addressObj)
        throw new Error("Failed to retrieve address from geocoding API.");

      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // 3) Return data (payload of FULFILLED state)
      return { position, address };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Unknown error occurred. Please make sure to enter your address manually.",
      );
    }
  },
);

const initialState: UserStateType = {
  username: "",
  status: "idle",
  position: null,
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";

        state.error =
          (action.payload as string) ||
          "Something went wrong. Make sure to fill this field please.";
      }),
});

export default userSlice.reducer;
export const { updateName } = userSlice.actions;
