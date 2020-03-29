import React, { FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  Row,
  Col,
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  H1,
  Hr,
  Jumbotron
} from '@bootstrap-styled/v4';

const Home: FunctionComponent = () => (
  <>
    <img src="/images/banner.jpg" width="100%" />
    <H1 color="secondary">This platform unites on a global scale government- and health organisatons and volunteering hackaton hackers in their combined fights against the COVID-19 pandemic</H1>
    <Hr />
    <Row>
      <Col sm={{ size: 4 }}>
        <Card>
          <CardBlock>
            <FontAwesomeIcon icon="building" size="5x" color="#606fc8" />
            <Hr />
            <CardTitle>ORGANISATIONS</CardTitle>
            <CardText>Can search for skills and availability amongst hackers and reach out to them to ask their help.</CardText>
            <Button color="primary">Go to search</Button>
          </CardBlock>
        </Card>
      </Col>
      <Col sm={{ size: 4 }}>
        <Card>
          <CardBlock>
            <FontAwesomeIcon icon="user-cog" size="5x" color="#606fc8" />
            <Hr />
            <CardTitle>HACKERS</CardTitle>
            <CardText>Can help by adding a personal profile including skills and when available to join the fight.</CardText>
            <Button color="primary">Add my profile</Button>
          </CardBlock>
        </Card>
      </Col>
      <Col sm={{ size: 4 }}>
        <Card>
          <CardBlock>
            <FontAwesomeIcon icon="clock" size="5x" color="#606fc8" />
            <Hr />
            <CardTitle>FUTURE</CardTitle>
            <CardText>Connecting hackers affiliated to nation based health(tech) hackatons on a global scale.</CardText>
          </CardBlock>
        </Card>
      </Col>
    </Row>
    <Hr />
    <H1>ABOUT US</H1>
    This platform is the result of our teameffort at de Hack Corona hackaton hosted from 27-31 march 2020 by Dutch Hacking Health.
  </>
)

export default Home
