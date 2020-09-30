const Promise = require('promise')
const ogs = require('open-graph-scraper')

const list = require('./data/website-list')

exports.sourceNodes = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
	const opengraph = []

	list.forEach(site => {
		const config = {
			url: site,
			customMetaTags: [
				{
					property: 'theme-color',
					fieldName: 'themeColor',
				},
			],
		}
		const query = ogs(config).then(({ result }) => result)
		opengraph.push(query)
	})

	await Promise.all(opengraph).then(data => {
		createNode({
			sites: data,
			// required fields
			id: createNodeId(`weblist`),
			parent: null,
			children: [],
			internal: {
				type: `OpenGraph`,
				contentDigest: createContentDigest(opengraph),
			},
		})
	})
}
