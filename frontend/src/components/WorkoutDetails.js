import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext();

    const handleClick = async () => {
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
            <p>{workout.createdAt}</p>
            <span onClick={handleClick} className="delete"><FaTrashAlt color="red"/></span>
            <span className="edit"><MdEdit /></span>
        </div>
     );
}
 
export default WorkoutDetails;