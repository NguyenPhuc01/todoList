import React from 'react';

const BulkAcion = props => {
  return (
    <div>
      <div className={props.done}>
        <div className={props.check}>
          <span className={props.bulkAction}>Bulk Action</span>
        </div>
        <div>
          <button className={props.btnDoneBulk}>Done</button>
          <button className={props.btnRemoveBulk} onClick={props.handleDeteteCheck}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkAcion;
