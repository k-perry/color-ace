import React, { Component } from "react";
import CSSColorsFilter from "./CSSColorsFilter";
import PropTypes from "prop-types";

const colorFilters = [
    { tag: "all", caption: "All Colors" },
    { tag: "blue", caption: "Blues" },
    { tag: "brown", caption: "Browns" },
    { tag: "green", caption: "Greens" },
    { tag: "grey", caption: "Greys" },
    { tag: "orange", caption: "Oranges" },
    { tag: "purple", caption: "Purples" },
    { tag: "red", caption: "Reds" },
    { tag: "white", caption: "Whites" },
    { tag: "yellow", caption: "Yellows" },
];

export default class CSSColorsFilters extends Component {
    static propTypes = {
        activeFilter: PropTypes.string.isRequired,
        onFilter: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header" style={{ marginTop: "0.5rem" }}>
                    FILTER
                </div>
                <hr style={{ margin: "0.5rem 0" }} />
                {colorFilters.map((filter) => {
                    return (
                        <CSSColorsFilter
                            key={filter.tag}
                            activeFilter={this.props.activeFilter}
                            tag={filter.tag}
                            caption={filter.caption}
                            onClick={this.props.onFilter}
                        />
                    );
                })}
                <hr style={{ margin: "0.5rem 0" }} />
            </div>
        );
    }
}
