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