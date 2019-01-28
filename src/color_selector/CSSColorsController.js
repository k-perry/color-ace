import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSColorsTable from './CSSColorsTable';
import CSSColorsFilters from './CSSColorsFilters';
import CSSColors from '../data/css-colors.json';

// Because this component is inside a Tab component, it will be unmounted when it is
// not the active tab.  This causes it to lose the current state.  We can use a variable
// to keep a backup copy of the state and restore it when the component mounts.
let state = { colors: CSSColors, activeFilter: 'all' }; // Initial state

export default class CSSColorsController extends Component {
	static propTypes = {
		setColor: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = state; // Load the last state
	}

	componentWillUnmount() {
		state = this.state; // Save last state before unmounting
	}

	onFilter = (category) => {
		this.setState({ activeFilter: category });
		if (category === 'all') {
			this.setState({ colors: CSSColors });
		} else {
			const filteredColors = CSSColors.filter((color) => {
				return color.categories.includes(category);
			});
			this.setState({ colors: filteredColors });
		}
	};

	onSort = (key, sortDir) => {
		const colorsCopy = this.state.colors;
		colorsCopy.sort((a, b) => {
			return a[key].localeCompare(b[key]) * -sortDir;
		});
		this.setState({ colors: colorsCopy });
	};

	render() {
		return (
			<React.Fragment>
				<CSSColorsTable colors={this.state.colors} setColor={this.props.setColor} onSort={this.onSort} />
				<CSSColorsFilters activeFilter={this.state.activeFilter} onFilter={this.onFilter} />
			</React.Fragment>
		);
	}
}
