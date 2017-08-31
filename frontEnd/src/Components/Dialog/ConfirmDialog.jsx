import React from 'react';

const confirmDialog = ({ text = '', action = () => {}, closeDialog = () => {}}) => (
    <div>
        <div className="full-layout" onClick={closeDialog}></div>
        <div className="dialog">
            <p className="dialog__title dialog--margin-bottom">{text}</p>
            <button className="dialog__submit" onClick={action}>OK</button>
            <button className="dialog__submit dialog--margin-right" onClick={closeDialog}>Close</button>
        </div>
    </div>
)   

export default confirmDialog;