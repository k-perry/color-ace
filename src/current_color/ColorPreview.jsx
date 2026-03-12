import React from "react";

let lastColor = null;

function ColorPreview(props) {
    let newColor;
    if (props.shouldUpdate) {
        newColor = props.color;
        lastColor = props.color;
    } else {
        newColor = lastColor;
    }
    return (
        <div
            style={{
                margin: "1rem auto",
                width: "200px",
                height: "150px",
                border: "1px solid grey",
                backgroundColor: newColor,
            }}
        />
    );
}

export default ColorPreview;
