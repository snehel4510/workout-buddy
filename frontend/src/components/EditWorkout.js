import { useState } from 'react';
import Modal from 'react-modal'

const EditWorkout = ({ workout, isOpen }) => {

    const [open, setOpen] = useState(isOpen)

    return ( 
        <div className="modal">
            <Modal isOpen={open}>
                <h3>Edit workout</h3>
                <p>please enter the following fields</p>
                <button onClick={() => setOpen(false)}>Close</button>
            </Modal>
        </div>
     );
}
 
export default EditWorkout;