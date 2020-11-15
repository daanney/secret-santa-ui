import { Form } from "react-bootstrap"

const CustomInput =({ label, type, name, value, onChange, required = false, placeholder })=> {
	const iptProps = { type, name, value, onChange, required, placeholder}
	return <Form.Group controlId='formBasicName'>
		<Form.Label>{label}</Form.Label>
		<Form.Control {...iptProps} />
	</Form.Group>
}

export default CustomInput