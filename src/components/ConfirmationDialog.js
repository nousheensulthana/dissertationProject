import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

class ConfirmationDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getSelectedTaskList = this.getSelectedTaskList.bind(this);
	}

	getSelectedTaskList() {
		let map = this.props.checkBoxMap;
		let taskNames = Object.keys(map);
		let filteredList = taskNames.filter((task) => {
			return map[task];
		});
		if (filteredList.length === 0) {
			return 'No tasks selected!';
		}
		return filteredList.map((task) => {
			return <li>{task}</li>;
		});
	}

	render() {
		return (
			<Modal
				show={this.props.show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header onClick={this.props.onHide} closeButton>
					<Modal.Title>Confirm subtask creation</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Are you sure you want to create the following subtasks:
					<Alert variant={'info'}>
						<ul>{this.getSelectedTaskList()}</ul>
					</Alert>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.onHide}>
						Cancel
					</Button>
					<Button variant="primary">Create</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default ConfirmationDialog;
