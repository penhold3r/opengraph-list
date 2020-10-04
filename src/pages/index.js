import React, { useEffect, useRef, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
	const {
		openGraph: { sites },
	} = useStaticQuery(
		graphql`
			query {
				openGraph {
					sites {
						title
						theme_color
						ogSiteName
						ogTitle
						ogUrl
						ogDescription
						ogImage
						ogImageUrl
						requestUrl
						description
						Description
					}
				}
			}
		`
	)

	const [borderColor, setBorderColor] = useState('')
	const gridRef = useRef()

	useEffect(() => {
		const defaultBorderColor = getComputedStyle(gridRef.current).getPropertyValue('--border')
		setBorderColor(defaultBorderColor)
	}, [])

	return (
		<Layout>
			<SEO />
			<div className='grid' ref={gridRef}>
				{!sites ? (
					<div>Cargando...</div>
				) : (
					sites
						.sort((a, b) => {
							const titleA = a.ogSiteName || a.ogTitle || a.title
							const titleB = b.ogSiteName || b.ogTitle || b.title

							return titleA.localeCompare(titleB)
						})
						.map(site => {
							const cors = 'https://cors-anywhere.herokuapp.com/'
							const siteUrl = site.ogUrl || site.requestUrl
							const img = site.ogImage
							const imgUrl =
								img && img.startsWith('/') ? `${siteUrl.replace(/\/$/, '')}${img}` : img

							const siteDesc = site.Description || site.description || site.ogDescription

							return (
								<div
									className='site-card'
									key={site.ogSiteName || site.ogTitle || site.title}
									style={{ borderColor: site.theme_color || borderColor }}>
									<a href={siteUrl} target='_blank' rel='noopener noreferrer'>
										<div className='site-card__image'>
											<img src={`${imgUrl}`} alt='' />
										</div>
										<div className='site-card__details'>
											<h3 className='site-name'>
												{site.ogSiteName || site.ogTitle || site.title}
											</h3>
											<p className='site-description'>{siteDesc}</p>
											<p className='site-url'>{siteUrl}</p>
										</div>
									</a>
								</div>
							)
						})
				)}
			</div>
		</Layout>
	)
}

export default IndexPage
