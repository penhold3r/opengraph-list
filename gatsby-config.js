module.exports = {
	siteMetadata: {
		title: `Lista de Websites`,
		description: `Lista de sitios desarrollados y diseñados por BeWine y penHolder Designerd`,
		author: `@penholder`,
		siteUrl: 'https://sitelist.netlify.app/',
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Lista de Websites`,
				short_name: `Lista de Websites`,
				start_url: `/`,
				background_color: `#000000`,
				theme_color: `#5b7274`,
				display: `standalone`,
				icon: `src/images/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
	],
}
