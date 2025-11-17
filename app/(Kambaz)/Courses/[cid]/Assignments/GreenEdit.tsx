import { FiEdit } from "react-icons/fi";

export default function GreenEdit() {
    return (
        <span className="me-1 position-relative">
            <FiEdit style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
        </span>
    );
}