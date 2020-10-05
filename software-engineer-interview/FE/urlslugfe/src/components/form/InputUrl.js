import React from 'react';
import InputSimpleText from './InputSimpleText';

const InputUrl = ({
    className = "",
    defaultValue,
    label,
    onChange,
    validator = value => {
      if (!value || value.trim() === "")
        return "This value is required";

      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value))
        return "This is an invalid URL";
    },
    setValue
}) => <InputSimpleText
        className={"input-url " + className}
        defaultValue={defaultValue}
        label={label}
        onChange={onChange}
        validator={validator}
        setValue={setValue}
      />;
      

export default InputUrl;