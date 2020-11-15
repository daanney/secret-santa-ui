import { ReactComponent as GiftIconSvg } from '../assets/icons/present.svg'

const Gift =({ amount = 1, forName, priceRange = '' })=> (
	<div className='drawn-name-box'>
		{amount}x <GiftIconSvg className='gift' /> for {forName}
		{priceRange && <p className='remarks'>Price should be {priceRange}</p>}
	</div>
)

export default Gift