const BASE_PATH = 'http://miltonhistoricsites.org'
const OUTPUT_TYPE = 'output=mobile-json'

const fetchData = (url) => fetch(url).then(response => response.json())

const determineNumberFromSearchField = (field) => {
    switch(field) {
        case 'title':
            return '50'
        case 'creator':
            return '39'
        case 'description':
            return '41'
        default:
            return null
    }
}

const api = {
    getAllStories()  {
        const url = `${BASE_PATH}/items/browse?${OUTPUT_TYPE}`
        return fetchData(url)
    },
    getStory(id) {
        const url = `${BASE_PATH}/items/show/${id}?${OUTPUT_TYPE}`
        return fetchData(url)
    },
    getAllTours() {
        const url = `${BASE_PATH}/tours/browse?${OUTPUT_TYPE}`
        return fetchData(url)
    },
    getTour(id) {
        const url = `${BASE_PATH}/tours/show/${id}?${OUTPUT_TYPE}`
        return fetchData(url)
    },
    executeKeywordSearch(searchTerms) {
        const query = searchTerms.replace(' ', '+').replace(' ', '+') + '&query_type=keyword&record_types%5B%5D=Item&record_types%5B%5D=Tour&submit_search=Search'
        const url = `${BASE_PATH}/search?query=${query}&${OUTPUT_TYPE}`
        return fetchData(url)
    },
    executeExtendedSearch(text, advancedQuery) {
        const url = `${BASE_PATH}/items/browse?search=${(text.replace(' ', '+').replace(' ', '+')) + advancedQuery}&submit_search=Search+for+items&${OUTPUT_TYPE}`
        return fetchData(url)
    },
    buildExtendedSearchQuery(searchObjects) {
        const prefix = '&advanced%5B0%5D%5B'
        return searchObjects.reduce((acc,curr) => {
            let builder = ''
            builder += `${prefix}joiner%5D=` + ((curr.operation) ? curr.operation : '')
            builder += `${prefix}element_id%5D=` + determineNumberFromSearchField(curr.field)
            builder += `${prefix}terms%5D=` + ((curr.text) ? curr.text.replace(' ', '+') : '')
            return acc + builder
        }, '')
    }
}

export default api