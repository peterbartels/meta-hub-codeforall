import React, { FormEvent, useCallback, useState, useEffect, FunctionComponent } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import styled, { Box } from '@xstyled/styled-components'
import { render } from "react-dom";
import { withFormik, useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import competences from '../data/competences'
import skills from '../data/skills'
import {
  Badge,
  Card,
  CardTitle,
  CardSubTitle,
  CardHeader,
  CardBlock,
  CardText,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Hr,
  H1,
  H2,
  H3,
  H5,
  H6,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from '@bootstrap-styled/v4';


import {
  LabelField,
  InputField,
  TextAreaField
} from './formStyles'

import {
  MainContainer,
  EditProfileContainer,
  PrimaryButton,
  NumberInput,
  SmallHeader
} from '../components/styles'


const Organisations: FunctionComponent = () => (
  <div style={{ textAlign: 'left' }}>
    <H1 color="secondary" style={{ marginTop: '30px', marginBottom: '30px' }}>Organisations and projects</H1>
    <Hr />
    <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Col sm={{ size: 2 }}>
        <img src="/images/nhg.jpg" height="40" />
      </Col>
      <Col sm={{ size: 10 }}>
        <H3>Nederlands Huisartsen Genootschap</H3>
      </Col>
      <Col sm={{ size: 2 }} style={{ marginTop: '20px' }}><Button color="primary">Join</Button></Col>
      <Col sm={{ size: 10 }} style={{ marginTop: '20px' }}>
        <H5>Project</H5>
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }}>
        Hoe kunnen we in crisis situaties onze patienten helder en eenduidig informeren?
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }} style={{ marginTop: '20px' }}>
        <H5>Searching for</H5>
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }}>
        Communicatie, programmeervaardigheden, design, projectmanagement, medische kennis
      </Col>
    </Row>
    <Hr />
    <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Col sm={{ size: 2 }}>
        <img src="/images/nvic.jpg" height="40" />
      </Col>
      <Col sm={{ size: 10 }}>
        <H3>Nederlandse Vereniging voor Intensive Care</H3>
      </Col>
      <Col sm={{ size: 2 }} style={{ marginTop: '20px' }}><Button color="primary">Join</Button></Col>
      <Col sm={{ size: 10 }} style={{ marginTop: '20px' }}>
        <H5>Project</H5>
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }}>
        Hoe zorgen wij ervoor dat de totale beschikbare beddencapaciteit in Nederland real-time inzichtelijk is?
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }} style={{ marginTop: '20px' }}>
        <H5>Searching for</H5>
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }}>
        projectmanagement, software ontwikkelaars (JAVA, Python, React JS, REST API, JSON, XML, PostgreSQL, ORACLE)
      </Col>
    </Row>

    <Hr />
    <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Col sm={{ size: 2 }}>
        <img src="/images/rivm.jpg" height="40" />
      </Col>
      <Col sm={{ size: 10 }}>
        <H3>Rijksinstituut voor Volksgezondheid en Milieu (RIVM)</H3>
      </Col>
      <Col sm={{ size: 2 }} style={{ marginTop: '20px' }}><Button color="primary">Join</Button></Col>
      <Col sm={{ size: 10 }} style={{ marginTop: '20px' }}>
        <H5>Project</H5>
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }}>
        Hoe brengen we visualiseren we voorspelde groei van de Corona uitbraak.
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }} style={{ marginTop: '20px' }}>
        <H5>Searching for</H5>
      </Col>
      <Col sm={{ size: 2 }}></Col>
      <Col sm={{ size: 10 }}>
        Python, AI, machine learning, biomedical sciences
      </Col>
    </Row>
  </div >
)

export default Organisations
