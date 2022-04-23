import React, { Component } from 'react';
//import { ButtonGroup, ButtonToolbar, Card, Container } from 'react-bootstrap';
import { Card, Container } from 'react-bootstrap';
import LoadingSpinner from '../utility/LoadingSpinner';
import Wave from './components/Wave';
import { getWaveItemsData } from '../../services/services';
//import RefreshButton from '../utility/RefreshButton';

class WaveContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//refreshing: false,
			waveData: null,
			availability: null,
			progressData: null,
		};
		//this.onRefresh = this.onRefresh.bind(this);
		this.loadWave = this.loadWave.bind(this);
		this.loadWaveData = this.loadWaveData.bind(this);
	}

	componentDidMount = () => {
		const { sprintKey, projectKey } = this.props;
		this.loadWave(sprintKey, projectKey);
	};

	componentDidUpdate = (prevProps) => {
		if (
			this.props.sprintKey !== prevProps.sprintKey ||
			this.props.projectKey !== prevProps.projectKey
		) {
			this.loadWave(this.props.sprintKey, this.props.projectKey);
		}
	};

	loadWave = (sprintKey, projectKey) => {
		this.setState(
			{
				sprintKey: sprintKey,
				projectKey: projectKey,
			},
			() => {
				this.props.setLoadingContent(true, this.loadWaveData, [
					sprintKey,
					projectKey,
				]);
			}
		);
	};

	loadWaveData = (sprintKey, projectKey) => {
		getWaveItemsData(sprintKey, projectKey)
			.then((response) => {
				//if (!response.data.waveData) {
				// this.props.handleError(
				// 	true,
				// 	'Failed to load wave data',
				// 	'Your token has expired please reload the page!'
				// );
				//} else {
				this.setState(
					{
						waveData: response.data.waveData,
						availability: response.data.availability,
						progressData: response.data.progressData,
						//refreshing: false,
					},
					this.props.setLoadingContent(false)
				);
				//}
			})
			.catch((error) => {
				this.props.setLoadingContent(false);
				//this.props.handleError(true, 'Failed to load wave data', error);
			});
	};

	// onRefresh = () => {
	// 	const { sprintKey, projectKey } = this.props;
	// 	this.setState(
	// 		{
	// 			refreshing: true,
	// 		},
	// 		() => {
	// 			this.loadWaveData(sprintKey, projectKey);
	// 		}
	// 	);
	// };

	render() {
		const { loadingContent } = this.props;
		//const { waveData, availability, progressData, refreshing } = this.state;
		const { waveData, availability, progressData } = this.state;
		return (
			<Container fluid>
				{/* <ButtonToolbar
					className="justify-content-end"
					style={{ marginBottom: '0.5rem' }}
				>
					<ButtonGroup size="sm">
						<RefreshButton
							refreshing={refreshing}
							loading={loadingContent}
							onRefresh={this.onRefresh}
						></RefreshButton>
					</ButtonGroup>
				</ButtonToolbar> */}
				<Card className="contentCard">
					{!loadingContent ? (
						<Wave
							waveData={waveData}
							availability={availability}
							progressData={progressData}
						/>
					) : (
						<LoadingSpinner />
					)}
				</Card>
			</Container>
		);
	}
}

export default WaveContainer;
