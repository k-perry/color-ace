import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

function RGB(props) {
	return (
		<div style={{ margin: '0.5rem 0.5rem' }}>
			<b>RGB:&nbsp;</b>
			<input
				className="monospace"
				type="number"
				name="red"
				maxLength="3"
				min="0"
				max="255"
				value={props.red}
				onChange={props.onChange}
				style={{ width: '50px', margin: '0 0.1rem' }}
			/>
			<input
				className="monospace"
				type="number"
				name="green"
				maxLength="3"
				min="0"
				max="255"
				value={props.green}
				onChange={props.onChange}
				style={{ width: '50px', margin: '0 0.1rem' }}
			/>
			<input
				className="monospace"
				type="number"
				name="blue"
				maxLength="3"
				min="0"
				max="255"
				value={props.blue}
				onChange={props.onChange}
				style={{ width: '50px', margin: '0 0.1rem' }}
			/>
			<button
				className="normal-btn"
				onClick={props.onCopy}
				data-tip={"Copy 'rgb(" + props.red + ', ' + props.green + ', ' + props.blue + ")' to clipboard"}
			>
				<i className="fas fa-copy" />
			</button>
			<ReactTooltip effect="solid" />
		</div>
	);
}

RGB.propTypes = {
	red: PropTypes.number.isRequired,
	green: PropTypes.number.isRequired,
	blue: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired
};

export default RGB;
