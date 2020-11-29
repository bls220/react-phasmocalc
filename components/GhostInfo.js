import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import EvidenceState from "../services/EvidenceState";

export default class GhostInfo extends Component {
  renderEvidence = (evidenceType, evidence) => {
    if (this.props.allEvidence[evidenceType] === EvidenceState.Unknown) {
      return (
        <Col
          key={evidenceType}
          xs="12"
          sm="4"
          md="3"
          lg="2"
          className="text-nowrap"
        >
          {evidence.label}
        </Col>
      );
    }
  };

  render() {
    let remainingEvidence = Object.entries(this.props.requiredEvidence)
      .sort((a, b) => (a.label < b.label ? -1 : 1))
      .map(([evidenceType, evidence]) =>
        this.renderEvidence(evidenceType, evidence)
      );

    let foundEvidence = Object.entries(this.props.allEvidence)
      .filter(([_, state]) => state === EvidenceState.Found)
      .map(([evidenceType, _]) => evidenceType);

    let rejectedEvidence = Object.entries(this.props.allEvidence)
      .filter(([_, state]) => state === EvidenceState.Rejected)
      .map(([evidenceType, _]) => evidenceType);

    // Does this match all the found evidence and none of the rejected evidence?
    let matchesFilter =
      foundEvidence.every(
        (evidenceType) => this.props.requiredEvidence[evidenceType]
      ) &&
      !rejectedEvidence.some(
        (evidenceType) => this.props.requiredEvidence[evidenceType]
      );

    if (!matchesFilter) {
      return <></>;
    }

    return (
      <Row>
        <Col xs="12" sm="2">
          {this.props.name}
        </Col>
        <Col>
          <Row className="ml-3">{remainingEvidence}</Row>
        </Col>
      </Row>
    );
  }
}
