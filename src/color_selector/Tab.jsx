import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClickTab = () => {
        this.props.onClick(this.props.label);
    };

    render() {
        let className = "tab-list-item";
        if (this.props.activeTab === this.props.label) {
            className += " tab-list-active";
        }

        return (
            <React.Fragment>
                <li className={className} onClick={this.onClickTab}>
                    {this.props.label}
                </li>
            </React.Fragment>
        );
    }
}
