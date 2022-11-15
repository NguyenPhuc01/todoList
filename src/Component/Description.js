import React from 'react';

const Description = (props) => {
    return (
        <div>
            <div>
                <p className={props.textDescription}>
                    Description
                </p>
            </div>
            <div className={props.textareaDescription}>
                <textarea placeholder={props.placeholder}
                    defaultValue={props.defaultValue}

                    onChange={props.onChange}
                >

                </textarea>
            </div>
        </div>
    );
};

export default Description;