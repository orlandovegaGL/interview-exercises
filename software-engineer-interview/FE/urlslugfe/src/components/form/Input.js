import React, { useState, useEffect } from 'react';

const Input = ({
    className = "",
    type,
    defaultValue,
    label,
    onChange,
    validator,
    setValue
}) => {
    const [validationMessage, setValidationMessage] = useState(false);

    // Apply input validations
    const setValueHandler = value => {
        if (validator && setValue) {
            const validation = validator(value);
            setValidationMessage(validation);
            setValue(value, validation == null);
        }
    }

    useEffect(() => {
        // Initialize the valid value
        setValueHandler(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return  <div className={"input " + className}>
                {<span className="label">{label}:</span>}
                <input
                    type={type}
                    defaultValue={defaultValue}
                    onChange={
                        event => {
                            setValueHandler(event.target.value);

                            if (onChange)
                                onChange(event);
                        }
                    }
                />
                {<span className="invalid-alert">{validationMessage}</span>}
            </div>;
};

export default Input;