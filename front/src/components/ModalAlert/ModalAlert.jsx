import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useUpdateAlert } from "../../hooks/useAlert";
import { alert as systemAlert } from "../../store/saga/alertEbay/action";

const ModalAlert = (React.FC = props => {
	const propsData = props.data;
	const dispatch = useDispatch();

	const [data, setData] = useState({ email: "", frequency: "", term: "" });
	const [, callEditAlert] = useUpdateAlert();

	const handleChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		await callEditAlert({ propsData, data });
		dispatch(systemAlert());
		props.onHide()
	};

	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Edit Alert</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='input-container'>
					<form action='submit' onSubmit={handleSubmit}>
						<label>
							E-mail
							<input
								className='input-container_in'
								name='email'
								defaultValue={props.data.email}
								onChange={event => {
									handleChange(event);
								}}
							/>
						</label>

						<label>
							Frequency
							<select
								className='input-container_in'
								name='frequency'
								defaultValue={props.data.frequency}
								onChange={event => {
									handleChange(event);
								}}>
								<option value={2}>2 Min</option>
								<option value={5}>5 Min</option>
								<option value={30}>30 Min</option>
							</select>
						</label>
						<label>
							Search Term
							<input
								className='input-container_in'
								name='term'
								defaultValue={props.data.term}
								onChange={event => {
									handleChange(event);
								}}
							/>
						</label>
						<Button className='btn-confirm' value='Enviar' onClick={handleSubmit}>
							Save
						</Button>
					</form>
				</div>
			</Modal.Body>
		</Modal>
	);
});

export default ModalAlert;
