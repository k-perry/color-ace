import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

export default class AdjustLuminance extends Component {
    static propTypes = {
        caption: PropTypes.string.isRequired,
        buttonCaptions: PropTypes.array.isRequired,
        buttonAmounts: PropTypes.array.isRequired,
        buttonTooltips: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div
                className="center"
                style={{ fontSize: "0.85rem", padding: "0.5rem 0.1rem" }}
            >
                <div className="sidebar-header">{this.props.caption}</div>
                <div>
                    {this.props.buttonCaptions.map((caption, idx) => {
                        return (
                            <div key={idx}>
                                <button
                                    className="normal-btn"
                                    style={{
                                        margin: "0.2rem 0",
                                        minWidth: "2.5rem",
                                    }}
                                    onClick={() =>
                                        this.props.onClick(
                                            this.props.buttonAmounts[idx]
                                        )
                                    }
                                    data-tip={this.props.buttonTooltips[idx]}
                                >
                                    {caption}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <ReactTooltip effect="solid" />
            </div>
        );
    }
}
