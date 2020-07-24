const BASE_PATH = 'http://miltonhistoricsites.org'
const OUTPUT_TYPE = 'output=mobile-json'

const fetchData = (url) => fetch(url).then(response => response.json())

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
    keywordSearch(searchTerms) {
        const query = searchTerms.replace(' ', '+') + '&query_type=keyword&record_types%5B%5D=Item&record_types%5B%5D=Tour&submit_search=Search'
        const url = `${BASE_PATH}/search?query=${query}&${OUTPUT_TYPE}`
        return fetchData(url)
    },
    extendedSearch(query) {
        const url = `${BASE_PATH}/items/browse?search=&advanced%5B0%5D%5B/${query}&${OUTPUT_TYPE}`
        return fetchData(url)
    }
}

export default api