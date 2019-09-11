import { useEffect, useState } from "react";
import {
	getAlert,
	getAlertById,
	updateAlert,
	postAlert,
	deleteAlert,
} from "../store/saga/alertEbay/services";

const initialAlert = {
	data: [],
	isLoading: true,
	error: "",
};

const useAlert = () => {
	const [data, setData] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const callFetchAlertList = async () => {
		const setHookState = (_data, _hasError, _isLoading) => {
			setData(_data);
			setHasError(_hasError);
			setIsLoading(_isLoading);
		};

		try {
			setHookState({ ...data }, false, true);
			const alertList = await getAlert();
			setHookState(alertList, false, false);
		} catch (err) {
			setHookState({ alerts: [] }, true, false);
		}
	};

	return [{ data, hasError, isLoading }, callFetchAlertList];
};

const useGetAlert = data => {
	const [hook, setHook] = useState(initialAlert);

	useEffect(() => {
		(async () => {
			try {
				setHook({ data: [], isLoading: true, error: "" });

				const response = await getAlertById();
				setHook({ data: response, isLoading: false, error: "" });
			} catch (err) {
				return setHook({ data: [], isLoading: false, error: err });
			}
		})();
	}, [data]);
	return hook;
};

const useCreateAlert = () => {
	const [data, setData] = useState({});
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);

	const callCreateAlert = async data => {
		const setHookState = (_data, _hasError, _isLoading) => {
			setData(_data);
			setHasError(_hasError);
			setLoading(_isLoading);
		};
		try {
			setHookState({}, false, true);
			await postAlert(data);
			setHookState({}, false, false);
		} catch (err) {
			setHookState({}, true, false);
		}
	};

	return [{ data, hasError, loading }, callCreateAlert];
};

const useUpdateAlert = () => {
	const [data, setData] = useState({});
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const callEditAlert = async data => {
		const setHookState = (_data, _hasError, _isLoading) => {
			setData(_data);
			setHasError(_hasError);
			setLoading(_isLoading);
		};

		try {
			setHookState({}, false, true);
			await updateAlert(data);
			setHookState({}, false, false);
		} catch (err) {
			setHookState({}, true, false);
		}
	};
	return [{ data, hasError, loading }, callEditAlert];
};

const useDeleteAlert = () => {
	const [data, setData] = useState({});
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);

	const callDeleteAlert = async data => {
		const setHookState = (_data, _hasError, _isLoading) => {
			setData(_data);
			setHasError(_hasError);
			setLoading(_isLoading);
		};

		try {
			setHookState({}, false, true);
			await deleteAlert(data.id);
			setHookState({}, false, false);
		} catch (err) {
			setHookState({}, true, false);
		}
	};
	return [{ data, hasError, loading }, callDeleteAlert];
};

export { useAlert, useGetAlert, useUpdateAlert, useCreateAlert, useDeleteAlert };
