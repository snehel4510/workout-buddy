import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import EditWorkout from "./EditWorkout";
import Modal from 'react-modal';
import { useState } from "react";

const WorkoutDetails = ({workout}) => {

    const [isOpen, setIsOpen] = useState(false)
    const { dispatch } = useWorkoutsContext();

    const handleDelete = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        if(response.ok){
            // console.log("Workout deleted", data);
            dispatch({type: 'DELETE_WORKOUT', payload: data});
        }
    }

    


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
        setIsOpen(false)
    }

    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleDelete} className="delete"><FaTrashAlt color="red"/></span>
            <span onClick={() => setIsOpen(true)} className="edit"><MdEdit /></span>
            {/* <EditWorkout workout={workout} isOpen={isOpen} /> */}
            <div className="modal">
                <Modal isOpen={isOpen}>
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
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </Modal>
            </div>
        </div>
     );
}
 
export default WorkoutDetails;