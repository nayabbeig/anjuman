import { Nav } from "react-bootstrap";
import path from "../features/router/paths";
import { useHistory, Link } from "react-router-dom";

function NavBar() {
  const history = useHistory();
  const { panchayats, voters } = path.ui;
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link
          onClick={() => history.push(voters)}
          active={voters === history.location.pathname}
        >
          Voters
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => history.push(panchayats)}
          active={panchayats === history.location.pathname}
        >
          Panchayats
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
