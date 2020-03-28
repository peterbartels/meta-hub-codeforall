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

const formik = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    skills: Yup.array()
      .min(1, "Pick at least 1 skill")
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
  // @ts-ignore
  handleSubmit: (values, { setSubmitting }, b): any => {
    const payload = {
      ...values,
      skills: values.skills.map((t: any) => t.value).join(',')
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      //dispatch({ type: "EDIT_PROFILE", payload })
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});


const EditProfileForm = () => {

  const dispatch = useDispatch()


  const formik = useFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      skills: Yup.array()
        .min(1, "Pick at least 1 skill")
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required()
          })
        )
    }),
    initialValues: {
      alias: '',
      linkedin: '',
      email: '',
      skills: [],
      description: '',
      category: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      dispatch({ type: "UPDATE_PROFILE", payload: values })
    },
  });

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
  } = formik;

  return (

    <form onSubmit={handleSubmit} >
      <SmallHeader>Your information</SmallHeader>
      <LabelField htmlFor="alias" style={{ display: "block" }}>
        Alias
      </LabelField>
      <input
        id="alias"
        placeholder="Enter your alias"
        type="alias"
        value={values.alias}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <LabelField htmlFor="LinkedIn" style={{ display: "block" }}>
        Linkedin
      </LabelField>
      <input
        id="LinkedIn"
        placeholder="Enter your LinkedIn"
        type="LinkedIn"
        value={values.linkedin}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <LabelField htmlFor="email" style={{ display: "block" }}>
        Email
      </LabelField>
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
      )
      }
      <LabelField htmlFor="description" style={{ display: "block" }}>
        Description
      </LabelField>
      <TextAreaField
        id="description"
        rows={15}
        cols={40}
        onChange={handleChange}
        onBlur={handleBlur}
      >{values.description}
      </TextAreaField>
      <LabelField htmlFor="category" style={{ display: "block" }}>
        Category
      </LabelField>
      <input
        id="category"
        placeholder="Select a category"
        type="category"
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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

    </form >
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
        <LabelField htmlFor="skills">Skills</LabelField>
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


  const editProfileModal = (
    <EditProfileContainer>
      <EditProfileForm />
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
