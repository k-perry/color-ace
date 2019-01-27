import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CSSColorsFilter extends Component {
	static propTypes = {
		activeFilter: PropTypes.string.isRequired,
		tag: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired
	};

	onClick = () => {
		this.props.onClick(this.props.tag);
	};

	render() {
		let className = 'color-filter-item';
		if (this.props.activeFilter === this.props.tag) {
			className += ' color-filter-active';
		}

		return (
			<React.Fragment>
				<div className={className} onClick={this.onClick}>
					{this.props.caption}
				</div>
			</React.Fragment>
		);
	}
}
