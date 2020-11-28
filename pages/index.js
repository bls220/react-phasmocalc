import Head from "next/head";
import { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";
import EvidenceButton from "../components/EvidenceButton";
import GhostInfo from "../components/GhostInfo";

const _evidenceTypes = {
  emf: { label: "EMF 5" },
  orbs: { label: "Ghost Orbs" },
  writing: { label: "Ghost Writing" },
  temps: { label: "Freezing Temps" },
  spirit: { label: "Spirit Box" },
  fingerPrints: { label: "Finger Prints" },
};

const _ghostTypes = [
  {
    name: "Spirit",
    requiredEvidenceTypes: ["writing", "spirit", "fingerPrints"],
  },
  {
    name: "Wraith",
    requiredEvidenceTypes: ["temps", "spirit", "fingerPrints"],
  },
  {
    name: "Phantom",
    requiredEvidenceTypes: ["emf", "orbs", "temps"],
  },
  {
    name: "Poltergeist",
    requiredEvidenceTypes: ["spirit", "orbs", "fingerPrints"],
  },
  {
    name: "Banshee",
    requiredEvidenceTypes: ["emf", "fingerPrints", "temps"],
  },
  {
    name: "Jinn",
    requiredEvidenceTypes: ["emf", "orbs", "spirit"],
  },
  {
    name: "Mare",
    requiredEvidenceTypes: ["spirit", "orbs", "temps"],
  },
  {
    name: "Revenant",
    requiredEvidenceTypes: ["emf", "writing", "fingerPrints"],
  },
  {
    name: "Shade",
    requiredEvidenceTypes: ["emf", "orbs", "writing"],
  },
  {
    name: "Demon",
    requiredEvidenceTypes: ["writing", "spirit", "temps"],
  },
  {
    name: "Yurei",
    requiredEvidenceTypes: ["writing", "orbs", "temps"],
  },
  {
    name: "Oni",
    requiredEvidenceTypes: ["emf", "writing", "spirit"],
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    let initialState = {};
    Object.keys(_evidenceTypes).forEach((evidence) => {
      initialState[evidence] = "unknown";
    });
    this.state = initialState;
  }

  updateEvidence = (evidenceKey, found) => {
    this.setState((state, props) => {
      let evidence = {};
      evidence[evidenceKey] = found;
      return evidence;
    });
  };

  renderButton = (evidence) => (
    <EvidenceButton
      key={evidence}
      onEvidenceChange={(found) => this.updateEvidence(evidence, found)}
    >
      {_evidenceTypes[evidence].label}
    </EvidenceButton>
  );

  render() {
    const buttons = Object.keys(_evidenceTypes).map((evidence, i) => (
      <Col key={evidence} className="d-flex" xs="12" sm="6" md="4" lg="2">
        {this.renderButton(evidence)}
      </Col>
    ));

    const ghostRows = _ghostTypes
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map((ghost) => {
        let evidence = ghost.requiredEvidenceTypes.map((type) => ({
          type: type,
          label: _evidenceTypes[type].label,
          found: this.state[type],
        }));
        let foundEvidence = Object.entries(this.state)
          .filter((entry) => entry[1] === "true")
          .map((entry) => entry[0]);
        let rejectedEvidence = Object.entries(this.state)
          .filter((entry) => entry[1] === "false")
          .map((entry) => entry[0]);
        return (
          <GhostInfo
            key={ghost.name}
            name={ghost.name}
            requiredEvidence={evidence}
            foundEvidence={foundEvidence}
            rejectedEvidence={rejectedEvidence}
          ></GhostInfo>
        );
      });

    return (
      <>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container fluid="md">
          <Row>
            <Col>
              <h1>Phasmocalc</h1>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center no-gutters">{buttons}</Row>
          {ghostRows}
        </Container>
      </>
    );
  }
}

export default Home;
