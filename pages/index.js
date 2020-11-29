import Head from "next/head";
import { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";
import deepFreeze from "../utilities/deepFreeze";
import EvidenceState from "../services/EvidenceState";
import EvidenceButton from "../components/EvidenceButton";
import GhostInfo from "../components/GhostInfo";

const _evidenceTypes = deepFreeze({
  emf: { label: "EMF 5" },
  orbs: { label: "Ghost Orbs" },
  writing: { label: "Ghost Writing" },
  temps: { label: "Freezing Temps" },
  spirit: { label: "Spirit Box" },
  fingerPrints: { label: "Finger Prints" },
});

const _ghostTypes = deepFreeze([
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
]);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = Object.keys(_evidenceTypes).reduce(
      (result, type) => ((result[type] = EvidenceState.Unknown), result),
      {}
    );
  }

  updateEvidence = (evidenceType, found) =>
    this.setState({ [evidenceType]: found });

  renderButton = (evidenceType) => (
    <Col key={evidenceType} className="d-flex" xs="12" sm="6" md="4" lg="2">
      <EvidenceButton
        key={evidenceType}
        onEvidenceChange={(found) => this.updateEvidence(evidenceType, found)}
      >
        {_evidenceTypes[evidenceType].label}
      </EvidenceButton>
    </Col>
  );

  renderGhostInfo = (ghostType) => {
    let requiredEvidence = ghostType.requiredEvidenceTypes.reduce(
      (result, type) => ((result[type] = _evidenceTypes[type]), result),
      {}
    );
    return (
      <GhostInfo
        key={ghostType.name}
        name={ghostType.name}
        requiredEvidence={requiredEvidence}
        allEvidence={this.state}
      ></GhostInfo>
    );
  };

  render() {
    const buttons = Object.keys(_evidenceTypes).map(this.renderButton);

    const ghostRows = [..._ghostTypes]
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map(this.renderGhostInfo);

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
