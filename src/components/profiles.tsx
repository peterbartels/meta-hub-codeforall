import React, { FormEvent, useCallback, useState, FunctionComponent } from "react"
import { useDispatch, useSelector } from 'react-redux'
import styled, { Box } from '@xstyled/styled-components'
import { render } from "react-dom";
import { withFormik, useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
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

export interface Props {

}

const BoxHeader = styled(Box)`
  background: #606fc8;
  color:white;
  padding:5px;
`

export const ResponsiveHeader = ({ isMobile, children }: { isMobile: boolean, children: React.ReactNode }) => {
  return isMobile ?
    <BoxHeader px={10} m={2} col={1 / 2} display={{ xs: 'block', sm: 'block', md: 'none', 'lg': 'none', xl: 'none' }}>{children}</BoxHeader>
    :
    <BoxHeader px={10} m={2} col display={{ xs: 'none', sm: 'none', md: 'block', 'lg': 'block', xl: 'block' }}>{children}</BoxHeader>
}

const profilesOverview = (profile: Profile, index: number) => {
  const [firstLetter, secondLetter] = profile.alias.split(' ').map(s => s.split('')[0])

  const Avatar = styled.div`
    border-radius:50%;
    width:100px;
    height:100px;
    background:url(http://placebeard.it/100*100);
    filter: blur(2px);
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

  const skills = profile.skills.map((s: any) => s.label).join(', ')

  return (

    <Row>
      <Col sm={{ size: 3 }}>
        {/*  mobile headers on the left side instead of the top */}
        <ProfileCard className="text-center">
          <ProfileCardHeader><Avatar /></ProfileCardHeader>
          <CardBlock>
            <ProfileTitle><H3>{profile.alias}</H3></ProfileTitle>
            <ProfileCardDescription>{profile.description}</ProfileCardDescription>
            <CardText>
              {profile.skills.map((p: any) => {
                return (
                  <H6 style={{ display: 'inline' }}> <Badge>{p.label}</Badge></H6>
                )
              })}
            </CardText>
            <Button color="primary">Connect</Button>
          </CardBlock>
        </ProfileCard>
      </Col>
      <Col sm={{ size: 3 }}>
        {/*  mobile headers on the left side instead of the top */}
        <ProfileCard className="text-center">
          <ProfileCardHeader><Avatar /></ProfileCardHeader>
          <CardBlock>
            <ProfileTitle>{profile.alias}</ProfileTitle>
            <ProfileCardDescription>{profile.description}</ProfileCardDescription>
            <CardText>
              {profile.skills.map((p: any) => {
                return (
                  <H6 style={{ display: 'inline' }}> <Badge>{p.label}</Badge></H6>
                )
              })}

            </CardText>
            <Button color="primary">Connect</Button>
          </CardBlock>
        </ProfileCard>
      </Col>
      <Col sm={{ size: 3 }}>
        {/*  mobile headers on the left side instead of the top */}
        <ProfileCard className="text-center">
          <ProfileCardHeader><Avatar /></ProfileCardHeader>
          <CardBlock>
            <ProfileTitle>{profile.alias}</ProfileTitle>
            <ProfileCardDescription>{profile.description}</ProfileCardDescription>
            <CardText>
              {profile.skills.map((p: any) => {
                return (
                  <H6 style={{ display: 'inline' }}> <Badge>{p.label}</Badge></H6>
                )
              })}

            </CardText>
            <Button color="primary">Connect</Button>
          </CardBlock>
        </ProfileCard>
      </Col>
      <Col sm={{ size: 3 }}>
        {/*  mobile headers on the left side instead of the top */}
        <ProfileCard className="text-center">
          <ProfileCardHeader><Avatar /></ProfileCardHeader>
          <CardBlock>
            <ProfileTitle>{profile.alias}</ProfileTitle>
            <ProfileCardDescription>{profile.description}</ProfileCardDescription>
            <CardText>
              {profile.skills.map((p: any) => {
                return (
                  <H6 style={{ display: 'inline' }}> <Badge>{p.label}</Badge></H6>
                )
              })}

            </CardText>
            <Button color="primary">Connect</Button>
          </CardBlock>
        </ProfileCard>
      </Col>
      <Col sm={{ size: 3 }}>
        {/*  mobile headers on the left side instead of the top */}
        <ProfileCard className="text-center">
          <ProfileCardHeader><Avatar /></ProfileCardHeader>
          <CardBlock>
            <ProfileTitle>{profile.alias}</ProfileTitle>
            <ProfileCardDescription>{profile.description}</ProfileCardDescription>
            <Button color="primary">Connect</Button>
          </CardBlock>
        </ProfileCard>
      </Col>
    </Row >
  )
}

const ProfilesComponent: FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const profileData = useSelector((state: ReduxState) => state)

  const profiles = profileData.profiles.concat([{
    alias: 'djstomp',
    name: 'Derrick Stomp',
    contact: '',
    email: 'dstomp@appendee.com',
    description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis dui vitae erat rhoncus eleifend. Vestibulum faucibus faucibus lacus. Vivamus eget mollis elit. In tincidunt bibendum lacus tristique gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nunc neque, blandit et luctus eu, faucibus vitae nisl. Nam ultrices convallis accumsan. Proin ac augue neque. Nullam imperdiet quam sed sem dignissim at sagittis massa imperdiet. Phasellus ante enim, gravida id molestie nec, consectetur eu velit. Sed nibh sapien, tincidunt ut dictum quis, elementum dignissim massa. Suspendisse potenti.
    `,
    skills: [{ value: 'healthcare', label: 'healthcare' }, { value: 'physical therapy', label: 'physical therapy' }],
    avatar: ''
  }])

  const [profile, setProfile] = useState({});

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch({ type: "EDIT_PROFILE", payload: profile })
  }

  return (
    <>
      {(profiles.map(profilesOverview))}
    </>
  )
}

export default ProfilesComponent
