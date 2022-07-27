import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()

    const [title , setTitle] = useState('');
    const [load , setLoad] = useState('');
    const [reps , setReps] = useState('');
    const [error , setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, load, reps};
        const response = await fetch('/api/workouts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        });
        const data = await response.json();
        if(response.ok){
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            // console.log('new workout added',data);
            dispatch({type: "CREATE_WORKOUT", payload: data});
        } else {
            setError(data.error);
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Exercize title : </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Repetitions : </label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)}/>
            <label>Load(in Kg) : </label>
            <input type="number" value={load} onChange={(e) => setLoad(e.target.value)}/>
            <button>Add workout</button>
            {error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default WorkoutForm;