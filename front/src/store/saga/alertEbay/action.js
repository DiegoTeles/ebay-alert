import { AlertTypes } from "./types";

export const alert = () => ({
  type: AlertTypes.SYSTEM,
});
export const alertSuccess = (payload) => ({
  type: AlertTypes.SYSTEM_SUCCESS,
  payload
});
export const alertFailure = (payload) => ({
  type: AlertTypes.SYSTEM_FAILURE,
  payload
});
