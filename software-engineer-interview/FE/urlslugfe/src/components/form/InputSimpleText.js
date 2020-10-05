import React from 'react';
import Input from './Input';

const InputSimpleText = ({
    className = "",
    defaultValue,
    label,
    onChange,
    validator = value => {
      if (!value || value.trim() === "")
        return "This value is required";
    },
    setValue
}) => <Input
        className={"input-simple-text " + className}
        type="text"
        defaultValue={defaultValue}
        label={label}
        onChange={onChange}
        validator={validator}
        setValue={setValue}
      />;

export default InputSimpleText;