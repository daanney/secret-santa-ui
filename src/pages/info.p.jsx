import { Alert, Card } from "react-bootstrap"

const InfoPage =()=> {
	return <Card className='card-transparent'>
		<Card.Header>Rules</Card.Header>
		<Card.Body>
			<ul>
				<li>This is <b>SECRET</b> - Do not tell others who you are gifting</li>
				<li>The price is between 20&euro; - 25&euro; for personal gift</li>
				<li>The price is maximum 15&euro; for random gift</li>
				<li>The random gift will be put in a bag to be shared randomly</li>
			</ul>
		</Card.Body>
	</Card>
}

export default InfoPage