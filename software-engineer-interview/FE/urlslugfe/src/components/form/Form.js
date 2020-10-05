import React, { useState } from 'react';
import InputSimpleText from './InputSimpleText';
import InputUrl from './InputUrl';

const inputsComponents = {
    text: InputSimpleText,
    url: InputUrl
}

const Form = ({
    className = "",
    formKey = "formKey",
    inputs,
    submit,
    children
}) => {
    const [inputsInfo, setInputsInfo] = useState(null);
    const [submitEnabled, setSubmitEnabled] = useState(false);

    // Do not render a thing if no inputs exists
    if (!inputs) return null;

    if (inputsInfo === null) {
        // Initialize the form data state
        setInputsInfo(inputs.map(({id}, index) =>
            ({
                isValid: false,
                value: null,
                id: id,
                initialized: false
            })
        ));
    }

    // Field changed handler
    const setValueHandler = (index, value, isValid) => {

        // If valid flag has changed, then update flag and value
        if (inputsInfo[index].isValid !== isValid) {

            // clone the data to set the new state
            const newInputsInfo = inputsInfo[index].initialized ?
                inputsInfo.map((inputsInfo, i) =>
                    i === index ?
                        {...inputsInfo, isValid, value} :
                        {...inputsInfo}
                ) : (
                    inputsInfo[index].isValid = isValid,
                    inputsInfo[index].value = value,
                    inputsInfo[index].initialized = true,
                    inputsInfo
                );
            setInputsInfo(newInputsInfo);

            // Update submit enabled
            const newSubmitEnabled = newInputsInfo.reduce((allValid, fieldInfo) => allValid && fieldInfo.isValid, true);

            if (submitEnabled !== newSubmitEnabled)
                setSubmitEnabled(newSubmitEnabled);
        } else { // if flag has not changed, then update just the value
            setInputsInfo(
                inputsInfo.map((inputsInfo, i) =>
                    i === index ?
                        {...inputsInfo, value} :
                        {...inputsInfo}
            ));
        }
    }

    // Collect the values and excecute the submit callback
    const submitHandler = event => {
        event.preventDefault();

        if (submit) {
            submit(inputsInfo.reduce((result, {id, value}) => ({...result, [id]: value}), {}));
        }
    };

    return  <form className={"form " + className} onSubmit={submitHandler}>
                <h2 className="form-caption">{children}</h2>
                {
                    inputs.map(({type, ...props}, index) => {
                        const key = formKey + index;

                        // Select the react component based on the input's type
                        const InputComponent = inputsComponents[type];

                        return  InputComponent ?
                                    <InputComponent
                                        key={key}
                                        setValue={(value, isValid) => setValueHandler(index, value, isValid)}
                                        {...props}
                                    />
                                : null;
                    })
                }
                {
                    <input className="submit" type="submit" value="Submit" disabled={!submitEnabled} />
                }
            </form>;
};

export default Form;