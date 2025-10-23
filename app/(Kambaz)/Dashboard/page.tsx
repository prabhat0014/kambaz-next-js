import Link from "next/link";
import Image from "next/image";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack Software Developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1231/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/html.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1231 HTML
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    HTML Basics
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1232/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/css.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1232 CSS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    CSS Basics
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1233/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/java.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1233 Java
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Java Fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1235/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/python.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1235 Python
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Python Fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1236/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/angular.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1236 Angular
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Angular
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-3" style={{ width: "250px" }}>
            <Card>
              <Link
                href="Courses/1237/Home"
                className="wd-dashboard-course-link text-decoration-non text-dark"
              >
                <CardImg
                  variant="top"
                  src="images/nodejs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1237 Node JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Node JS
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
