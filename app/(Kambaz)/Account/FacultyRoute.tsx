import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function FacultyRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    if ((currentUser as any)?.role === "FACULTY") {

        return children;
    } else {
        return;
    }
}