import api from './api'

beforeEach(() => {
  fetch.resetMocks()
})

describe('Stories', () => {
  const mockStories = {
    items: [
      {
        id: 1,
        featured: 1,
        modified: "22-24-2000 44:44:44",
        latitude: 43.5454,
        longitude: -71.32341,
        title: "Milton Historical Society",
        address: '1370 Canton Avenue, Milton, MA.',
        thumbnail: 'http://miltonhistoricsites.org/files/square_thumbnails/fc60ccf6832d141384f6ebe31bf1c43c.jpg',
        fullsize: 'http://miltonhistoricsites.org/files/fullsize/fc60ccf6832d141384f6ebe31bf1c43c.jpg'
      },
      {
        id: 2,
        featured: 1,
        modified: "22-24-2000 44:44:44",
        latitude: 478.5454,
        longitude: -721.32341,
        title: "Milton Described",
        address: '1371 Canton Avenue, Milton, MA.',
        thumbnail: 'http://miltonhistoricsites.org/files/square_thumbnails/fc60ccf6832d141384f6ebe31bf1c43c.jpg',
        fullsize: 'http://miltonhistoricsites.org/files/fullsize/fc60ccf6832d141384f6ebe31bf1c43c.jpg'
      }
    ]
  }

  it('Gets all Stories', async () => {

    fetch.mockResponseOnce(JSON.stringify(mockStories))
  
    const response = await api.getAllStories()
  
    expect(response).toStrictEqual(mockStories)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/items/browse?output=mobile-json")
  })
  
  it('Fails when to get stories when api is not responding', () => {
    fetch.mockReject(() => Promise.reject("404 error"))
  
    const response = api.getAllStories()
  
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/items/browse?output=mobile-json")
  })
  
  it('Gets a singular Story', async () => {
  
    fetch.mockResponseOnce(JSON.stringify(mockStories.items[1]))
  
    const response = await api.getStory(1)
  
    expect(response).toStrictEqual(mockStories.items[1])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/items/show/1?output=mobile-json")
  
  })
  
  it('Fails when to get stories when api is not responding', () => {
    fetch.mockReject(() => Promise.reject("404 error"))
  
    const response = api.getStory(1)
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/items/show/1?output=mobile-json")
  })
})

describe('Tours', () => {
  const mockTours = {
    tours: [
      {
        id: 1,
        title: "Milton Demo Tour",
        creator: "Joanne User",
        description: "This is a test",
        postscript_text: '',
        tour_img: 'http://miltonhistoricsites.org/files/fullsize/fc60ccf6832d141384f6ebe31bf1c43c.jpg',
        item: [
          {
            id: 2,
            title: "Milton Historical Society",
            latitude: 42.341,
            longitude: -7.3433,
            thumbnail: 'http://miltonhistoricsites.org/files/square_thumbnails/fc60ccf6832d141384f6ebe31bf1c43c.jpg',
            fullsiz: 'http://miltonhistoricsites.org/files/fullsize/fc60ccf6832d141384f6ebe31bf1c43c.jpg',
            address: '1370 Canton Avenue, Milton, MA.'
          }
        ]
      }
    ]
  }

  it('Gets all Tours', async () => {

    fetch.mockResponse(JSON.stringify(mockTours))
  
    const response = await api.getAllStories()
    expect(response).toStrictEqual(mockTours)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/items/browse?output=mobile-json")
  })
  
  it('Fails to get tours when api is not responding', () => {
    fetch.mockReject(() => Promise.reject("404 error"))
  
    const response = api.getAllTours()
  
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/tours/browse?output=mobile-json")
  })
  
  it('Gets a singular Tour', async () => {
  
    fetch.mockResponseOnce(JSON.stringify(mockTours.tours[0]))
  
    const response = await api.getTour(1)
  
    expect(response).toStrictEqual(mockTours.tours[0])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/tours/show/1?output=mobile-json")
  
  })
  
  it('Fails when to get stories when api is not responding', () => {
    fetch.mockReject(() => Promise.reject("404 error"))
  
    const response = api.getTour(1)
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("http://miltonhistoricsites.org/tours/show/1?output=mobile-json")
  })
})

describe('Keyword Search', () => {

  const queryString = [
    'Milton Described',
    'Tour',
    'Historical '
  ]

  const results = [
    'http://miltonhistoricsites.org/search?query=Milton+Described&query_type=keyword&record_types%5B%5D=Item&record_types%5B%5D=Tour&submit_search=Search',
    'http://miltonhistoricsites.org/search?query=Tour&query_type=keyword&record_types%5B%5D=Item&record_types%5B%5D=Tour&submit_search=Search',
    'http://miltonhistoricsites.org/search?query=Historical+&query_type=keyword&record_types%5B%5D=Item&record_types%5B%5D=Tour&submit_search=Search'
  ]

  it('fetches data from correct url', () => {
    api.keywordSearch(queryString[0])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(`${results[0]}&output=mobile-json`)
  })

  it('fetches data from correct url with spaces', () => {
    api.keywordSearch(queryString[1])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(`${results[1]}&output=mobile-json`)
  })

  it('fetches data from the correct url with spaces at the end', () => {
    api.keywordSearch(queryString[2])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(`${results[2]}&output=mobile-json`)
  })

})

