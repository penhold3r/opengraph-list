const Promise = require('promise')
const extract = require('meta-extractor')

const list = require('./data/website-list')

exports.sourceNodes = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
	const opengraph = []

	list.forEach(site => {
		const query = extract({ uri: site }).then(res => {
			return { ...res, imagesList: res.images ? [...res.images] : null, requestUrl: site }
		})
		opengraph.push(query)
	})

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
		.catch(err => console.log(err))
}
