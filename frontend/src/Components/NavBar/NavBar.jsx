import Container from 'react-bootstrap/Container';
import { Navbar, Row, Col,Nav, Form, FormControl, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import "./NavBar.css"
import { useState,useEffect } from 'react';



const NavigationBar=()=>{
   
    const [showOptions,setShowOptions]= useState(false);

    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => {
        
        setShowSearch(!showSearch);
    }


    function Options(){
        setShowOptions(!showOptions)
    }

    return(
        <div className="navigation-bar">
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={Options}/>
                    <Navbar.Brand className="ms-auto me-auto brand" href="/">
                        PROPERGAANDA
                    </Navbar.Brand>
                    <Navbar.Collapse>
                    <Nav className="ms-auto me-auto my-2 my-lg-0" style={{ }} navbarScroll>
                        <Nav.Link className="m-1" href="/search?category=Technology">Technology</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Pakistan">Pakistan</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Politics">Politics</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Sports">Sports</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Business">Business</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Health">Health</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Science">Science</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Style">Style</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Food">Food</Nav.Link>
                        <Nav.Link className="m-1" href="/search?category=Travel">Travel</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    {!showOptions && <Button variant="outline-light" onClick={toggleSearch}><i className="fa-solid fa-magnifying-glass"></i></Button>}
                </Container>
            </Navbar>
            <Container fluid>
        <Row>
          <Col md={12}>
            {showSearch && (
              <div style={{backgroundColor: '#f8f9fa', width: '100%', borderRight: '1px solid #dee2e6', padding: '20px' }}>
                    <Form className="search-bar">
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-success">Search</Button>
                    </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
        </div>
    )
}

export default NavigationBar