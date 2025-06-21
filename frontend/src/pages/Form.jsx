"use client"
import '../App.css'
import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Nav, Badge } from "react-bootstrap"
// import Link from "next/link"
import { Link } from "react-router-dom";
import DownloadIdCard from './DownloadIdCard'



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    course: "",
    proficiency: "",
    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    cnic: "",
    fatherCnic: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    lastQualification: "",
    hasLaptop: "",
    picture: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      image: imageFile
    }))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("Form submitted:", formData)
  // }
  const handleSubmit = async (e) => {
  e.preventDefault()

  const formDataToSend = new FormData()

  // Append all fields to FormData
  for (const key in formData) {
    if (key === "image") {
      formDataToSend.append("image", formData.image) // image file
    } else {
      formDataToSend.append(key, formData[key])
    }
  }

  try {
    const response = await fetch("http://localhost:5000/api/user/create", {
      method: "POST",
      body: formDataToSend,
    })

    const result = await response.json()

    if (result.success) {
      alert("✅ Registration submitted successfully")
      console.log(result.user)
    } else {
      alert("❌ Failed: " + result.message)
    }
  } catch (err) {
    console.error("Error submitting form:", err)
    alert("❌ Something went wrong while submitting the form.")
  }
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
                <Nav.Link active className="text-success bg-transparent border-0">
                  Registration
                </Nav.Link>
              </Nav.Item>
             <Nav.Item>
  
    <Nav.Link className="text-primary bg-transparent border-0">
      <Link to="/DownloadIdCard" >
      Download ID Card
  </Link>
    </Nav.Link>
</Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-primary bg-transparent border-0">Results</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={2} className="text-end">
            <Badge bg="primary" className="p-2">
              👤 Student portal
            </Badge>
          </Col>
        </Row>

        {/* Form */}
        <Card className="shadow-sm ">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Select Country */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Select country</Form.Label>
                  <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  >
                    <option value="">Select country</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="india">India</option>
                    <option value="bangladesh">Bangladesh</option>
                  </Form.Select>
                </Col>

                {/* Select City */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Select city</Form.Label>
                  <Form.Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  >
                    <option value="">Select city</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                  </Form.Select>
                </Col>

                {/* Select Course */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Select course or event</Form.Label>
                  <Form.Select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  >
                    <option value="">Select course or event</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="graphic-design">Graphic Design</option>
                  </Form.Select>
                </Col>

                {/* Computer Proficiency */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Select your computer proficiency</Form.Label>
                  <Form.Select
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  >
                    <option value="">Select your computer proficiency</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Form.Select>
                </Col>

                {/* Full Name */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Full name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d",borderColor: "#8dc63f"  }}
                  />
                </Col>

                {/* Father Name */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Father name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Father name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Email */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Phone */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* CNIC */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">CNIC</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CNIC"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Father's CNIC */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Father's CNIC (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Father's CNIC (optional)"
                    name="fatherCnic"
                    value={formData.fatherCnic}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Date of Birth */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="mm/dd/yyyy"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Gender */}
                <Col md={6} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Select gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>

                {/* Address */}
                <Col xs={12} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Last Qualification */}
                <Col xs={12} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Last qualification</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last qualification"
                    name="lastQualification"
                    value={formData.lastQualification}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Laptop Question */}
                <Col xs={12} className="mb-3">
                  <Form.Label className="text-primary fw-semibold">Do you have a Laptop?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Do you have a Laptop?"
                    name="hasLaptop"
                    value={formData.hasLaptop}
                    onChange={handleInputChange}
                    style={{ color: "#6c757d" ,borderColor: "#8dc63f"}}
                  />
                </Col>

                {/* Picture Upload */}
                <Col xs={12} className="mb-4">
                  <Form.Label className="text-primary fw-semibold">Picture</Form.Label>
                  <div className="border rounded p-3 bg-light">
                    <Row>
                      <Col md={3}>
                        <Button variant="outline-primary" className="w-100">
                          📁 + Upload
                        </Button>
                      </Col>
                      <Col md={9}>
                        <div className="small text-muted">
                          <p className="mb-1">With white or blue background</p>
                          <p className="mb-1">File size must be less than 1MB</p>
                          <p className="mb-1">File type: jpg, jpeg, png</p>
                          <p className="mb-1">Upload your recent passport size picture</p>
                          <p className="mb-0">Your Face should be clearly visible without any Glasses</p>
                        </div>
                      </Col>
                    </Row>
                    <Form.Control type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="mt-2" />
                  </div>
                </Col>

                {/* Terms and Conditions */}
                <Col xs={12} className="mb-4">
                  <div className="small text-muted">
                    <ol>
                      <li className="mb-2">
                        I hereby solemnly declare that the data and facts mentioned herein are true and correct to the
                        best of my knowledge. Further, I will abide by all the established and future regulations and
                        policies of SMIT.
                      </li>
                      <li className="mb-2">
                        I hereby accept the responsibilities of good conduct and guarantee that I will not be involved
                        in any other activity, political or ethical, but learning during my stay in the program.
                      </li>
                      <li className="mb-2">Defiance will render my admission cancelled at any point in time.</li>
                      <li className="mb-2">
                        Upon completion of the course, I will complete the required project by SMIT.
                      </li>
                      <li className="mb-0">It's mandatory for female students to wear abaya/hijab in the class.</li>
                    </ol>
                  </div>
                </Col>

                {/* Submit Button */}
                <Col xs={12}>
                  <Button
                    type="submit"
                    className="w-100 py-3 fw-semibold text-white hover:bg-sky-900 custom-submit-btn"
                    style={{
                      backgroundColor: "#5DADE2",
                      border: "none",
                      fontSize: "16px",
                      
                    }}
                  >
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  )
}

export default RegistrationForm
