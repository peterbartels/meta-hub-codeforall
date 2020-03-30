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
  Row,
  Col,
  H3,
  H5,
  H6,
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


const Avatar = styled.div`
  border-radius:50%;
  width:100px;
  height:100px;
  background:url(${(props: any) => props.image ? props.image : 'http://placebeard.it/100*100'});
  filter: blur(0px);
  font-size:3rem;
  color:white;
  border: 4px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15);
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


const ProfilesOverview: FunctionComponent<ProfilesOverviewProps> = (props) => {
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

        <Button color="primary">Full profile</Button>
      </CardBlock>
    </ProfileCard>
  )
}

const ProfilesComponent: FunctionComponent = (props) => {
  const [randomUsers, setRandomUsers] = useState([]);
  //const dispatch = useDispatch()
  const profileData = useSelector((state: ReduxState) => state)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://randomuser.me/api/?results=20',
      );

      const users: any = result.data.results.map((p: any): any => ({
        alias: `${p.name.first} ${p.name.last}`,
        description: '',
        skills: [],
        competences: [],
        email: p.email,
        picture: p.picture.medium
      }))
      setRandomUsers((profileData as any).profiles.concat(users));
    };
    fetchData();
  }, []);

  /*
     const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     evt.preventDefault();
     dispatch({ type: "EDIT_PROFILE", payload: profile })
     }
   */
  return (
    <Row>
      {randomUsers.map((profile: Profile, index: number) => {
        const randomSkill = Math.floor((Math.random() * 3) % 3)
        profile.skills = profile.skills.length == 0 ? [skills[randomSkill]] : profile.skills
        const randomCompetence = Math.floor((Math.random() * competences.length) % competences.length)

        profile.competences = profile.competences.length == 0 ? [competences[randomCompetence]] : profile.competences

        return (<Col sm={{ size: 3 }} key={index}><ProfilesOverview profile={profile} /></Col>)
      })}
    </Row>
  )
}

export default ProfilesComponent
