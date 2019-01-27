import React from 'react';
import PropTypes from 'prop-types';

function HSL(props) {
	return (
		<div style={{ margin: '0.5rem 0.5rem' }}>
			<b>HSL:&nbsp;</b>
			<input
				className="monospace"
				type="number"
				name="hue"
				maxLength="3"
				min="0"
				max="360"
				value={props.hue}
				onChange={props.onChange}
				style={{ width: '50px', margin: '0 0.1rem' }}
			/>
			<input
				className="monospace"
				type="number"
				name="sat"
				maxLength="3"
				min="0"
				max="100"
				value={props.sat}
				onChange={props.onChange}
				style={{ width: '50px', margin: '0 0.1rem' }}
			/>
			<input
				className="monospace"
				type="number"
				name="lum"
				maxLength="3"
				min="0"
				max="100"
				value={props.lum}
				onChange={props.onChange}
				style={{ width: '50px', margin: '0 0.1rem' }}
			/>
			<button
				className="normal-btn"
				onClick={props.onCopy}
				data-tip={"Copy 'hsl(" + props.hue + ', ' + props.sat + '%, ' + props.lum + "%)' to clipboard"}
			>
				<i className="fas fa-copy" />
			</button>
		</div>
	);
}

HSL.propTypes = {
	hue: PropTypes.number.isRequired,
	sat: PropTypes.number.isRequired,
	lum: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired
};

export default HSL;
