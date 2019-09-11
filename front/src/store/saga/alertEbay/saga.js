import { call, put, takeLatest } from "redux-saga/effects";
import { alertSuccess, alertFailure } from "./action";
import * as service from "./services";

import { AlertTypes } from "./types";

export function* watchGetAlert() {
	yield takeLatest(AlertTypes.SYSTEM, getAlerts);
}

export function* getAlerts() {
	try {
		const response = yield call(service.getAlert);
		return yield put(alertSuccess(response));
	} catch (error) {
		return yield put(alertFailure(error.message));
	}
}
