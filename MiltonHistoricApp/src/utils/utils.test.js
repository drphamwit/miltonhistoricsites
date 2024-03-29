import { haversine, sortByDate, sortByDistance } from './utils'

describe('Haversine formula Test', () => {
    const points = [
        {
            latitude: 38.898556,
            longitude: -77.037852
        },
        {
            latitude: 38.897147,
            longitude: -77.043934
        },
        {
            latitude: 71.6,
            longitude: 38.8888
        }
    ]
    it('Succesfully computes the correct mileage', () => {
        const result1 = haversine(
            points[0].latitude,
            points[0].longitude,
            points[1].latitude,
            points[1].longitude
        )

        const result2 = haversine(
            points[1].latitude,
            points[1].longitude,
            points[0].latitude,
            points[0].longitude
        )

        const result3 = haversine(
            points[2].latitude,
            points[2].longitude,
            points[1].latitude,
            points[1].longitude
        )

        const result4 = haversine(
            points[0].latitude,
            points[0].longitude,
            points[2].latitude,
            points[2].longitude
        )

        expect(result1).toBe("0.34")
        expect(result2).toBe("0.34")
        expect(result3).toBe("4198.51")
        expect(result4).toBe("4198.31")
    })


    it('Fails to comput the correct mileage when points are in the wrong order', () => {
        const result1 = haversine(
            points[0].longitude,
            points[0].latitude,
            points[1].longitude,
            points[1].latitude
        )

        expect(result1 === "0.34").toBeFalsy()
    })

})

describe('Sort by Date', () => {
    const dates = [
        {
            id: 5,
            modified: '2020-04-28 23:53:12'
        },
        {
            id: 4,
            modified: '2020-02-28 23:53:12'
        },
        {
            id: 1,
            modified: '2019-04-28 23:53:12'
        },
        {
            id: 3,
            modified: '2019-04-29 23:53:12'
        },
        {
            id: 2,
            modified: '2019-04-28 23:55:12'
        }
    ]

    it('sorts the dates in ascending order', () => {

        const sortedDates = sortByDate(dates)

        for (let i = 0; i < sortedDates.length; i++) {
            expect(sortedDates[i].id).toBe(sortedDates.length - i)
        }
    })
})

describe('Sort by Distance', () => {
    const userLocation = {
        latitude: 42.2495,
        longitude: -71.0662,
    }

    const distances1 = [
        {
            id: 2,
            latitude: 81.55962,
            longitude: -2.86634,
        },
        {
            id: 1,
            latitude: 17.69523,
            longitude: -51.31967,
        },
        {
            id: 3,
            latitude: 74.98155,
            longitude: 91.99629,
        },
        {
            id: 4,
            latitude: -64.07514,
            longitude: 47.69529,
        },

    ]

    const distances2 = [
        {
            id: 2,
            latitude: 42.23419445,
            longitude: -71.108642092847
        },
        {
            id: 1,
            latitude: 42.25410995,
            longitude: -71.07973105
        }
    ]

    it('properly sorts the points', () => {
        const sortedPoints1 = sortByDistance(distances1, userLocation)
        const sortedPoints2 = sortByDistance(distances2, userLocation)
        
        for (let i = 0; i < sortedPoints1.length; i++) {
            expect(sortedPoints1[i].id).toBe(i+1)
        }

        for (let i = 0; i < sortedPoints2.length; i++) {
            expect(sortedPoints2[i].id).toBe(i+1)
        }
    })



})