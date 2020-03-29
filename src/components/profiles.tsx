import React, { FormEvent, useCallback, useState, FunctionComponent } from "react"
import { useDispatch, useSelector } from 'react-redux'
import styled, { Box } from '@xstyled/styled-components'
import { render } from "react-dom";
import { withFormik, useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { LabelField, InputField, TextAreaField } from './formStyles'

import {
  MainContainer,
  EditProfileContainer,
  PrimaryButton,
  NumberInput,
  SmallHeader
} from '../components/styles'

import Modal from './modal';
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
    background-color:#606fc8;
    font-size:3rem;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
  `


  const skills = profile.skills.map((s: any) => s.label).join(', ')

  return (
    <Box row key={index}>
      {/*  mobile headers on the left side instead of the top */}

      <ResponsiveHeader isMobile={true}>&nbsp;</ResponsiveHeader>
      <Box px={10} m={2} col><Avatar>{firstLetter}{secondLetter}</Avatar></Box>

      <ResponsiveHeader isMobile={true}>Alias</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.alias}</Box>

      <ResponsiveHeader isMobile={true}>Contact</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.email}</Box>

      <ResponsiveHeader isMobile={true}>Description</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.description}</Box>

      <ResponsiveHeader isMobile={true}>Skills</ResponsiveHeader>
      <Box px={10} m={2} col>{skills}</Box>
    </Box>
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

  //Stop scanning modal
  const stopEditProfile = useCallback(
    () => dispatch({ type: "CANCEL_EDIT_PROFILE" }),
    [dispatch]
  )


  //Modal is a React portal component, not rendered here but as a first child of the body component
  return (
    <>
      {/* Box headers only for desktop */}
      <Box row>
        <Box px={10} m={2} col display={{ xs: 'none', sm: 'none', md: 'block', 'lg': 'block', xl: 'block' }}>&nbsp;</Box>
        <ResponsiveHeader isMobile={false}>Name</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Contact</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Description</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Skills</ResponsiveHeader>
      </Box>

      {(profiles.map(profilesOverview))}
    </>
  )
}

export default ProfilesComponent
