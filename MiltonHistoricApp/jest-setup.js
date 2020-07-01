import fetchMocks from 'jest-fetch-mock'

fetchMocks.enableMocks()

jest.mock('react-native-reanimated', () => {

    const {View} = require('react-native');
    return {
      Value: jest.fn(),
      event: jest.fn(),
      add: jest.fn(),
      eq: jest.fn(),
      set: jest.fn(),
      cond: jest.fn(),
      interpolate: jest.fn(),
      View,
      Extrapolate: { CLAMP: jest.fn() },
      Transition: {
        Together: 'Together',
        Out: 'Out',
        In: 'In',
      },
      Easing: {
        in: jest.fn(),
        out: jest.fn(),
        inOut: jest.fn(),
      },
    }
})

jest.mock('@react-native-community/geolocation', () => {
  return (
    {
      addListener: jest.fn(),
      getCurrentPosition: jest.fn(),
      removeListeners: jest.fn(),
      requestAuthorization: jest.fn(),
      setConfiguration: jest.fn(),
      startObserving: jest.fn(),
      stopObserving: jest.fn()
    }
  )
})