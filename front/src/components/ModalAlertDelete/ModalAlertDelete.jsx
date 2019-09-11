import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useDeleteAlert } from "../../hooks/useAlert";
import { alert as systemAlert } from "../../store/saga/alertEbay/action";

const ModalAlertDelete = (React.FC = props => {
	const { item } = props;
	const dispatch = useDispatch();
	const [, callDeleteAlert] = useDeleteAlert();

	const handleSubmit = async event => {
		event.preventDefault();
		await callDeleteAlert({ id: item._id });
		dispatch(systemAlert());
		props.onHide();
	};

	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Edit Alert</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<p> Deseja realmente excluir o <b>{item.term}</b>?</p>
				</div>
				<Button className="btn-edit" type='submit' value='Enviar' onClick={props.onHide}>
					Cancelar
				</Button>
				<Button className="btn-delete" type='submit' value='Enviar' onClick={event => handleSubmit(event, props.onHide)}>
					Confirmar
				</Button>
			</Modal.Body>
		</Modal>
	);
});

export default ModalAlertDelete;
