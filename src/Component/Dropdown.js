import React from 'react';

const Dropdown = (props) => {
    return (
        <div>
            <form >
                <select name="piority" id="piority"
                    className={props.selectPiority}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                >
                    <option value="normal " >normal </option>
                    <option value="low">low</option>
                    <option value="high">high</option>
                </select>

            </form>
        </div>
    );
};

export default Dropdown;