import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import { IndeterminateCheckBoxOutlined } from '@material-ui/icons';
import { FilledInput, Typography } from '@material-ui/core';
import InputField from './components';
import Modal from './components/modal';

const Login = () => {
    const [visible, setVisible] = useState(true);

    const validationSchema = () => {
        return (
            yup.object({
                userName: yup.string().required("User name is required"),
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
        <>
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
                        {/* <Field
                            type="text"
                            name="userName"
                            values={values.userName}
                            onChange={handleChange}
                        />
                        {errors.userName && touched.userName ? <p style={{
                            color: 'red'
                        }} >{errors.userName}</p> : ""} */}

                        <InputField
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            error={touched.password && errors.password}
                        />
                   
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
                            // onClick={handleSubmit}
                            onClick={() => {
                                setVisible(true)
                            }}
                        >
                            Submit
                        </button>
                    </Form>
                )
            }}

        </Formik>


        <Modal 
            visible={visible}
            onClose={() => {
                setVisible(false)
            }}
        >
            <div>
                Hello, You are welcome
            </div>
        </Modal>
     </>
    )
}
export default Login;