describe('Extended Search', () => {
  const searchParams = [
    {
      text: 'Demo',
      searchQuery: '&advanced%5B0%5D%5Bjoiner%5D=and&advanced%5B0%5D%5Belement_id%5D=50&advanced%5B0%5D%5Bterms%5D=spaced+text'
    },
    {
      text: 'Milton Described ',
      searchQuery: '&advanced%5B0%5D%5Bjoiner%5D=or&advanced%5B0%5D%5Belement_id%5D=41&advanced%5B0%5D%5Bterms%5D=blahblah'
    },
    {
      text: '',
      searchQuery: '&advanced%5B0%5D%5Bjoiner%5D=&advanced%5B0%5D%5Belement_id%5D=39&advanced%5B0%5D%5Bterms%5D='
    },
    {
      text: 'Described',
      searchQuery: ''
    },
  ]

  const results = [
    'http://miltonhistoricsites.org/items/browse?search=Demo&advanced%5B0%5D%5Bjoiner%5D=and&advanced%5B0%5D%5Belement_id%5D=50&advanced%5B0%5D%5Bterms%5D=spaced+text&submit_search=Search+for+items&output=mobile-json',
    'http://miltonhistoricsites.org/items/browse?search=Milton+Described+&advanced%5B0%5D%5Bjoiner%5D=or&advanced%5B0%5D%5Belement_id%5D=41&advanced%5B0%5D%5Bterms%5D=blahblah&submit_search=Search+for+items&output=mobile-json',
    'http://miltonhistoricsites.org/items/browse?search=&advanced%5B0%5D%5Bjoiner%5D=&advanced%5B0%5D%5Belement_id%5D=39&advanced%5B0%5D%5Bterms%5D=&submit_search=Search+for+items&output=mobile-json',
    'http://miltonhistoricsites.org/items/browse?search=Described&submit_search=Search+for+items&output=mobile-json'
  ]

  it('fetches data from the correct url', () => {
    api.extendedSearch(searchParams[0].text, searchParams[0].searchQuery)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(results[0])
  })

  it('fetches data from the correct url with spaces', () => {
    api.extendedSearch(searchParams[1].text, searchParams[1].searchQuery)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(results[1])
  })

  it('fetches data from the correct url with no keywords', () => {
    api.extendedSearch(searchParams[2].text, searchParams[2].searchQuery)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(results[2])
  })

  it('fetches data from the correct url with no fields', () => {
    api.extendedSearch(searchParams[3].text, searchParams[3].searchQuery)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(results[3])
  })
})

describe('Build Extended Search Query string', () => {

  const queryList = [
    {
      operation: 'and',
      field: 'title',
      text: 'spaced text',
    },
    {
      operation: 'or',
      field: 'creator',
      text: 'blahblah',
    },
    {
      operation: '',
      field: 'description',
      text: '',
    },
  ]

  const singleQueryResults = [
    '&advanced%5B0%5D%5Bjoiner%5D=and&advanced%5B0%5D%5Belement_id%5D=50&advanced%5B0%5D%5Bterms%5D=spaced+text',
    '&advanced%5B0%5D%5Bjoiner%5D=or&advanced%5B0%5D%5Belement_id%5D=39&advanced%5B0%5D%5Bterms%5D=blahblah',
    '&advanced%5B0%5D%5Bjoiner%5D=&advanced%5B0%5D%5Belement_id%5D=41&advanced%5B0%5D%5Bterms%5D='
  ]

  it('builds single queries correctly', () => {
    const query1 = api.buildExtendedSearchQuery([queryList[0]])
    const query2 = api.buildExtendedSearchQuery([queryList[1]])
    const query3 = api.buildExtendedSearchQuery([queryList[2]])

    expect(query1).toBe(singleQueryResults[0])
    expect(query2).toBe(singleQueryResults[1])
    expect(query3).toBe(singleQueryResults[2])
  })

  it('combines multiple queries correctly', () => {
    const query1 = api.buildExtendedSearchQuery(queryList)
    const query2 = api.buildExtendedSearchQuery(queryList.slice(0,2))

    expect(query1).toBe(singleQueryResults.reduce((acc,curr) => acc + curr), '')
    expect(query2).toBe(singleQueryResults[0] + singleQueryResults[1])
  })
})