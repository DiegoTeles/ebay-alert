import { all } from "redux-saga/effects";
import { watchGetAlert } from "./alertEbay/saga";

export default function* rootSaga() {
	return yield all([watchGetAlert()]);
}
