import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import React from "react";
import FormControlInput from "../FormControlInput";

const CustomInput = React.forwardRef((props, ref) => {
  return <FormControlInput {...props} autoComplete="off" />;
});

const FormControlDatePicker = (props: ReactDatePickerProps) => {
  return (
    <DatePicker
      wrapperClassName="form-control-date-picker-wrapper"
      customInput={<CustomInput />}
      {...props}
    />
  );
};

export default FormControlDatePicker;
