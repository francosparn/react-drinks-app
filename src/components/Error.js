import React from 'react';

const Error = ({ message }) => {
    return ( 
        <p className="alert alert-danger">{ message }</p>
     );
}
 
export default Error;