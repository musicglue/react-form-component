import React from 'react';
import InputField from './InputField';

export default function CheckboxField(props) {
  return <InputField {...props} type="checkbox" valueAttr="checked" />;
}
