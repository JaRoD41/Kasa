import { Link } from 'react-router-dom'

export default function Nav() {
	const clearHomeScroll = () => {
		try {
			sessionStorage.removeItem('homeScroll')
			sessionStorage.removeItem('homeSelectedId')
		} catch (e) {
			// ignore
		}
	}

	return (
		<nav className='nav-header'>
			<Link to='/' className='nav-header_link-home' onClick={clearHomeScroll}>
				Accueil
			</Link>
			<Link to='/about' className='nav-header_link-about'>
				A Propos
			</Link>
		</nav>
	)
}
