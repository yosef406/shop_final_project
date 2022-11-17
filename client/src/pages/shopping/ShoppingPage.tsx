import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../data/slices/userSlice";

function ShoppingPage() {
  const user = useSelector(getUser);
  if (!user.signedIn) return <Navigate to="/login" />;
  return <></>;
}

export default ShoppingPage;
