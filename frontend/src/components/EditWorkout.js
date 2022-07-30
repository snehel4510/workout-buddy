import { useState } from 'react';
import Modal from 'react-modal'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { GiCancel } from "react-icons/gi";

const EditWorkout = ({ workout, Open, onClose }) => {

    const { dispatch } = useWorkoutsContext();

    const [title , setTitle] = useState(workout.title);
    const [load , setLoad] = useState(workout.load);
    const [reps , setReps] = useState(workout.reps);
    const [error , setError] = useState(null);

    const handleEdit = async (e) => {
        e.preventDefault();
        const Eworkout = {title, load, reps};
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Eworkout)
        });
        const data = await response.json();
        if(response.ok){
            setTitle(data.title);
            setLoad(data.load);
            setReps(data.reps);
            setError(null);
            // console.log('workout updated',data);
            dispatch({type: "UPDATE_WORKOUT", payload: data});
        } else {
            setError(data.error);
        }
        onClose()
    }

    return ( 
        <div className="modal">
                <Modal isOpen={Open}>
                    <form className="create" onSubmit={handleEdit}>
                        <h3>Edit workout</h3>
                        <label>Exercize title : </label>
                        <input type="text"
                        value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Repetitions : </label>
                        <input type="number"
                        value={reps} onChange={(e) => setReps(e.target.value)}/>
                        <label>Load(in Kg) : </label>
                        <input type="number"
                        value={load} onChange={(e) => setLoad(e.target.value)}/>
                        <button>Edit workout</button>
                        {error && <div className="error">{error}</div> }
                    </form>
                    <span onClick={onClose}><GiCancel /></span>
                </Modal>
            </div>
     );
}
 
export default EditWorkout;