import React, { Component } from 'react';
import { Tab } from 'react-bootstrap';
import LoadingSpinner from '../utility/LoadingSpinner';
import Innovation from './components/Innovation';
import { getInnovationData } from '../../services/services';

class InnovationContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			innovationData: null,
		};
		this.loadInnovation = this.loadInnovation.bind(this);
		this.loadInnovationData = this.loadInnovationData.bind(this);
	}

	componentDidMount = () => {
		this.loadInnovation();
	};

	loadInnovation = () => {
		this.setState(
			{
				loading: true,
			},
			this.loadInnovationData()
		);
	};

	loadInnovationData = () => {
		console.log('Loading: Innovation');
		getInnovationData().then((response) => {
			console.log('Done: Innovation');
			let list = response.data;
			this.setState({
				innovationData: list,
				loading: false,
			});
		});
	};

	render() {
		let { eventKey } = this.props;
		let { loading, innovationData } = this.state;

		return (
			<>
				{!loading && innovationData ? (
					<Innovation innovationData={innovationData} />
				) : (
					<LoadingSpinner />
				)}
			</>
		);
	}
}

export default InnovationContainer;
