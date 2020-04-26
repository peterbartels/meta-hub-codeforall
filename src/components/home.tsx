import React, { FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  Row,
  Col,
  Card,
  CardBlock,
  CardTitle,
  CardText,
  Button,
  H1,
  H2,
  Hr
} from '@bootstrap-styled/v4';

const Home: FunctionComponent = () => (
  <>
    <img src="https://www.getvell.com/images/doctors_banner.jpg" width="100%" alt="" />
    <H2 color="secondary" style={{ marginTop: '30px', marginBottom: '30px' }}>We match governmental and health organisations with hackers to fight the worldwide COVID-19 pandemic</H2>
    <Hr />
    <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Col sm={{ size: 4 }}>
        <Card>
          <CardBlock>
            <FontAwesomeIcon icon="building" size="5x" color="#0289C8" />
            <Hr />
            <CardTitle>ORGANISATIONS</CardTitle>
            <CardText>Can search for skills and availability amongst hackers and reach out to them to ask their help.</CardText>
            <Button color="primary">Search now</Button>
          </CardBlock>
        </Card>
      </Col>
      <Col sm={{ size: 4 }}>
        <Card>
          <CardBlock>
            <FontAwesomeIcon icon="user-cog" size="5x" color="#0289C8" />
            <Hr />
            <CardTitle>HACKERS</CardTitle>
            <CardText>Can help by adding a personal profile including skills and when available to join the fight.</CardText>
            <Button color="primary">Add me</Button>
          </CardBlock>
        </Card>
      </Col>
      <Col sm={{ size: 4 }}>
        <Card>
          <CardBlock>
            <FontAwesomeIcon icon="clock" size="5x" color="#0289C8" />
            <Hr />
            <CardTitle>FUTURE</CardTitle>
            <CardText>Connecting hackers affiliated to nation based health(tech) hackatons on a global scale.</CardText>
            <Button color="primary">Read more</Button>
          </CardBlock>
        </Card>
      </Col>
    </Row>
    <Hr />
    <H1 style={{ marginTop: '30px', marginBottom: '30px' }}>Contributers</H1>
    <div>Harm Visser (Organizer)</div>
    <div>Peter Bartels (Development)</div>
    <div>Derrick Stomp (Participant)</div>
  </>
)

export default Home
