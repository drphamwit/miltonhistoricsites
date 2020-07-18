import separateStoriesAndTours from './separateStoriesAndTours'


describe('separating stories and tours', () => {
    const search = [
          {
            "result_id": 1,
            "result_type": "Item",
            "result_title": "Milton Described",
            "result_thumbnail": "http://miltonhistoricsites.org/files/square_thumbnails/744e025616ef4e390478c64900dbf7f0.jpg"
          },
          {
            "result_id": 2,
            "result_type": "Item",
            "result_title": "Milton Historical Society",
            "result_thumbnail": "http://miltonhistoricsites.org/files/square_thumbnails/fc60ccf6832d141384f6ebe31bf1c43c.jpg"
          },
          {
            "result_id": 1,
            "result_type": "Tour",
            "result_title": "Milton Demo Tour",
            "result_tour_items": 2
          }
    ]

    it('separates stories and tours', () => {
        const separated = separateStoriesAndTours(search)

        expect(separated.tours.length).toBe(1)
        expect(separated.stories.length).toBe(2)

        separated.tours.forEach(tour => expect(tour.result_type).toBe("Tour"))
        separated.stories.forEach(story => expect(story.result_type).toBe("Item"))
        
    })

    it('returns empty on an empty array', () => {
        const separated = separateStoriesAndTours([])

        expect(separated.tours.length).toBe(0)
        expect(separated.stories.length).toBe(0)
    })

})