import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import { IndeterminateCheckBoxOutlined } from '@material-ui/icons';
import { FilledInput, Typography } from '@material-ui/core';

const Login = () => {

    const validationSchema = () => {
        return (
            yup.object({
                userName: yup.string().required("required"),
                password: yup.string().max(8, "password must be 8 characters and above").required("required"),
                phoneNumber: yup.number().positive().integer().min(10, 'enter number up to 10').required("enter phone number"),
                email: yup.string().email().required("enter valid email"),
                termsAndConditions: yup.boolean().required().isTrue('read and accept terms and conditions'),
            })
        )
    }

    const submit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    }


    return (
        <Formik
            initialValues={{
                userName: "",
                password: "",
                phoneNumber: "",
                email: "",
                termsAndConditions: false,
                donations: [{ donor: '', amount: 0, }],
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => {
                return (
                    <Form>
                        <Field
                            type="text"
                            name="userName"
                            values={values.userName}
                            onChange={handleChange}
                        />
                        {errors.userName && touched.userName ? <p>{errors.userName}</p> : ""}
                        <Field
                            type="text"
                            name="password"
                            values={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && touched.password ? <p>{errors.password}</p> : ""}
                        <Field
                            type="number"
                            name="phoneNumber"
                            values={values.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && touched.phoneNumber ? <p>{errors.phoneNumber}</p> : ""}
                        <Field
                            type="email"
                            name="email"
                            values={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && touched.email ? <p>{errors.email}</p> : ""}
                        <Field
                            name="termsAndConditions"
                            type="checkbox"
                            // values={values.termsAndConditions}
                            onChange={handleChange}
                        />
                        {errors.termsAndConditions && touched.termsAndConditions ? <p>{errors.termsAndConditions}</p> : ""}
                        <FieldArray name='donations'>
                            {({ push, remove }) => {
                                return (
                                    <React.Fragment>
                                        {values.donations.map((_, index) => {
                                            return (
                                                <div key={index}>
                                                    <Typography variant='body2'> Donations </Typography>
                                                    <Field
                                                        name={`donations.${index}.donor`}
                                                        labelTitle='donor'
                                                    />
                                                    <Field
                                                        name={`donations.${index}.amount`}
                                                        labelTitle='Amount'
                                                    />
                                                    {index ? (<button
                                                        onClick={() => {
                                                            remove(index);
                                                        }}
                                                    />) : null}

                                                    <button
                                                        onClick={() => {
                                                            push({
                                                                donor: '',
                                                                amount: 0,
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}


                                    </React.Fragment>
                                )

                            }}

                        </FieldArray>
                        <button
                            type='button'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </Form>
                )
            }}

        </Formik>
    )
}
export default Login;