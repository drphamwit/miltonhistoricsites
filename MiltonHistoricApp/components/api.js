import axios from 'axios'

export const getStories = () => {
    axios.get('http://miltonhistoricsites.org/items/browse?output=mobile-json')
    .then(response => {
        response.data
    })
    .catch(error => console.log(error))
}

