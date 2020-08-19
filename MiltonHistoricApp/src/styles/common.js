import { StyleSheet, Dimensions } from 'react-native'
import { Typography } from '.'

const width = Dimensions.get('window').width

export default Common = StyleSheet.create({
    container: {
        flex: 1
    },
    circle: {
        borderWidth: 6,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    content: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    title: {
        marginBottom: 10,
        fontSize: Typography.TITLE
    },
    horizontalLine: {
        borderBottomWidth: 2,
        marginBottom: 10
    },
    displayContainer: {
        width: width,
        aspectRatio: 1.5
    },
    horizontalSpacing: {
        marginBottom: 10
    }
})
