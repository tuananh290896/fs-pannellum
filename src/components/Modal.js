import React, {useState} from "react";
import Popup from "reactjs-popup";

const Modal = props => {
    const { open, data: { title, content } } = props;
    console.log(title);
    return (
        <Popup
            open={open}
            closeOnDocumentClick={false}
            onClose={() => props.action(false)}
        >
            <div className="modal">
                <div className="modal-header"> 
                    {title} 
                    <a className="close" onClick={() => props.action(false)}>
                        &times;
                    </a>
                </div>
                <div className="modal-content"> {content} </div>
            </div>
        </Popup>
      );
}

export default Modal;