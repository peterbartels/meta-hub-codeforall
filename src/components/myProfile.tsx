import React, { useState, FunctionComponent } from "react"
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select/creatable";
import { Redirect } from "react-router-dom";
import { Profile } from '../reducers';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from '@bootstrap-styled/v4';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import api from '../utils/api'
import industries from '../data/industries'
import skills from '../data/skills'
import { useAuth0 } from "../auth/auth0";

import { FormContainer, LabelField } from './formStyles'
import { SmallHeader } from '../components/styles'

/*
   mutation PostMutation($description: String!, $url: String!) {
   post(description: $description, url: $url) {
   id
   createdAt
   url
   description
   }

   mutation CreateAProfile(
   $alias: String!, 
   $description: String!, 
   $email: String!,
   $skills: [String!]!
   $categories: [String] 
   ){
   createProfile(
   $alias: String!, 
   $description: String!, 
   $email: String!,
   $skills: [String!]!
   $categories: [String]
   ){
   id
   alias
   email
   description
   skills
   categories
   }
   }
   }*/

const ADD_PROFILE = gql`
  input Tag {
    value: String!
    label: String!
  }
  
  mutation CreateAProfile(
    $alias: String!, 
    $description: String!, 
    $email: String!,
    $skills: [Tag]!
    $categories: [Tag]
  ) {
    createProfile(
      alias: $alias,
      description: $description,
      email: $email,
      skills: $skills,
      categories: $categories
    ) {
      alias
    }
  }
`;

type SelectOption = {
  value: string,
  label: string
}

const ArrayToSelectOptions = (arr: ReadonlyArray<string>) =>
  arr
    .map((item: string): SelectOption =>
      ({
        value: item,
        label: item
      }))

const EditProfileForm = () => {

  const { user } = useAuth0() as any;
  const dispatch = useDispatch()
  const [submit, setSubmit] = useState(false)
  const [addProfile,] = useMutation(ADD_PROFILE);

  const inititialValues = {
    alias: '',
    linkedin: '',
    email: '',
    skills: [],
    industries: [],
    description: '',
  }

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      alias: Yup.string()
        .required("Alias is required!"),
      industries: Yup.array()
        .min(1, "Pick at least 1 industry")
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required()
          })
        )
    }),
    initialValues: inititialValues,
    onSubmit: profile => {

      const profileValues = {
        ...values,
        skills: values.skills.map((s: SelectOption) => s.value),
        industries: values.industries.map((i: SelectOption) => i.value),
      }

      addProfile({ variables: profileValues });
      setSubmit(true)
      /*
         api.create(values).then((response: any) => {
         dispatch({ type: "UPDATE_PROFILE", payload: values })
         }).catch((e: any) => {
         console.log('An API error occurred', e)
         })*/
    },
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = formik;

  return (
    <>
      {submit && <Redirect to="/profiles" />}
      <FormContainer>
        <SmallHeader>Your profile</SmallHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <LabelField htmlFor="alias" style={{ display: "block" }}>
              Alias
            </LabelField>
            <Input
              id="alias"
              placeholder="Enter your alias"
              type="alias"
              value={values.alias}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.alias && touched.alias && (
              <div style={{ color: "red", marginTop: ".5rem" }}>{errors.alias}</div>
            )}
          </FormGroup>
          <FormGroup>
            <LabelField htmlFor="email" style={{ display: "block" }}>
              Email
            </LabelField>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              disabled
              value={user.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <div style={{ color: "red", marginTop: ".5rem" }}>{errors.email}</div>
            )}
          </FormGroup>
          <FormGroup>
            <LabelField htmlFor="LinkedIn" style={{ display: "block" }}>
              Linkedin
            </LabelField>
            <Input
              id="linkedin"
              placeholder="Enter your LinkedIn"
              type="LinkedIn"
              value={values.linkedin}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup controlId="formDescription">
            <Label htmlFor="inline-form-input">Description</Label>
            <Input
              type="textarea"
              className="form-control"
              id="description"
              rows={15}
              cols={40}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <TagSelect
            value={values.industries}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.industries}
            options={ArrayToSelectOptions(industries)}
            touched={touched.industries}
            name="industries"
            title="Industries"
          />
          <TagSelect
            value={values.skills}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.skills}
            options={ArrayToSelectOptions(skills)}
            touched={touched.skills}
            name="skills"
            title="Skills"
          />
          <Button color="primary" type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </>
  );
};

class TagSelect extends React.Component<any> {
  handleChange = (value: any) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <LabelField htmlFor="skills">{this.props.title}</LabelField>
        <Select
          id="skills"
          options={this.props.options}
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


const MyProfile: FunctionComponent = () => (
  <EditProfileForm />
)

export default MyProfile
