import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Gift from './gift.c'

const NameSpinner =({ /*user,*/ drawnName, allNames, maxSpins, userSawDrawnName })=> {
	const [ animateConfig, setAnimate ] = useState({ animate: false, count: 0, animateName: '' })
	const { animate } = animateConfig

	let animateName = drawnName
	//let count = 0

	const isReady = /*user && !user.sawAssigned && */drawnName && allNames && allNames.length > 0
/*
	if(animate) {
		if(count < maxSpins) {
			const spin =()=> {
				let tmp = ''
				while((tmp = allNames[Math.floor(Math.random() * allNames.length)]) === animateName);
				animateName = tmp
				console.log(count)
				count++
				setTimeout(spin, count * 10)
				//setAnimate({ animateName: tmp, count: count + 1, animate: true })
			}
			setTimeout(spin, count * 10)
		}else {
			animateName = drawnName
			count = 50
			//setAnimate({ animateName: drawnName, count: maxSpins, animate: false })
			//userSawDrawnName()
		}
	}
*/
	return <>
		{animate && <>
			<Gift forName={animateName} priceRange='20€ - 25€' />
			<Gift forName='everyone' priceRange='15€' />
		</>}
		<Button variant="secondary" size="lg" block disabled={!isReady} onClick={() => setAnimate({ ...animateConfig, animate: !animate })}>
			{isReady ? (animate ? 'Hide' : 'Show me!') : 'Waiting ...'}
		</Button>
	</>
}

export default NameSpinner