/*
import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"

import CustomInput from '../components/custom_input.c'
*/
const SettingsPage =({ onChangePassword, setMessage })=> {
/*
	const [ creds, setCreds ] = useState({ password: '' })
	const { password } = creds

	const onChange =(e)=> {
		const { name, value } = e.target
		setCreds({ ...creds, [name]: value })
	}

	const onSubmit = async e => {
		e.preventDefault()
		if(password === '') {
			setMessage('The password cannot be empty!', 'warning')
			return
		}
		if(password.length < 3) {
			setMessage('The password must be at least 3 characters .. :)', 'warning')
			return
		}

		onChangePassword(password)
	}
	return <Card className='card-transparent'>
		<Card.Header>SettingsPage</Card.Header>
		<Card.Body>
			<p>You can change your password here.</p>
			<Form onSubmit={onSubmit}>
				<CustomInput type='password' name='password' value={password} onChange={onChange} 
					required label='Change your password' />
				<Button variant='secondary' type='submit'>Save Password</Button>
			</Form>
		</Card.Body>
	</Card>
*/
	return <></>
}

export default SettingsPage