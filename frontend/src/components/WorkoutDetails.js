import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import EditWorkout from "./EditWorkout";
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

    

    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleDelete} className="delete"><FaTrashAlt color="red"/></span>
            <span onClick={() => setIsOpen(true)} className="edit"><MdEdit /></span>
            <EditWorkout workout={workout} Open={isOpen} onClose={() => setIsOpen(false)}/>
        </div>
     );
}
 
export default WorkoutDetails;