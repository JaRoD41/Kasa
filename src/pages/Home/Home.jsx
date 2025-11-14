import { useEffect, useState } from 'react'
import Banner from '../../components/Banner/Banner'
import Card from '../../components/Cards/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
	const [data, setData] = useState([])

	useEffect(() => {
		axios.get('/logements.json').then((res) => setData(res.data)) //requète AXIOS ici également pour prochaine utilisation API
	}, [])

	// Restore previous scroll position if coming back from a detail page
	useEffect(() => {
		if (data.length === 0) return // wait until data loaded so layout is ready

		const stored = sessionStorage.getItem('homeScroll')
		if (stored) {
			const y = parseInt(stored, 10)
			if (!Number.isNaN(y)) {
				// restore exact position
				window.scrollTo({ top: y, left: 0, behavior: 'auto' })
			}
			// cleanup so it only applies once
			sessionStorage.removeItem('homeScroll')
			sessionStorage.removeItem('homeSelectedId')
		}
	}, [data])

	return (
		<>
			<Banner />
			<div className='cards-container'>
				{data.map((appart, id) => (
					<div className='card_logement' key={id}>
						<Link
							className='link_card_logement'
							to={`/logement/${appart.id}`}
							onClick={() => {
								try {
									// save current vertical scroll position so we can restore it when user returns
									sessionStorage.setItem('homeScroll', String(window.scrollY || window.pageYOffset || 0))
									sessionStorage.setItem('homeSelectedId', String(appart.id))
								} catch (e) {
									// sessionStorage may be disabled in some contexts — ignore errors
								}
							}}
						>
							<Card cover={appart.cover} title={appart.title} />
						</Link>
					</div>
				))}
			</div>
		</>
	)
}
