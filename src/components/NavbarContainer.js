import React from 'react';
import sap_logo from '../sap-blue-logo.svg';

import {
	Badge,
	Nav,
	Navbar,
	Offcanvas,
	Container,
	Form,
	Row,
	Col,
	FloatingLabel,
} from 'react-bootstrap';

const tabs = {
	WAVE_TAB: 'wave',
	AVAILABILITY_TAB: 'availability',
	//SCRUM_TAB: 'scrum',
	//ADHOC_TAB: 'adhoc',
	CREATE_TASKS_TAB: 'createTasks',
	INNOVATION_TAB: 'innovation',
	AUTOMATION_FAILURES: 'automation',
	//TASK_EXPLORER: 'explorer',
	APPRECIATE: 'appreciate',
};

const tabNames = {
	wave: 'Wave',
	availability: 'Availability',
	//scrum: 'Scrum',
	//adhoc: 'Ad-hoc',
	createTasks: 'Create Tasks',
	innovation: 'Innovation',
	automation: 'Automation Failures',
	//explorer: 'Task Explorer',
	appreciate: 'Appreciate',
};

const constants = {
	WAVE_TAB: 'Wave',
	AVAILABILITY_TAB: 'Availability',
	//SCRUM_TAB: 'Scrum',
	//ADHOC_TAB: 'Ad-hoc',
	CREATE_TASKS_TAB: 'Create Tasks',
	INNOVATION_TAB: 'Innovation',
	AUTOMATION_FAILURES: 'Automation Failures',
	//TASK_EXPLORER: 'Task Explorer',
	APPRECIATE: 'Appreciate',
};

class NavbarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			currentTab,
			featureFlags,
			sprintKey,
			sprintList,
			projectKey,
			projectList,
			loading,
			automationFailuresCount,
			setCurrentTab,
			onSprintSelect,
			onProjectSelect,
		} = this.props;
		return (
			<Navbar
				id="sapNavbar"
				variant="dark"
				onSelect={(e) => setCurrentTab(e)}
				expand={false}
				collapseOnSelect
				sticky="top"
			>
				<Container fluid>
					<div className="d-flex">
						<Navbar.Toggle />
						<img
							alt=""
							src={sap_logo}
							width="76"
							height="38"
							style={{ marginLeft: '1rem', marginRight: '0.5rem' }}
							className="d-none d-sm-block"
						/>
						<Navbar.Brand className="d-none d-sm-block navBrandTabName align-middle align-items-center">
							{tabNames[currentTab]}
						</Navbar.Brand>
					</div>

					<Navbar.Offcanvas id="offcanvasNavbar" placement="start">
						<Offcanvas.Body>
							<span style={{ color: 'white', fontWeight: 'bold' }}>
								OIS Dashboard
								<hr />
							</span>
							<Nav activeKey={currentTab}>
								<Nav.Item>
									<Nav.Link
										disabled={!featureFlags.wave}
										eventKey={tabs.WAVE_TAB}
									>
										{constants.WAVE_TAB}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										disabled={!featureFlags.availability}
										eventKey={tabs.AVAILABILITY_TAB}
									>
										{constants.AVAILABILITY_TAB}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										disabled={!featureFlags.automation}
										eventKey={tabs.AUTOMATION_FAILURES}
									>
										{constants.AUTOMATION_FAILURES}{' '}
										{automationFailuresCount ? (
											<Badge
												pill
												bg="danger"
												style={{
													verticalAlign: 'text-bottom',
												}}
											>
												{automationFailuresCount}
											</Badge>
										) : (
											''
										)}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										disabled={!featureFlags.innovation}
										eventKey={tabs.INNOVATION_TAB}
									>
										{constants.INNOVATION_TAB}
									</Nav.Link>{' '}
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										disabled={!featureFlags.appreciate}
										eventKey={tabs.APPRECIATE}
									>
										{constants.APPRECIATE}
									</Nav.Link>{' '}
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										disabled={!featureFlags.createTask}
										eventKey={tabs.CREATE_TASKS_TAB}
									>
										{constants.CREATE_TASKS_TAB}
									</Nav.Link>
								</Nav.Item>
								<hr />
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>

					<Form>
						<Row>
							<Col className="d-flex">
								<FloatingLabel label="Sprint" style={{ color: 'white' }}>
									<Form.Select
										onChange={(e) => onSprintSelect(e)}
										defaultValue={sprintKey}
										disabled={loading}
										className="navBarSelect"
									>
										{sprintList.map((sprintName) => (
											<option key={sprintName} value={sprintName}>
												{sprintName}
											</option>
										))}
									</Form.Select>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel label="Project" style={{ color: 'white' }}>
									<Form.Select
										className="navBarSelect"
										onChange={(e) => onProjectSelect(e)}
										defaultValue={projectKey}
										disabled={loading}
									>
										{projectList.map((projectObj) => (
											<option key={projectObj.key} value={projectObj.key}>
												{projectObj.displayName}
											</option>
										))}
									</Form.Select>
								</FloatingLabel>
							</Col>
						</Row>
					</Form>
				</Container>
			</Navbar>
		);
	}
}

export default NavbarContainer;
