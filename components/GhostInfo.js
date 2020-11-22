import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default class GhostInfo extends Component {
  renderEvidence = (evidence, key) => (
    <Col key={key} xs="12" sm="4" md="3" lg="2" className="text-nowrap">
      {evidence}
    </Col>
  );

  render() {
    let remainingEvidence = this.props.requiredEvidence
      .filter((evidence) => evidence.found === "unknown")
      .map((evidence) => evidence.label)
      .sort()
      .map((evidence, i) => this.renderEvidence(evidence, i));
    if (remainingEvidence.length === 0) {
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
