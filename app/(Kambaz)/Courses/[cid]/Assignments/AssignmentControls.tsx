import { Button, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";

export default function AssignmentControls() {
  return (
    <div id="wd-assignment-controls" className="d-flex text-nowrap">
      <div className="me-auto">
        <div className="position-relative">
            <GoSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 fs-5" />
            <FormControl type="text" size="lg" placeholder="Search..." className="ps-5" />
        </div>
      </div>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-assignemnt-group-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
    </div>
  );
}
