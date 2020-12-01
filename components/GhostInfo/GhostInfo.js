import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import EvidenceState from "../../services/EvidenceState";
import styles from "./GhostInfo.module.scss";

export default class GhostInfo extends Component {
  renderEvidence = (evidenceType) => {
    let showEvidence =
      this.props.allEvidence[evidenceType].state === EvidenceState.Unknown &&
      this.props.requiredEvidence.includes(evidenceType);

    return (
      <Col
        key={evidenceType}
        xs="12"
        sm="6"
        md="4"
        lg="2"
        className="text-nowrap"
      >
        {showEvidence ? this.props.allEvidence[evidenceType].label : " "}
      </Col>
    );
  };

  render() {
    let foundEvidence = Object.entries(this.props.allEvidence)
      .filter(([_, evidence]) => evidence.state === EvidenceState.Found)
      .map(([evidenceType, _]) => evidenceType);

    let rejectedEvidence = Object.entries(this.props.allEvidence)
      .filter(([_, evidence]) => evidence.state === EvidenceState.Rejected)
      .map(([evidenceType, _]) => evidenceType);

    // Does this match all the found evidence and none of the rejected evidence?
    let matchesFilter =
      foundEvidence.every((evidenceType) =>
        this.props.requiredEvidence.includes(evidenceType)
      ) &&
      !rejectedEvidence.some((evidenceType) =>
        this.props.requiredEvidence.includes(evidenceType)
      );

    if (!matchesFilter) {
      return <></>;
    }

    let remainingEvidence = Object.keys(this.props.allEvidence).map(
      this.renderEvidence
    );

    return (
      <Row className={styles["ghost-info"]}>
        <Col xs="12" sm="2">
          {this.props.name}
        </Col>
        <Col xs="12" sm="10">
          <Row className="ml-3">{remainingEvidence}</Row>
        </Col>
      </Row>
    );
  }
}
