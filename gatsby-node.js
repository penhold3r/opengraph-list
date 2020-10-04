const Promise = require('promise')
const extract = require('meta-extractor')

const list = require('./data/website-list')

exports.sourceNodes = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
	const opengraph = []

	const cors = 'https://cors-anywhere.herokuapp.com/'

	list.forEach(site => {
		const query = extract({ uri: cors + site }).then(res => {
			return { ...res, requestUrl: site }
		})
		opengraph.push(query)
	})

	await Promise.all(opengraph)
		.then(data => {
			console.log('DATA', data)
			createNode({
				sites: data,
				id: createNodeId(`weblist`),
				parent: null,
				children: [],
				internal: {
					type: `OpenGraph`,
					contentDigest: createContentDigest(opengraph),
				},
			})
		})
		.catch(err => console.log(err))
}
