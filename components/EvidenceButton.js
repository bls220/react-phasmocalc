import React, { Component } from "react";
import { Button } from "react-bootstrap";
import EvidenceState from "../services/EvidenceState";

export default class EvidenceButton extends Component {
  constructor(props) {
    super(props);
    this.state = { found: EvidenceState.Unknown };
  }

  handleClick = () => {
    this.setState((state) => {
      let nextState = { found: state.found.next() };
      this.props.onEvidenceChange?.call(this, nextState.found);
      return nextState;
    });
  };

  render() {
    let className;
    switch (this.state.found) {
      case EvidenceState.Found:
        className = "success";
        break;
      case EvidenceState.Rejected:
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
