import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class EvidenceButton extends Component {
  constructor(props) {
    super(props);
    this.state = { found: "unknown" };
  }

  handleClick = (e) => {
    this.setState((state) => {
      let nextState = { found: state.found };
      switch (state.found) {
        case "unknown":
          nextState.found = "true";
          break;
        case "true":
          nextState.found = "false";
          break;
        case "false":
          nextState.found = "unknown";
          break;
      }
      this.props.onEvidenceChange?.call(this, nextState.found);
      return nextState;
    });
  };

  render() {
    let className;
    switch (this.state.found) {
      case "true":
        className = "success";
        break;
      case "false":
        className = "danger";
        break;
      default:
        className = "outline-light";
        break;
    }

    return (
      <Button
        variant={className}
        className="flex-fill text-nowrap"
        onClick={this.handleClick}
      >
        {this.props.children}
      </Button>
    );
  }
}
