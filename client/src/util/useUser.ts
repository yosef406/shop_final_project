import { useDispatch, useSelector } from "react-redux";
import { getUserSignInState, getUserRole, getUser, addUser as addUserAction, removeUser as removeUserAction } from "../data/slices/userSlice";
import userType from "../types/userType";

export default function useUser() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const role = useSelector(getUserRole);
    const signedIn = useSelector(getUserSignInState);

    const addUser = (user: userType) =>
        dispatch(addUserAction(user));

    const removeUser = () => dispatch(removeUserAction());

    return { user, role, signedIn, addUser, removeUser };
}