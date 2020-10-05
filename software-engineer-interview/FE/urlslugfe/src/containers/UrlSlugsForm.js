import React from 'react';
import Form from '../components/form/Form';
import './UrlSlugsForm.css'

const UrlSlugsForm = ({
    submitHandler
}) =>
    <Form
        formKey="urlSlugsForm"
        inputs={[
            { id: "url", type: "url", label: "URL" },
            { id: "description", type: "text", label: "Description" }
        ]}
        submit={submitHandler}
    >
        Slugs Form
    </Form>;

export default UrlSlugsForm;