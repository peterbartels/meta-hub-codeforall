import React, { FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
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

const Home: FunctionComponent = () => {
  const { t } = useTranslation('translations', { i18n });
  return (
    <>
      <img src="https://www.getvell.com/images/doctors_banner.jpg" width="100%" alt="" />
      <H2 color="secondary" style={{ marginTop: '30px', marginBottom: '30px' }}>{t('home.welcome')}</H2>
      <Hr />
      <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Col sm={{ size: 4 }}>
          <Card>
            <CardBlock>
              <FontAwesomeIcon icon="building" size="5x" color="#0289C8" />
              <Hr />
              <CardTitle>{t('general.organisations')}</CardTitle>
              <CardText>{t('home.organisations.description')}</CardText>
              <Button color="primary">{t('home.organisations.button')}</Button>
            </CardBlock>
          </Card>
        </Col>
        <Col sm={{ size: 4 }}>
          <Card>
            <CardBlock>
              <FontAwesomeIcon icon="user-cog" size="5x" color="#0289C8" />
              <Hr />
              <CardTitle>{t('general.people')}</CardTitle>
              <CardText>{t('home.people.description')}</CardText>
              <Button color="primary">{t('home.people.button')}</Button>
            </CardBlock>
          </Card>
        </Col>
        <Col sm={{ size: 4 }}>
          <Card>
            <CardBlock>
              <FontAwesomeIcon icon="clock" size="5x" color="#0289C8" />
              <Hr />
              <CardTitle>{t('home.future.title')}</CardTitle>
              <CardText>{t('home.future.description')}</CardText>
              <Button color="primary">{t('home.future.button')}</Button>

            </CardBlock>
          </Card>
        </Col>
      </Row>
      <Hr />
      <H1 style={{ marginTop: '30px', marginBottom: '30px' }}>{t('home.contributors')}</H1>
      <div>Harm Visser ({t('home.organizer')})</div>
      <div>Peter Bartels ({t('home.developer')})</div>
      <div>Derrick Stomp ({t('home.general')})</div>
    </>
  )
}

export default Home
