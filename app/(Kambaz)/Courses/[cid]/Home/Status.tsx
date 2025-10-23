import { Button } from "react-bootstrap";
import { BiImport } from "react-icons/bi";
import { FaCheckCircle, FaRegCalendarAlt } from "react-icons/fa";
import { LiaFileImportSolid } from "react-icons/lia";
import { MdDoNotDisturbAlt, MdOutlineAnnouncement, MdOutlineImportContacts } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50 pe-1">
          <Button variant="success" size="lg" className="w-100 text-nowrap">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>
      <br />
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <MdOutlineImportContacts className="me-2 fs-5" />
        Choose from Home Page
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <RiBarChartFill className="me-2 fs-5" />
        View Course Analytics
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <MdOutlineAnnouncement className="me-2 fs-5" />
        New Announcement
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <FaRegCalendarAlt className="me-2 fs-5" />
        Course Calendar
      </Button>
    </div>
  );
}
