import React, { useEffect, useState, FunctionComponent } from "react"
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select/creatable";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from '@bootstrap-styled/v4';
import { Profile } from '../reducers';
import api from '../utils/api'
import industries from '../data/industries'
import skills from '../data/skills'
import { useAuth0 } from "../auth/auth0";

import { FormContainer, LabelField } from './formStyles'
import { SmallHeader } from '../components/styles'

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

  useEffect(() => {
    (async () => {
      const data = await api.getUser(user.email) as any
      //console.log(data)
      setUserData(data)
    })()
  }, [user.email]);

  const initialValues = {
    alias: '',
    linkedin: '',
    email: '',
    skills: [],
    industries: [],
    description: '',
  }

  const [userData, setUserData] = useState<Profile>(initialValues);

  //TODO replace touched with loadig auth0 and db values
  const initialProfile: Profile = userData && userData.alias ? {
    ...userData,
    skills: ArrayToSelectOptions(userData.skills),
    industries: ArrayToSelectOptions(userData.industries)
  } : initialValues

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
    enableReinitialize: true,
    initialValues: initialProfile,
    onSubmit: profile => {
      // Make API request to create new profile
      const profileValues = {
        ...values,
        email: user.email,
        skills: (values.skills as any).map((s: SelectOption) => s.value),
        industries: (values.industries as any).map((i: SelectOption) => i.value),
      }

      console.log(userData)

      const action = userData && userData.alias ? 'updateUser' : 'createUser'

      api[action](profileValues, user.email).then((response: any) => {
        //TODO: add check if we want to
        //update the redux state: dispatch({ type: "UPDATE_PROFILE", payload: profileValues })

        //Set submit to true to redirect to profiles view
        setSubmit(true)
      }).catch((e: any) => {
        console.log('An API error occurred', e)
      })
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
              value={values.description}
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
            title="Industry"
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
