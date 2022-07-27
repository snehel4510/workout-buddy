import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const WorkoutDetails = ({workout}) => {
    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span className="delete"><FaTrashAlt color="red"/></span>
            <span className="edit"><MdEdit /></span>
        </div>
     );
}
 
export default WorkoutDetails;