import React, { FormEvent, useCallback, useState, FunctionComponent } from "react"
import { useDispatch, useSelector } from 'react-redux'
import styled, { Box } from '@xstyled/styled-components'
import { render } from "react-dom";
import { withFormik, useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Option,
  Button,
} from '@bootstrap-styled/v4';

import { FormContainer, LabelField, InputField, TextAreaField } from './formStyles'
import {
  MainContainer,
  EditProfileContainer,
  PrimaryButton,
  NumberInput,
  SmallHeader
} from '../components/styles'

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
    <FormContainer>
      <SmallHeader>Your profile</SmallHeader>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <SmallHeader>Your information</SmallHeader>
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
        </FormGroup>
        <FormGroup>
          <LabelField htmlFor="email" style={{ display: "block" }}>
            Email
          </LabelField>
          <Input
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
        <MySelect
          value={values.skills}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.skills}
          touched={touched.skills}
        />
        <Button color="primary" type="submit">Submit</Button>
      </Form>

      {/*<form onSubmit={handleSubmit} >
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
          <button type="submit" disabled={isSubmitting}>
          Save my information
          </button>

          </form > */}
    </FormContainer >
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


const MyProfile: FunctionComponent = () => (
  <EditProfileForm />
)

export default MyProfile
