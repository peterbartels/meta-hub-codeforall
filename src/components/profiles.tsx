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
  H1,
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

import { State as ReduxState, Profile } from '../reducers';

const BoxHeader = styled(Box)`
  background: #606fc8;
  color:white;
  padding:5px;
`

interface ProfilesOverviewProps {
  profile: Profile
}



//box-shadow: 0 0 0 1px rgba(0,0,0,.15); -> from linkedin
const Avatar = styled.div`
  border-radius:50%;
  width:100px;
  height:100px;
  background:url(${(props: any) => props.image ? props.image : 'http://placebeard.it/100*100'});
  filter: blur(3px);
  font-size:3rem;
  color:white;
  border: 4px solid #fff;
  box-shadow: 0 0 0 2px black;
  
  transition: box-shadow 83ms;
`

const ProfileCardHeader = styled(CardHeader)`
    display:flex;
    align-items:center;
    justify-content:center;

`

const ProfileCard = styled(Card)`

    margin-bottom:20px;
`

const ProfileTitle = styled(CardTitle)`
    margin-bottom:5px;
    border:none !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    max-height:24px;
    width:100%;
`

const ProfileCardDescription = styled.div`
  line-height: 2.4rem!important;
  max-height:24px;
  width:100%;
  max-height: 2.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`


const ProfilesOverview: FunctionComponent<any> = (props) => {
  const { profile, handleClick } = props
  const skills = profile.skills.map((s: any, index: number) => {
    return (
      <H6 key={index} style={{ display: 'inline' }}> <Badge>{s.label}</Badge></H6>
    )
  })

  const competences = profile.competences.map((s: any, index: number) => {
    return (
      <H6 key={index} style={{ display: 'inline' }}> <Badge color="primary">{s.label}</Badge></H6>
    )
  })

  return (
    <ProfileCard className="text-center">
      <ProfileCardHeader><Avatar image={profile.picture} /></ProfileCardHeader>
      <CardBlock>
        <ProfileTitle><H3>{profile.alias}</H3></ProfileTitle>
        <ProfileCardDescription>{profile.description}</ProfileCardDescription>
        <CardText>
        </CardText>
        <CardText>
          {skills} {competences}
        </CardText>

        <Button color="secondary" onClick={handleClick(profile)}>Full profile</Button>
      </CardBlock>
    </ProfileCard>
  )
}

const ProfileView: FunctionComponent<{ profile: Profile }> = (props) => {
  const { profile } = props
  const skills = profile.skills.map((s: any, index: number) => {
    return (
      <H6 key={index} style={{ display: 'inline' }}> <Badge>{s.label}</Badge></H6>
    )
  })

  const competences = profile.competences.map((s: any, index: number) => {
    return (
      <H6 key={index} style={{ display: 'inline' }}> <Badge color="primary">{s.label}</Badge></H6>
    )
  })

  return (
    <div style={{ textAlign: 'left' }}>
      <Button color="secondary">Back</Button>
      <H1 style={{ marginTop: '20px' }}>{profile.alias}</H1>
      <Row style={{ marginTop: '20px' }}>
        <Col xs={{ size: 2 }}>
          Description
        </Col>
        <Col xs={{ size: 10 }}>
          {profile.description}
        </Col>
        <Col xs={{ size: 2 }}>
          LinkedIn
        </Col>
        <Col xs={{ size: 10 }}>
          {profile.linkedin}
        </Col>

        <Col xs={{ size: 2 }}>
          Industry
        </Col>
        <Col xs={{ size: 10 }}>
          {skills}
        </Col>
        <Col xs={{ size: 2 }}>
          Skills
        </Col>
        <Col xs={{ size: 10 }}>
          {competences}
        </Col>
      </Row>
    </div >
  )
}

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`

const ProfilesComponent: FunctionComponent = (props) => {
  const [randomUsers, setRandomUsers] = useState([]);
  const [currentProfile, setCurrentProfile] = useState<any>();
  //const dispatch = useDispatch()
  const profileData = useSelector((state: ReduxState) => state)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://randomuser.me/api/?results=20',
      );

      const users: any = result.data.results.map((p: any): any => ({
        alias: `${p.name.first} ${p.name.last}`,
        description: loremIpsum,
        linkedin: 'https://www.linkedin.com/in/peterbartels',
        skills: [],
        competences: [],
        email: p.email,
        picture: p.picture.medium
      }))
      setRandomUsers((profileData as any).profiles.concat(users));
    };
    fetchData();
  }, []);

  const handleClick = (profile: Profile) => (e: any) => {
    setCurrentProfile(profile)
  }

  /*
     const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     evt.preventDefault();
     dispatch({ type: "EDIT_PROFILE", payload: profile })
     }
   */
  return currentProfile ? <ProfileView profile={currentProfile} /> : (
    <>
      <Row>
        <Form>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon>@</InputGroupAddon>
              <Input id="alias" placeholder="Search for alias, skills, competences" type="alias" style={{ width: '400px' }} />
            </InputGroup>
          </FormGroup>
        </Form>
      </Row>

      <Row>
        {randomUsers.map((profile: Profile, index: number) => {
          const randomSkill = Math.floor((Math.random() * 3) % 3)
          profile.skills = profile.skills.length == 0 ? [skills[randomSkill]] : profile.skills
          const randomCompetence = Math.floor((Math.random() * competences.length) % competences.length)

          profile.competences = profile.competences.length == 0 ? [competences[randomCompetence]] : profile.competences

          return (<Col sm={{ size: 3 }} key={index}><ProfilesOverview profile={profile} handleClick={handleClick} /></Col>)
        })}
      </Row>
    </>
  )
}

export default ProfilesComponent
