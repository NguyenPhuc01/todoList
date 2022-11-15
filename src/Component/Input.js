import React from 'react';

const Input = (props) => {
    return (
        <div>
            <input type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required
                ref={props.ref}
     
            />
        </div>
    );
};

export default Input;