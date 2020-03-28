import React, { useCallback, useState, FunctionComponent } from "react"
import { useDispatch, useSelector } from 'react-redux'
import styled, { Box } from '@xstyled/styled-components'
import { render } from "react-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

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

      <ResponsiveHeader isMobile={true}>Avatar</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.avatar}</Box>

      <ResponsiveHeader isMobile={true}>Name</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.name}</Box>

      <ResponsiveHeader isMobile={true}>Contact</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.contact}</Box>

      <ResponsiveHeader isMobile={true}>Description</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.description}</Box>

      <ResponsiveHeader isMobile={true}>Tags</ResponsiveHeader>
      <Box px={10} m={2} col>{profile.tags}</Box>

    </Box>
  )
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    skills: Yup.array()
      .min(1, "Pick at least 1 tag")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
  }),
  mapPropsToValues: props => ({
    email: "",
    skills: []
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      skills: values.skills.map((t: any) => t.value)
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const MyForm = (props: any) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting
  } = props;
  return (

    <form onSubmit={handleSubmit}>
      <SmallHeader>Your information:</SmallHeader>
      <SmallHeader>Nickname</SmallHeader>
      <label htmlFor="nickname" style={{ display: "block" }}>
        Email
      </label>
      <input
        id="nickname"
        placeholder="Enter your nickname"
        type="nickname"
        value={values.nickname}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SmallHeader>LinkedIn</SmallHeader>
      <label htmlFor="LinkedIn" style={{ display: "block" }}>
        Email
      </label>
      <input
        id="LinkedIn"
        placeholder="Enter your LinkedIn"
        type="LinkedIn"
        value={values.linkedin}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <SmallHeader>Email</SmallHeader>
      <label htmlFor="email" style={{ display: "block" }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{errors.email}</div>
      )}
      <SmallHeader>Description of your work</SmallHeader>
      <label htmlFor="description" style={{ display: "block" }}>
        Description
      </label>
      <textarea
        id="descrtiption"
        placeholder="Enter your description"
        onChange={handleChange}
        onBlur={handleBlur}
      >{values.description}
      </textarea>
      <SmallHeader>Category</SmallHeader>
      <label htmlFor="category" style={{ display: "block" }}>
        Email
        </label>
      <input
        id="category"
        placeholder="Enter your category"
        type="category"
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <SmallHeader>Skills</SmallHeader>
      <MySelect
        value={values.skills}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.skills}
        touched={touched.skills}
      />
      {/* TODO: I don't think we need a reset button
        <button
          type="button"
          className="outline"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>*/}
      <button type="submit" disabled={isSubmitting}>
        Save my information
        </button>

    </form>
  );
};

const options = [
  { value: "Technical", label: "Technical" },
  { value: "Medical", label: "Medical" },
  { value: "Government", label: "Government" },
];

class MySelect extends React.Component<any> {
  handleChange = (value: any) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("skills", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("skills", true);
  };

  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="skills">Skills</label>
        <Select
          id="skills"
          options={options}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);

const ProfilesComponent: FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const profileData = useSelector((state: ReduxState) => state)
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


  const editProfileModal = (
    <EditProfileContainer>
      <MyEnhancedForm />
    </EditProfileContainer>
  )

  //Modal is a React portal component, not rendered here but as a first child of the body component
  return (
    <>
      <Modal
        isShowing={profileData.editProfile}
        hide={stopEditProfile}
        children={
          <MainContainer>
            {!profileData.profile && editProfileModal}
          </MainContainer>
        }
      />

      {/* Box headers only for desktop */}
      <Box row>
        <ResponsiveHeader isMobile={false}>Avatar</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Name</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Contact</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Description</ResponsiveHeader>
        <ResponsiveHeader isMobile={false}>Tags</ResponsiveHeader>
      </Box>

      {(profileData.profiles.map(profilesOverview))}
    </>
  )
}

export default ProfilesComponent
