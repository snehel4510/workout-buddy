import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutsContext();

    const logout = () => {
        // remove user form the local storage
        localStorage.removeItem('user');
        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
        // dispatch clear workouts action
        workoutDispatch({ type: 'SET_WORKOUTS', payload: null });
    }
    return { logout }
}