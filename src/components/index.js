import React, { Fragment, memo } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const props = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.string,
    onChange: PropTypes.func
}

const defaultProps = {
    type: 'text',
    name: '',
    value: '',
    error: '',
    onChange: () => {}
}

const InputField = ({
    type,
    name,
    value,
    onChange,
    error,
    ...props
}) => {

    return (
        <Fragment>
            <Field
                {...props}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="border-green border-2 rounded"
            />
            {error? <p className='text-lime-500 underline'>{error}</p> : ""}
        </Fragment>  
    )
}

InputField.props = props;

InputField.defaultProps = defaultProps;

export default memo(InputField);