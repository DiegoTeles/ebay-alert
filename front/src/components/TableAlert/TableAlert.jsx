import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Table, ButtonToolbar, Button } from "react-bootstrap/";

import ModalAlert from "../ModalAlert";
import ModalAlertDelete from "../ModalAlertDelete";
import { alert as systemAlert } from "../../store/saga/alertEbay/action";
import { useCreateAlert } from "../../hooks/useAlert";

const TableAlert = (React.FC = props => {
	const dispatch = useDispatch();
	const [alert, setAlert] = useState({ email: "", frequency: 2, term: "" });
	const [modalShow, setModalShow] = useState(false);
	const [modalShowDelete, setModalShowDelete] = useState(false);
	const [, callCreateAlert] = useCreateAlert();
	const [itemDelete, setItemDelete] = useState({ email: "", frequency: 0, term: "" });
	const [itemUpdate, setItemUpdate] = useState({ email: "", frequency: 0, term: "" });

	const { saga } = useSelector(state => state);

	useEffect(() => {
		dispatch(systemAlert());
	}, []);

	const handleChange = event => {
		const { name, value } = event.target;
		setAlert({ ...alert, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		await callCreateAlert({
			email: alert.email,
			frequency: alert.frequency,
			term: alert.term,
		});
		dispatch(systemAlert());
		setAlert({ ...alert, email: "", term: "" });
	};

	const handleDelete = item => {
		setItemDelete(item);
		setModalShowDelete(true);
	};

	const handleUpdate = item => {
		setItemUpdate(item);
		setModalShow(true);
	};

	return (
		<>
			<div className='input-container'>
				<form action='submit'>
					<label className='input-container_label'>
						E-mail
						<input
							className='input-container_in'
							name='email'
							onChange={event => {
								handleChange(event);
							}}
							value={alert.email}
						/>
					</label>

					<label className='input-container_label'>
						Frequency
						<select
							className='input-container_in'
							name='frequency'
							onChange={event => {
								handleChange(event);
							}}>
							<option value='' selected>
								Selecione
							</option>
							<option value={2}>2 Min</option>
							<option value={5}>5 Min</option>
							<option value={30}>30 Min</option>
						</select>
					</label>
					<label className='input-container_label'>
						Search Term
						<input
							className='input-container_in'
							name='term'
							onChange={event => {
								handleChange(event);
							}}
							value={alert.term}
						/>
					</label>
					<button
						className='input-container_btn'
						type='submit'
						value='Enviar'
						onClick={handleSubmit}>
						Save
					</button>
				</form>
			</div>
			<div className='alert-table'>
				<h1 className='alert-table_title'> Your Alerts </h1>
				{saga.data.length > 0 && (
					<Table className='alert-table_tb' striped bordered hover responsive variant='dark'>
						<thead>
							<tr>
								<th>E-mail</th>
								<th>Frequency</th>
								<th>Search Term</th>
								<th>Created at</th>
								<th colSpan='2'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{saga.data.length &&
								saga.data.map(item => {
									return (
										<tr key={item._id}>
											<td>{item.email}</td>
											<td>{item.frequency} min</td>
											<td>{item.term}</td>
											<td>{moment(item.createdAt).format("DD / MM / YYYY")}</td>
											<td>
												<ButtonToolbar>
													<Button className='btn-edit' onClick={() => handleUpdate(item)}>
														Edit
													</Button>

													<ModalAlert
														data={itemUpdate}
														show={modalShow}
														onHide={() => setModalShow(false)}
													/>
												</ButtonToolbar>
											</td>
											<td>
												<ButtonToolbar>
													<Button className='btn-delete' onClick={() => handleDelete(item)}>
														Delete
													</Button>

													<ModalAlertDelete
														item={itemDelete}
														show={modalShowDelete}
														onHide={() => setModalShowDelete(false)}
													/>
												</ButtonToolbar>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				)} 
				{ saga.data.length === 0 && <h1 className="alert-table_not"> No items registered, register items above ...</h1>}
			</div>
		</>
	);
});

export default TableAlert;
