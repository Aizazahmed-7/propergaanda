import { useState } from 'react';
import './Popup.css';

const PopupWithButtons = (props) => {
    console.log(props);
  const [isOpen, setIsOpen] = useState(props.isOpen);

  function handleOpenPopup() {
    setIsOpen(true);
  }

  function handleClosePopup() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="popup">
          <h2>Are you sure you want to delete this blog?</h2>
          <p>Pressing confirm will permanantly delete this blog</p>
          <button onClick={props.onConfirm}>Confirm</button>
          <button onClick={props.onCancel}>Cancel</button>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </>
  );
}

export default PopupWithButtons;