const BASE_PATH = 'http://miltonhistoricsites.org'
const OUTPUT_TYPE = '?output=mobile-json'

const api = {
    getAllStories()  {
        const url = `${BASE_PATH}/items/browse${OUTPUT_TYPE}`
        return fetch(url).then(response => response.json())
    },
    getStory(id) {
        const url = `${BASE_PATH}/items/show/${id}${OUTPUT_TYPE}`
        return fetch(url).then(response => response.json())
    },
    getAllTours() {
        const url = `${BASE_PATH}/tours/browse${OUTPUT_TYPE}`
        return fetch(url).then(response => response.json())
    },
    getTour(id) {
        const url = `${BASE_PATH}/tours/show/${id}${OUTPUT_TYPE}`
        return fetch(url).then(response => response.json())
    }
}

export default api