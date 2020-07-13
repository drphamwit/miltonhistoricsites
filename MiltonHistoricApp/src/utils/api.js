const BASE_PATH = 'http://miltonhistoricsites.org'
const OUTPUT_TYPE = '?output=mobile-json'

const fetchData = (url) => fetch(url).then(response => response.json())

const api = {
    getAllStories()  {
        const url = `${BASE_PATH}/items/browse${OUTPUT_TYPE}`
        return fetchData(url)
    },
    getStory(id) {
        const url = `${BASE_PATH}/items/show/${id}${OUTPUT_TYPE}`
        return fetchData(url)
    },
    getAllTours() {
        const url = `${BASE_PATH}/tours/browse${OUTPUT_TYPE}`
        return fetchData(url)
    },
    getTour(id) {
        const url = `${BASE_PATH}/tours/show/${id}${OUTPUT_TYPE}`
        return fetchData(url)
    },
    search(query) {
        const url = `${BASE_PATH}/items/browse?}`
    }
}

export default api