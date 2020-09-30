import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
	<header className='main-header'>
		<h1 className='title'>
			<Link to='/'>{siteTitle}</Link>
		</h1>
		<p className='lead'>
			Todos los websites han sido diseñados y desarrollados en su totalidad por{' '}
			<a href='http://instagram.com/cm_brand_agency' target='_blank' rel='noopener noreferrer'>
				BeWine
			</a>{' '}
			y{' '}
			<a href='http://behance.net/penhold3r' target='_blank' rel='noopener noreferrer'>
				penHolder Designerd.
			</a>
		</p>
	</header>
)

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
