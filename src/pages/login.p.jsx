import { useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import CustomInput from "../components/custom_input.c";

const LoginPage =({ onLogin })=> {
	const [ creds, setCreds ] = useState({ name: '', password: '' })
	const { name, password } = creds;

	const onChange =(e)=> {
		const { name, value } = e.target
		setCreds({ ...creds, [name]: value })
	}

	const onSubmit = async e => {
		e.preventDefault()
		onLogin(name.trim(), password)
	}

	return <Card className='card-transparent'>
		<Card.Header>Login</Card.Header>
		<Card.Body>
			<Alert variant='secondary'>Please login to see your drawn name</Alert>
			<Form onSubmit={onSubmit}>
				<CustomInput type='text' name='name' value={name} onChange={onChange} 
					required placeholder='Enter your name' label='Your Firstname' />

				<Form.Group controlId='formBasicPwd'>
					<Form.Label>Your Password</Form.Label>
					<Form.Control type='password' name='password' value={password} onChange={onChange} placeholder='Password' />
				</Form.Group>

				<Button variant='secondary' type='submit'>Login</Button>
			</Form>
		</Card.Body>
	</Card>
}

export default LoginPage