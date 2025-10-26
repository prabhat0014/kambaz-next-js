import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import FormLabel from "react-bootstrap/FormLabel";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end position-relative">
      <span>
        <FormLabel
          style={{ right: "50px", width: "130px", top: "-5px" }}
          className="position-absolute wd-assignment-percentage border rounded-4 fs-5 p-1"
        >
          40% of Total
        </FormLabel>
      </span>
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
