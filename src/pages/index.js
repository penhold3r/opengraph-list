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
					id
					sites {
						success
						ogTitle
						requestUrl
						themeColor
						ogSiteName
						ogUrl
						ogType
						ogDescription
						ogImage {
							url
						}
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
					sites.map(site => {
						const siteUrl = site.ogUrl || site.requestUrl
						const img = site.ogImage ? site.ogImage.url : null
						const imgUrl =
							img && img.startsWith('/') ? `${siteUrl.replace(/\/$/, '')}${img}` : img

						return (
							<div
								className='site-card'
								key={site.ogTitle}
								style={{ borderColor: site.themeColor || borderColor }}>
								<a href={siteUrl} target='_blank' rel='noopener noreferrer'>
									<div className='site-card__image'>
										<img src={imgUrl} alt='' />
									</div>
									<div className='site-card__details'>
										<h3 className='site-name'>{site.ogSiteName || site.ogTitle}</h3>
										<p className='site-description'>{site.ogDescription}</p>
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
