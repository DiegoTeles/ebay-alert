import { AlertTypes } from "./types";

const INITIAL_SYSTEM = {
	data: [],
	error: "",
	loading: true,
};

const reducer = (state = INITIAL_SYSTEM, action) => {
	switch (action.type) {
		case AlertTypes.SYSTEM:
			return {
				...state,
			};
		case AlertTypes.SYSTEM_SUCCESS:
			return {
				...state,
				data: action.payload || undefined,
				loading: false,
			};
		case AlertTypes.SYSTEM_FAILURE:
			return {
				...state,
				data: INITIAL_SYSTEM,
				error: action.payload,
			};
		case AlertTypes.CLEAR_STATUS:
			return {
				...state,
				updated: false,
				error: "",
			};
		default:
			return state;
	}
};

export default reducer;
