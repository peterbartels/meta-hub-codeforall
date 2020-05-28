import React, { useState, useEffect, FunctionComponent } from "react"
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'
import styled from '@xstyled/styled-components'
import md5 from 'blueimp-md5'
import Identicon from 'identicon.js'
import {
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardBlock,
  CardText,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  H1,
  H6,
  Input,
  InputGroup,
  InputGroupAddon,
} from '@bootstrap-styled/v4';

import i18n from '../i18n';
import api from '../utils/api'
import { useAuth0 } from "../auth/auth0";

import { State as ReduxState, Profile } from '../reducers';

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
  const { t } = useTranslation('translations', { i18n });
  const { profile, handleClick } = props
  const industries = (profile.industries || []).map((industry: String, index: number) => {
    return (
      <span key={index} style={{ display: 'inline' }}> <Badge>{industry}</Badge></span>
    )
  })

  const skills = profile.skills.map((skill: String, index: number) => {
    return (
      <span key={index} style={{ display: 'inline' }}> <Badge color="primary">{skill}</Badge></span>
    )
  })

  //TODO move to the backend and generate it when profile is created to improve performance
  const options = {
    margin: 0.2,                              // 20% margin
    size: 100,                                // 420px square
    format: 'svg'                             // use SVG instead of PNG
  };
  var avatarSvg = new Identicon(md5(profile.alias), options).toString();

  return (
    <ProfileCard className="text-center">
      <ProfileCardHeader>
        <img width="100" height="100" src={`data:image/svg+xml;base64,${avatarSvg}`} alt="avatar" />
      </ProfileCardHeader>
      <CardBlock>
        <ProfileTitle>{profile.alias}</ProfileTitle>
        <ProfileCardDescription>{profile.description}</ProfileCardDescription>
        <CardText>
        </CardText>
        <CardText>
          {industries} {skills}
        </CardText>

        <Button color="secondary" onClick={handleClick(profile)}>{t('profile.full')}</Button>
      </CardBlock>
    </ProfileCard>
  )
}

const ProfileView: FunctionComponent<{ profile: Profile }> = (props) => {
  const { t } = useTranslation('translations', { i18n });
  const { profile } = props
  const skills = profile.skills.map((skill: any, index: number) => {
    return (
      <H6 key={index} style={{ display: 'inline' }}> <Badge>{skill}</Badge></H6>
    )
  })

  const industries = (profile.industries || []).map((industry: any, index: number) => {
    return (
      <H6 key={index} style={{ display: 'inline' }}> <Badge color="primary">{industry}</Badge></H6>
    )
  })

  return (
    <div style={{ textAlign: 'left' }}>
      <Button color="secondary">{t('buttons.back')}</Button>
      <H1 style={{ marginTop: '20px' }}>{profile.alias}</H1>
      <Row style={{ marginTop: '20px' }}>
        <Col xs={{ size: 2 }}>
          {t('profile.description')}
        </Col>
        <Col xs={{ size: 10 }}>
          {profile.description}
        </Col>
        <Col xs={{ size: 2 }}>
          {t('profile.linkedin')}
        </Col>
        <Col xs={{ size: 10 }}>
          {profile.linkedin}
        </Col>

        <Col xs={{ size: 2 }}>
          {t('profile.industry')}
        </Col>
        <Col xs={{ size: 10 }}>
          {industries}
        </Col>
        <Col xs={{ size: 2 }}>
          {t('profile.skills')}
        </Col>
        <Col xs={{ size: 10 }}>
          {skills}
        </Col>
      </Row>
    </div >
  )
}

const ProfilesComponent: FunctionComponent = (props) => {
  const { t } = useTranslation('translations', { i18n });
  const [currentProfile, setCurrentProfile] = useState<any>();
  const { user } = useAuth0() as any;
  //const dispatch = useDispatch()
  const [users, setUsers] = useState<ReadonlyArray<Profile>>([]);

  useEffect(() => {
    (async () => {
      const data = await api.getAllUsers() as any
      setUsers(data)
    })()
  }, [user.email]);

  //TODO move this to a profileDetailView const profileData = useSelector((state: ReduxState) => state)

  const handleClick = (profile: Profile) => (e: any) => {
    setCurrentProfile(profile)
  }

  /* TODO: move to profileview after select profile
     const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     evt.preventDefault();
     dispatch({ type: "PROFILE_VIEW", payload: profile })
     }
   */
  return currentProfile ? <ProfileView profile={currentProfile} /> : (
    <>
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon>@</InputGroupAddon>
                <Input id="alias" placeholder={t('search.placeholder')} type="alias" />
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Row>
        {
          users.map((profile: Profile, index: number) => {
            return (<Col sm={{ size: 3 }} key={index}><ProfilesOverview profile={profile} handleClick={handleClick} /></Col>)
          })
        }
      </Row>
    </>
  )
}

export default ProfilesComponent
