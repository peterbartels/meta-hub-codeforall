import React, { useCallback, useState, FunctionComponent } from "react"
import { useDispatch, useSelector } from 'react-redux'
import QrReader from 'react-qr-reader'
import styled, { Box } from '@xstyled/styled-components'

import {
  MainContainer,
  ScannerContainer,
  PrimaryButton,
  NumberInput,
  SmallHeader
} from '../components/styles'

import Modal from './modal';
import { State as ReduxState, Profile } from '../reducers';

export interface Props {
  isScanning?: boolean
}

const BoxHeader = styled(Box)`
  background: #414756;
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
  return (
    <Box row key={index}>
      {/*  mobile headers on the left side instead of the top */}
      <ResponsiveHeader isMobile={true}>Name</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.name}</Box>

      <ResponsiveHeader isMobile={true}>Email</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.email}</Box>

      <ResponsiveHeader isMobile={true}>Description</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.email}</Box>

    </Box>
  )
}

const ProfilesComponent: FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const profileData = useSelector((state: ReduxState) => state)
  const [refund, setRefund] = useState('100');

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch({ type: "ADD_PROFILE", payload: refund })
  }

  //Stop scanning modal
  const stopScan = useCallback(
    () => dispatch({ type: "STOP_ASK_PROFILE" }),
    [dispatch]
  )

  const scannerModal = (
    <ScannerContainer>
      <SmallHeader>Name and form</SmallHeader>
    </ScannerContainer>
  )

  //Modal is a React portal component, not rendered here but as a first child of the body component
  return (
    <>
      <Modal
        isShowing={profileData.scan}
        hide={stopScan}
        children={
          <MainContainer>
            {!profileData.profile && scannerModal}
          </MainContainer>
        }
      />

      {/* Box headers only for desktop */}
      <Box row>
        <ResponsiveHeader isMobile={false}>Name</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Email</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Description</ResponsiveHeader>
      </Box>

      {(profileData.profiles.map(profilesOverview))}
    </>
  )
}

export default ProfilesComponent
