import haversine from './haversine'

describe('Haversine formula', () => {
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