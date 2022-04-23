import React from 'react';
// import { Container, Row, Col, Alert } from 'react-bootstrap';
import LoadingSpinner from '../utility/LoadingSpinner';
import TabContainer from '../tabContainer/TabContainer';

import {
	getSessionProjectKey,
	getSprintData,
	getProjectList,
	setSprintSessionStorage,
	setSessionProjectKey,
} from '../../services/services';
import NavbarContainer from './NavbarContainer';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sprintList: [],
			projectList: [],
			projectKey: getSessionProjectKey(),
			sprintKey: setSprintSessionStorage(),
			automationFailuresCount: 0,
			currentTab: localStorage.getItem('currentTab') || 'wave',
			loading: true,
			featureFlags: {
				//scrum: true,
				wave: true,
				//adhoc: true,
				availability: true,
				createTask: true,
				innovation: true,
				//explorer: true,
				appreciate: true,
				automation: true,
			},
			// isError: false,
			// errorMessage: '',
			// errorMessageDetails: '',
		};
		this.fetchSprintList = this.fetchSprintList.bind(this);
		this.fetchProjectList = this.fetchProjectList.bind(this);
		//this.setIsError = this.setIsError.bind(this);
		this.setAutomationFailureCount = this.setAutomationFailureCount.bind(this);
		this.onSprintSelect = this.onSprintSelect.bind(this);
		this.onProjectSelect = this.onProjectSelect.bind(this);
		this.setLoading = this.setLoading.bind(this);
	}

	componentDidMount = () => {
		Promise.all([this.fetchProjectList(), this.fetchSprintList()]).then(
			(data) => {
				this.setState({
					loading: false,
					sprintList: data[1].sprintList,
					sprintKey: data[1].sprintKey,
					projectList: data[0].projectList,
					projectKey: data[0].projectKey,
				});
			}
		);
	};

	setLoading = (value, callback, args) => {
		this.setState(
			{
				loading: value,
			},
			() => {
				if (callback && args && Array.isArray(args) && args.length > 0) {
					callback(...args);
				} else if (callback && !args) {
					callback();
				}
			}
		);
	};

	setCurrentTab = (option) => {
		console.log(option);
		localStorage.setItem('currentTab', option);
		this.setState({
			currentTab: option,
		});
	};

	setAutomationFailureCount = (count) => {
		this.setState({
			automationFailuresCount: count,
		});
	};

	fetchSprintList = async () => {
		try {
			let response = await getSprintData();
			let fetchedSprints = response.data.sprints;
			let defaultSprint =
				response.data.activeSprint || fetchedSprints[fetchedSprints.length - 2];
			return {
				sprintList: fetchedSprints,
				sprintKey: defaultSprint,
			};
		} catch (err) {
			console.log(err);
			// this.setState({
			// 	isError: true,
			// 	errorMessage:
			// 		'Failed to fetch sprint list or active sprint. Please make sure SAP JIRA is available and then reload the page!',
			// 	errorMessageDetails: err.message,
			// });
		}
	};

	fetchProjectList = async () => {
		try {
			let response = await getProjectList();
			return {
				projectList: response.data.projectList,
				projectKey: response.data.activeProject,
			};
		} catch (err) {
			console.log(err);
			// this.setState({
			// 	isError: true,
			// 	errorMessage:
			// 		'Failed to fetch project list. Please check if SAP JIRA is available and then reload the page!',
			// 	errorMessageDetails: err.message,
			// });
		}
	};

	onSprintSelect = (event) => {
		const { sprintKey } = this.state;
		let selectedSprint = event.target.value;
		//console.log('Selected sprint is: ' + selectedSprint);
		if (sprintKey === selectedSprint) {
			return;
		}
		setSprintSessionStorage(selectedSprint);
		this.setState({ sprintKey: selectedSprint });
	};

	onProjectSelect = (event) => {
		const { projectKey } = this.state;
		let selectedProject = event.target.value;
		//console.log('Selected project is: ' + selectedProject);
		if (projectKey === selectedProject) {
			return;
		}
		setSessionProjectKey(selectedProject);
		this.setState({ projectKey: selectedProject });
	};

	// getAlert = (msg, details) => {
	// 	return (
	// 		<Container>
	// 			<Row>
	// 				<Col
	// 					className="d-flex justify-content-center"
	// 					style={{ marginTop: '8%' }}
	// 				>
	// 					<Alert variant="danger">
	// 						<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
	// 						<p>{msg || 'No error message available'}</p>
	// 						<hr />
	// 						<p>{details ? details : ''}</p>
	// 					</Alert>
	// 				</Col>
	// 			</Row>
	// 		</Container>
	// 	);
	// };

	// setIsError = (value, msg, details) => {
	// 	this.setState({
	// 		isError: value,
	// 		errorMessage: msg,
	// 		errorMessageDetails: JSON.stringify(details),
	// 	});
	// };

	Content = () => {
		const {
			loading,
			sprintList,
			projectList,
			projectKey,
			sprintKey,
			featureFlags,
			currentTab,
			automationFailuresCount,
		} = this.state;
		let showContent =
			sprintKey &&
			projectKey &&
			sprintList &&
			sprintList.length &&
			projectList &&
			projectList.length;
		return (
			<>
				{showContent ? (
					<>
						<NavbarContainer
							loading={loading}
							sprintKey={sprintKey}
							sprintList={sprintList}
							projectKey={projectKey}
							projectList={projectList}
							featureFlags={featureFlags}
							currentTab={currentTab}
							setCurrentTab={this.setCurrentTab}
							onSprintSelect={this.onSprintSelect}
							onProjectSelect={this.onProjectSelect}
							automationFailuresCount={automationFailuresCount}
						/>
						<TabContainer
							loading={loading}
							// sprintList={sprintList}
							projectList={projectList}
							projectKey={projectKey}
							currentTab={currentTab}
							sprintKey={sprintKey}
							//featureFlags={featureFlags}
							getSpinner={this.getSpinner}
							setLoading={this.setLoading}
							//handleError={this.setIsError}
							setAutomationFailureCount={this.setAutomationFailureCount}
						/>
					</>
				) : (
					<LoadingSpinner />
				)}
			</>
		);
	};

	render() {
		// const { isError, errorMessage, errorMessageDetails } = this.state;
		return (
			<>
				{/* {!isError ? (
					<this.Content />
				) : (
					this.getAlert(errorMessage, errorMessageDetails)
				)} */}
				<this.Content />
			</>
		);
	}
}

export default Home;
