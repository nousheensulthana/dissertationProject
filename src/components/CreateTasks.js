import React, { Component } from 'react';
import { getTaskList, postSubtaskCreate } from '../../services/services';
import {
	Button,
	Form,
	Card,
	Container,
	Row,
	Col,
	Spinner,
	Alert,
} from 'react-bootstrap';
import LoadingSpinner from '../utility/LoadingSpinner';

class TaskCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			checkBoxMap: {},
			userStoryID: '',
			pretext: '',
			showConfirmation: false,
			creating: false,
			isError: false,
		};
		this.getSubTaskList = this.getSubTaskList.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleStoryIDChange = this.handleStoryIDChange.bind(this);
		this.handlePretextChange = this.handlePretextChange.bind(this);
		this.showConfirmation = this.showConfirmation.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);
	}

	componentDidMount() {
		this.getSubTaskList();
	}

	handleCheckboxChange(event) {
		let { checkBoxMap } = this.state;
		let checkedValue = event.target.checked;
		const id = event.target.id;
		if (id === 'all') {
			Object.keys(checkBoxMap).forEach((box) => {
				checkBoxMap[box] = checkedValue;
			});
		} else {
			checkBoxMap[id] = checkedValue;
		}

		this.setState({
			checkBoxMap: checkBoxMap,
		});
	}

	handleStoryIDChange(event) {
		let value = event.target.value;

		this.setState({
			userStoryID: value,
			showConfirmation: false,
		});
	}

	handlePretextChange(event) {
		let value = event.target.value;

		this.setState({
			pretext: value,
		});
	}

	getSubTaskList() {
		getTaskList().then((response) => {
			let list = response.data;
			let checkboxMap = list.reduce((map, task) => {
				map[task] = false;
				return map;
			}, {});
			checkboxMap['all'] = false;
			this.setState(
				{
					taskList: list,
					checkBoxMap: checkboxMap,
				},
				this.props.setLoadingContent(false)
			);
		});
	}

	getTasks() {
		return this.state.taskList.map((task) => {
			return (
				<Form.Check
					id={task}
					key={task}
					label={task}
					type="checkbox"
					onChange={this.handleCheckboxChange}
					checked={this.state.checkBoxMap[task]}
					className="noWrap"
				/>
			);
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.confirmSubmit();
	}

	confirmSubmit() {
		let { checkBoxMap, userStoryID, pretext } = this.state;

		let selectedTasks = Object.keys(checkBoxMap).reduce((selected, task) => {
			if (task !== 'all' && checkBoxMap[task]) {
				selected.push(task);
			}
			return selected;
		}, []);

		let postObject = {
			userStoryID: userStoryID,
			selectedTasks: selectedTasks,
			pretext: pretext,
		};
		this.setState(
			{
				creating: true,
				showConfirmation: false,
				isError: false,
			},
			() => {
				postSubtaskCreate(postObject)
					.then((response) => {
						let isError = false;
						if (response.status !== 201) {
							isError = true;
						}
						this.setState({
							creating: false,
							isError: isError,
							showConfirmation: true,
						});
					})
					.catch((err) => {
						console.log(err);
						this.setState({
							creating: false,
							isError: true,
							showConfirmation: true,
						});
					});
			}
		);
	}

	showConfirmation(value) {
		this.setState({
			showConfirmation: value,
		});
	}

	getCreationSpinner() {
		return (
			<>
				<Spinner
					as="span"
					animation="grow"
					size="sm"
					role="status"
					aria-hidden="true"
					style={{ marginRight: '0.2rem' }}
				/>
				Creating...
			</>
		);
	}

	getSuccessAlert() {
		let { userStoryID } = this.state;
		return (
			<Alert
				variant="success"
				onClose={() => this.showConfirmation(false)}
				dismissible
			>
				<Alert.Heading>Tasks created successfully!</Alert.Heading>
				<p>Click the link below to view the created sub tasks on JIRA:</p>
				<hr />
				<p className="mb-0">
					<Alert.Link
						target="_blank"
						rel="noopener noreferrer"
						href={'https://sapjira.wdf.sap.corp/browse/' + userStoryID}
					>
						Open {userStoryID} on JIRA
					</Alert.Link>
				</p>
			</Alert>
		);
	}

	getErrorAlert() {
		return (
			<Alert
				variant="danger"
				onClose={() => this.showConfirmation(false)}
				dismissible
			>
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>
					Please check the User Story ID you have entered and make sure you have
					selected atleast one task to be created.
				</p>
			</Alert>
		);
	}

	handleConfirmation() {
		let { showConfirmation, creating, isError } = this.state;
		if (showConfirmation && !creating) {
			if (isError) {
				return this.getErrorAlert();
			} else {
				return this.getSuccessAlert();
			}
		}
	}

	render() {
		let { creating, taskList } = this.state;

		if (!taskList || !Array.isArray(taskList) || taskList.length === 0) {
			return <LoadingSpinner />;
		}
		return (
			<Container className="d-flex justify-content-center">
				<Card
					style={{ width: 'fit-content' }}
					className="d-flex justify-content-center"
				>
					<Card.Header as="h4">Automated JIRA Task Creation</Card.Header>
					<Card.Body>
						<Form id="create" onSubmit={this.handleSubmit}>
							<Row>
								<Form.Label column sm={2} className="noWrap">
									Backlog ID
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										placeholder="Please enter the Backlog ID"
										onChange={this.handleStoryIDChange}
										required
									/>
								</Col>
							</Row>

							<Row>
								<Form.Label column sm={2} className="noWrap">
									Pretext
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										placeholder="Please enter the Pretext if any"
										onChange={this.handlePretextChange}
									/>
								</Col>
							</Row>

							<Form.Group as={Row} className="align-items-center" required>
								<Form.Label as={Col} sm={2}>
									Tasks
								</Form.Label>
								<Col sm={{ span: 10, offset: 1 }}>
									<Form.Check
										key={'all'}
										id={'all'}
										label="Select All"
										onChange={this.handleCheckboxChange}
										style={{ marginBottom: '1rem' }}
									/>
									{this.getTasks()}
								</Col>
							</Form.Group>
						</Form>
					</Card.Body>
					<Card.Footer>
						{this.handleConfirmation()}
						<Row className="d-flex justify-content-end">
							<Button
								form="create"
								type="submit"
								disabled={creating}
								variant={creating ? 'warning' : 'success'}
							>
								{creating ? this.getCreationSpinner() : 'Create Tasks'}
							</Button>
						</Row>
					</Card.Footer>
				</Card>
			</Container>
		);
	}
}

export default TaskCreate;
