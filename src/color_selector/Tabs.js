import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

export default class Tabs extends Component {
	static propTypes = {
		children: PropTypes.array.isRequired
	};

	state = {
		activeTab: this.props.children[0].props.label
	};

	onClickTab = (tabName) => {
		this.setState({ activeTab: tabName });
	};

	render() {
		return (
			<div className="tabs">
				<ol className="tab-list">
					{this.props.children.map((child) => {
						return (
							<Tab
								activeTab={this.state.activeTab}
								key={child.props.label}
								label={child.props.label}
								onClick={this.onClickTab}
							/>
						);
					})}
				</ol>
				<div className="tab-content">
					{this.props.children.map((child) => {
						if (child.props.label !== this.state.activeTab) {
							return undefined;
						} else {
							return child.props.children;
						}
					})}
				</div>
			</div>
		);
	}
}
