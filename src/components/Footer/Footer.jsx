import logo from '../../assets/images/logo-footer.svg'

export default function Footer() {
	return (
		<footer className='foot-container'>
			<img src={logo} alt='logo de kasa' />
			<p className='foot-container__text'>© 2025 Kasa. All rights reserved</p>
		</footer>
	)
}
