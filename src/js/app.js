import list from './website-list'

const cors = 'https://cors-anywhere.herokuapp.com/'

const App = () => {
	// const api = 'https://opengraph.io/api/1.1/site/'
	// const acceptLang = 'auto'
	// const appId = '4e2b6ce5-620b-413e-a518-ca131d766435'

	const localSites = sessionStorage.getItem('list')

	let sites = []

	if (localSites) {
		sites = [...JSON.parse(localSites)]
		buildCards(sites)
	} else {
		list.forEach(siteUrl => {
			// const site = encodeURIComponent(siteUrl)

			// const url = new URL(`${api}${site}`)

			// url.searchParams.append('accept_lang', acceptLang)
			// url.searchParams.append('app_id', appId)

			const query = fetchData(siteUrl).then(data => data)

			sites.push(query)
		})

		Promise.all(sites).then(sites => {
			sessionStorage.setItem('list', JSON.stringify(sites))
			buildCards(sites)
		})
	}
}

const buildCards = sites => {
	const grid = document.querySelector('.grid')

	sites.forEach(site => {
		console.log(site)

		const {
			OgImageUrl,
			OgImage,
			favicon,
			ThemeColor,
			Description,
			OgDescription,
			OgSiteName,
			Title,
			URL,
		} = site

		const defaultBorderColor = getComputedStyle(grid).getPropertyValue('--border')

		const card = document.createElement('div')
		card.classList.add('site-card')
		card.style.borderColor = ThemeColor || defaultBorderColor
		card.innerHTML = `
	            <a href="${URL}" target="_blank" rel="noopener noreferrer">
	               <div class="site-card__image">
	                  <img src="${OgImageUrl || OgImage || favicon}" alt="">
	               </div>
	               <div class="site-card__details">
	                  <h3 class="site-name">${OgSiteName || Title}</h3>
	                  <p class="site-description">${Description || OgDescription}</p>
	                  <p class="site-url">${URL}</p>
	               </div>
	            </a>
	         `
		grid.appendChild(card)
	})
}

const fetchData = url =>
	fetch(`${cors}${url}`)
		.then(res => res.text())
		.then(data => {
			const html = document.createElement('html')
			html.innerHTML = data

			const title = html.querySelector('title')

			const metas = [...html.querySelectorAll('meta')].filter(
				meta =>
					meta.hasAttribute('name') ||
					meta.hasAttribute('property') ||
					meta.hasAttribute('data-react-helmet')
			)

			const metadata = metas.reduce((obj, tag) => {
				const attrs = [...tag.attributes]

				obj[toCamelCase(attrs[0].value)] = attrs[1].value

				return obj
			}, {})

			metadata.Title = title.innerText
			metadata.URL = url

			return metadata
		})

const toCamelCase = str =>
	str.replace(/[^a-z0-9]*([a-z0-9])([a-z0-9]*)/gi, (m, u, l) => u.toUpperCase() + l.toLowerCase())

//-------------------------------------------------
export default App
