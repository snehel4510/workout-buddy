import { useAuthContext } from "./useAuthContext";

export const useLogut = () => {

    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove user form the local storage
        localStorage.removeItem('user');
        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
    }
    return { logout }
}