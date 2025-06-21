"use client"
import "../App.css"
import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Nav, Badge, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"


const DownloadIdCard = ({ onNavigate }) => {
  const [cnic, setCnic] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [studentData, setStudentData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!cnic.trim()) {
      setError("Please enter your CNIC number")
      return
    }

    setLoading(true)
    setError("")

    try {
      // API call to fetch student data by CNIC
      const response = await fetch(`http://localhost:5000/api/user/${cnic}`)
      const data = await response.json()

      if (data.success) {
        // setStudentData(data.registration)
        // // Here you would typically generate and download the ID card
        // console.log("Student found:", data.registration)

          setStudentData(data.user)
  console.log("Student found:", data.user)
      } else {
        setError("No registration found with this CNIC number")
        setStudentData(null)
      }
    } catch (error) {
      console.error("Error fetching student data:", error)
      setError("Error connecting to server. Please try again.")
      setStudentData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadIdCard = () => {
    // This function would generate and download the actual ID card
    // For now, we'll just show an alert
    alert("ID Card download functionality would be implemented here")
  }

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col xs={2}>
            <div className="d-flex gap-2">
              <div
                className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "35px", height: "35px" }}
              >
                <span className="text-white fw-bold">f</span>
              </div>
              <div
                className="bg-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "35px", height: "35px" }}
              >
                <span className="text-white fw-bold">@</span>
              </div>
              <div
                className="bg-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "35px", height: "35px" }}
              >
                <span className="text-white fw-bold">▶</span>
              </div>
            </div>
          </Col>
          <Col xs={8} className="text-center">
            <div className="mb-2">
              <img src="/upper-logo.png" alt="Saylani Logo" className="mb-2" />
            </div>
            <h3 className="fw-bold text-dark mb-1">Registration Form - SMIT</h3>
            <p className="text-muted small mb-3">Services - Education - Registration</p>

            {/* Navigation Tabs */}
            <Nav variant="pills" className="justify-content-center">
              <Nav.Item>
                <Nav.Link
                  className="text-primary bg-transparent border-0"
                  onClick={() => onNavigate("registration")}
                  style={{ cursor: "pointer" }}
                >
                    <Link to={"/"}>Registration</Link>
                  
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active
                  className="text-success bg-transparent border-0"
                  style={{
                    backgroundColor: "#8dc63f !important",
                    color: "white !important",
                  }}
                >
                  Download ID Card
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="text-primary bg-transparent border-0"
                  onClick={() => onNavigate("results")}
                  style={{ cursor: "pointer" }}
                >
                  Results
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={2} className="text-end">
            <Badge bg="primary" className="p-2">
              👤 Student portal
            </Badge>
          </Col>
        </Row>

        {/* Download ID Card Form */}
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <Form onSubmit={handleSubmit}>
                  {/* CNIC Input */}
                  <div className="mb-4">
                    <Form.Label className="text-primary fw-semibold mb-3">
                      CNIC (Which you provided during form submission)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CNIC (Which you provided during form submission)"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      style={{
                        color: "#6c757d",
                        borderColor: "#8dc63f",
                        padding: "12px",
                        fontSize: "16px",
                      }}
                      disabled={loading}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}

                  {/* Student Data Display */}
                  {studentData && (
                    <Alert variant="success" className="mb-3">
                      <h6 className="mb-2">Registration Found!</h6>
                      <p className="mb-1">
                        <strong>Name:</strong> {studentData.fullName}
                      </p>
                      <p className="mb-1">
                        <strong>Course:</strong> {studentData.course}
                      </p>
                      <p className="mb-1">
                        <strong>City:</strong> {studentData.city}
                      </p>
                      <p className="mb-0">
                        <strong>Status:</strong>
                        <span
                          className={`ms-1 ${
                            studentData.status === "approved"
                              ? "text-success"
                              : studentData.status === "rejected"
                                ? "text-danger"
                                : "text-warning"
                          }`}
                        >
                          {studentData.status.toUpperCase()}
                        </span>
                      </p>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-100 py-3 fw-semibold text-white"
                    style={{
                      backgroundColor: "#5DADE2",
                      border: "none",
                      fontSize: "16px",
                    }}
                    disabled={loading}
                  >
                    {loading ? "SEARCHING..." : "SUBMIT"}
                  </Button>

                  {/* Download Button (shown only when student data is found and approved) */}
                  {studentData && studentData.status === "approved" && (
                    <Button
                      onClick={handleDownloadIdCard}
                      className="w-100 py-3 fw-semibold text-white mt-3"
                      style={{
                        backgroundColor: "#28a745",
                        border: "none",
                        fontSize: "16px",
                      }}
                    >
                      📄 DOWNLOAD ID CARD
                    </Button>
                  )}

                  {/* Status Messages */}
                  {studentData && studentData.status === "pending" && (
                    <Alert variant="warning" className="mt-3 text-center">
                      Your registration is still under review. ID Card will be available once approved.
                    </Alert>
                  )}

                  {studentData && studentData.status === "rejected" && (
                    <Alert variant="danger" className="mt-3 text-center">
                      Your registration has been rejected. Please contact administration for more details.
                    </Alert>
                  )}
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  )
}

export default DownloadIdCard
