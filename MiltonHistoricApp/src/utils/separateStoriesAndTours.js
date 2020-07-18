const separateStoriesAndTours = (list) => {
    return list.reduce((acc, listItem) => {
      if (listItem.result_type === 'Item') {
        acc.stories = acc.stories.concat(listItem)
      } else {
        acc.tours = acc.tours.concat(listItem)
      }

      return acc
    }, { tours: [], stories: [] })
}

export default separateStoriesAndTours