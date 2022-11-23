import { Navbar, Container, Nav } from 'react-bootstrap'
import { SyntheticEvent } from 'react';
import * as helpers from '../helpers/helpers';
import Logo from '../assets/logo.png';

interface Props {
    username: string
    setUsername: (username: string) => void
}

const Header = ({ username, setUsername }: Props) => {

    const logoutHandler = async (e: SyntheticEvent) => {

        e.preventDefault()
        const jwt = helpers.getJwtFromCookie()

        await fetch('http://localhost:3333/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwt}` },
            credentials: 'include',
        })

        helpers.clearCookie();
        setUsername('');
    }

    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} width="50rem" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {username ? (
                        <Nav className="ms-auto">
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="ms-auto">
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
