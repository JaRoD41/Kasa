import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Carrousel from '../../components/Carrousel/Carrousel'
import Collapse from '../../components/Collapse/Collapse'
import Host from '../../components/Host/Host'
import Rate from '../../components/Rate/Rate'
import Tag from '../../components/Tag/Tag'
import axios from 'axios'

export default function FicheLogement() {
	const params = useParams()
	const navigate = useNavigate()
	const [pickedAppart, setPickedAppart] = useState()

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get('/logements.json')
			const picked = res.data.find(({ id }) => id === params.id)
			setPickedAppart(picked)
			if (picked === undefined) {
				navigate('/404', { state: { message: "Can't get data" } })
			}
		}
		getData()
		// eslint-disable-next-line
	}, [])

	if (!pickedAppart) return null

	const slidePics = pickedAppart.pictures
	const tags = pickedAppart.tags
	const equipments = pickedAppart.equipments
	const equip =
		equipments &&
		equipments.map((item, index) => (
			<li key={index} className='equipList'>
				{item}
			</li>
		))

	return (
		<div key={params.id} className='fiche-container'>
			<button
				className='fiche-logement__back-btn'
				onClick={() => navigate(-1)}
				aria-label='Retour à la liste des logements'
			>
				<svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path d='M15 18L9 12L15 6' stroke='#ff6060' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
				Retour
			</button>
			<Carrousel slides={slidePics} />
			<section className='hostInfo-container'>
				<div className='title-tags-container'>
					<div className='title-container redFont'>
						<h1>{pickedAppart.title}</h1>
						<h3>{pickedAppart.location}</h3>
					</div>
					<div className='tags-container'>
						{tags.map((tag) => (
							<Tag key={tag} tag={tag} />
						))}
					</div>
				</div>
				<div className='rate-host-container'>
					<div className='host-container redFont'>
						<Host hostName={pickedAppart.host.name} hostPic={pickedAppart.host.picture} />
					</div>
					<div className='rate-container'>
						<Rate score={pickedAppart.rating} />
					</div>
				</div>
			</section>
			<div className='collapse-fiche-container'>
				<Collapse aboutTitle='Description' aboutText={pickedAppart.description} />
				<Collapse aboutTitle='Équipements' aboutText={equip} />
			</div>
		</div>
	)
}
