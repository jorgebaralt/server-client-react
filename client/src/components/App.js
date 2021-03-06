import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import SurveyNew from './surveys/SurveyNew';

import Header from './Header';
import Landing from './Landing'
import Dashboard from './Dashboard'


class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
							<Route exact path="/surveys" component={Dashboard} />
							<Route path="/surveys/new" component={SurveyNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
export default connect(null, actions)(App);
