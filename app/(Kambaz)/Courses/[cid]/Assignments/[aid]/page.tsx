import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        <FormLabel htmlFor="wd-name"> Assignment Name </FormLabel>
        <Row className="mb-3">
          <Col>
            <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FormControl
              id="wd-description"
              as="textarea"
              rows={10}
              defaultValue="The assignment is available online
                                                Submit a link to the landing page of your Web application running on Netlify.
                                                The landing page should include the following:
                                                Your full name and section
                                                Links to each of the lab assignments
                                                Link to the Kanbas application
                                                Links to all relevant source code repositories
                                                The Kanbas application should include a link to navigate back to the landing page."
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel htmlFor="wd-points" column sm={{ span: 1, offset: 1 }}>
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl id="wd-points" type="number" defaultValue={100} />
          </Col>
        </Row>
        <Row className="mb-0">
          <FormLabel htmlFor="wd-group" column sm={{ span: 1, offset: 1 }}>
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-group">
              <option value="AS" defaultChecked>
                ASSIGNMENTS
              </option>
              <option value="QS">QUIZZES</option>
              <option value="ES">EXAMS</option>
              <option value="PRIJ">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-2">
          <FormLabel
            htmlFor="wd-display-grade-as"
            column
            sm={{ span: 1, offset: 1 }}
          >
            Display Grade as
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-display-grade-as">
              <option value="PERCENTAGE" defaultChecked>
                Percentage
              </option>
              <option value="POINT">Point</option>
              <option value="Letter">Letter</option>
            </FormSelect>
          </Col>
        </Row>
        <fieldset className="mb-3">
          <Row>
            <FormLabel
              htmlFor="wd-submission-type"
              column
              sm={{ span: 1, offset: 1 }}
            >
              Submission Type
            </FormLabel>
            <Col sm={10} className="wd-assignment-percentage p-3 rounded-2">
              <FormSelect id="wd-submission-type" className="mb-3 ms-1">
                <option value="ONLINE" defaultChecked>
                  Online
                </option>
                <option value="ONPAPER">On Paper</option>
              </FormSelect>
              <FormLabel>
                <b>Online Entry Options</b>
              </FormLabel>
              <FormCheck
                label="Test Entry"
                name="check-entry-option"
                id="wd-text-entry"
                className="mb-3"
              />
              <FormCheck
                label="Website URL"
                name="check-entry-option"
                id="wd-website-url"
                defaultChecked
                className="mb-3"
              />
              <FormCheck
                label="Media Recordings"
                name="check-entry-option"
                id="wd-media-recordings"
                className="mb-3"
              />
              <FormCheck
                label="Student Annotation"
                name="check-entry-option"
                id="wd-student-annotation"
                className="mb-3"
              />
              <FormCheck
                label="File Uploads"
                name="check-entry-option"
                id="wd-file-upload"
                className="mb-3"
              />
            </Col>
          </Row>
        </fieldset>
        <fieldset className="mb-5">
          <Row>
            <FormLabel column sm={{ span: 1, offset: 1 }}>
              Assign
            </FormLabel>
            <Col sm={10} className="wd-assignment-percentage p-3 rounded-2">
              <FormLabel htmlFor="wd-assign-to" className="mb-1">
                <b>Assign to</b>
              </FormLabel>
              <FormControl
                id="wd-assign-to"
                defaultValue="Everyone"
                className="mb-2"
              />
              <FormLabel htmlFor="wd-due-date">
                <b>Due</b>
              </FormLabel>
              <FormControl
                id="wd-due-date"
                type="date"
                defaultValue="2024-05-13"
                className="mb-2"
              />
              <Row>
                <Col xs={6}>
                  <FormLabel htmlFor="wd-available-from">
                    <b>Available from</b>
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="date"
                    defaultValue="2024-05-06"
                  />
                </Col>
                <Col xs={6}>
                  <FormLabel htmlFor="wd-available-until">
                    <b>Until</b>
                  </FormLabel>
                  <FormControl
                    id="wd-available-until"
                    type="date"
                    defaultValue=""
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </fieldset>
        <Row>
          <hr />
        </Row>
        <Button
          variant="danger"
          size="sm"
          className="me-1 float-end"
          id="wd-save-btn"
        >
          Save
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="me-1 float-end"
          id="wd-cancel-btn"
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}
