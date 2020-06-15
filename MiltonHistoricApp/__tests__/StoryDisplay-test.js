import 'react-native';
import React from 'react';
import StoryDisplay from '../components/tabs/Story/StoryDisplay'
import { FlatList } from 'react-native'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';



it('renders correctly', async () => {
  jest.useFakeTimers()

  const items = [
    {
        "id":2,
         "featured":1,
         "modified":"2020-04-28 23:46:46",
         "latitude":42.23419445,
         "longitude":-71.108642092847,
         "title":"Milton Historical Society",
         "address":"1370 Canton Avenue, Milton, MA.",
         "thumbnail":"http://miltonhistoricsites.org/files/square_thumbnails/fc60ccf6832d141384f6ebe31bf1c43c.jpg",
         "fullsize":"http://miltonhistoricsites.org/files/fullsize/fc60ccf6832d141384f6ebe31bf1c43c.jpg"
    },
    {
        "id":1,
        "featured":1,
        "modified":"2020-04-28 23:53:12",
        "latitude":42.25410995,
        "longitude":-71.07973105,
        "title":"Milton Described",
        "address":"525 Canton Avenue, Milton, MA",
        "thumbnail":"http://miltonhistoricsites.org/files/square_thumbnails/744e025616ef4e390478c64900dbf7f0.jpg",
        "fullsize": "http://miltonhistoricsites.org/files/fullsize/744e025616ef4e390478c64900dbf7f0.jpg"
    }
]


  renderer.create(<StoryDisplay items={items}/>);


});