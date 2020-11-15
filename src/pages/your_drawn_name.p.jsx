import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import NameSpinner from "../components/name_spinner.c"

const YourDrawnNamePage =({ user, allUsers, userSawDrawnName })=> {
	const [ names, setNames ] = useState([])

	const self = user && user.name
	const drawnName = user && user.assignedUser && user.assignedUser.name
	
	let message = ''

	useEffect(() => {
		setNames(allUsers.length ? allUsers
			.map(user => user.name)
			.filter(name => name !== self) : [])
	}, [allUsers, self])

	return <Card className='card-transparent'>
		<Card.Header>I will buy present for ...</Card.Header>
		<Card.Body>
			{ null == self && <p>Kuka sinä olet? I don't know who you are. Login first.</p> }
			{ names.length && drawnName 
			? 
			<NameSpinner user={user} 
				drawnName={drawnName}
				allNames={names} 
				maxSpins={50} 
				userSawDrawnName={userSawDrawnName} />
			: 
			<p>Odota.. I'm not ready yet..</p>
			}
		</Card.Body>
		{message && <Card.Footer><p>{message}</p></Card.Footer>}
	</Card>
}

export default YourDrawnNamePage