import React, { PropTypes } from 'react';

function getValidationState(map, state) {
  const creator = map[state.name];
  return creator ? creator(state[0]) : null;
}

function renderValidationMessage(validationState) {
  return getValidationState({
    failure: (errors) => <span className="mg-form-message-error">{errors.join(', ')}</span>,
    validating: () => <span className="mg-form-validation-active" />,
    neutral: () => <span className="mg-form-validation-neutral" />,
  }, validationState);
}

function renderLabel(label, validationState, targetId) {
  return label
    ? (
    <label className="mg-form-label" htmlFor={targetId} >
      {label}
      {renderValidationMessage(validationState)}
    </label>
    )
    : null;
}

export default function Field({ children, label, state, targetId }) {
  return (
    <fieldset className="mg-form-fieldset">
      {renderLabel(label, state, targetId)}
      {children}
    </fieldset>
  );
}

Field.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  state: PropTypes.object.isRequired,
  targetId: PropTypes.string.isRequired,
};
