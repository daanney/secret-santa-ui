import { Nav, Navbar } from 'react-bootstrap'

const Header =({ user, isLoggedIn, logout })=> {
	return <Navbar bg='light' expand='lg'>
		<Navbar.Brand href='#home'>
			Secret Santa{isLoggedIn() && `: ${user.name}`}
		</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
				{isLoggedIn() && <Nav.Link key='logout' onClick={() => logout()}>Logout</Nav.Link> }
			</Nav>
		</Navbar.Collapse>
	</Navbar>
}

export default Header