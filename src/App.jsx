import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Header from './components/Header/Header'
import FicheLogement from './pages/FicheLogement/FicheLogement'
import Footer from './components/Footer/Footer'
import Error from './pages/Error/Error.jsx'

function App() {
	return (
		<div className='App'>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/logement/:id' element={<FicheLogement />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
