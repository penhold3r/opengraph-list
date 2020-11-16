const Promise = require('promise')
const extract = require('meta-extractor')

const list = require('./data/website-list')

exports.sourceNodes = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
	console.log('START FETCH...')

	const opengraph = list.map(site =>
		extract({ uri: site }).then(res => {
			if (res.host) {
				return {
					...res,
					imagesList: res.images ? [...res.images] : null,
					requestUrl: site,
				}
			} else {
				console.log('------------\nERROR', site)
			}
		})
	)

	await Promise.all(opengraph)
		.then(data => {
			createNode({
				sites: [...data],
				id: createNodeId(`weblist`),
				parent: null,
				children: [],
				internal: {
					type: `OpenGraph`,
					contentDigest: createContentDigest(opengraph),
				},
			})
		})
		.catch(err => console.log('PROMISE ERROR', err))
}
