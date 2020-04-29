import React from 'react';

const FetchError = ({err: {name, message}}) => <div className="field-error">{`${name} - ${message}`}</div>;

export {FetchError};
