import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, StyleSheet, Dimensions, Linking, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import api from '../../../utils/api'
import LoadingIcon from '../../misc/LoadingIcon'
import BackButton from '../../misc/BackButton'
import moment from 'moment'
import StoryMarker from './StoryMarker'
import { TouchableOpacity } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width

const findRelatedTours = (tours, id) => tours.filter(tour => tour.items.find(story => story.id === id))

const getNewDate = d => moment(d).format("MMM D YYYY")

const removeTag = element => element.replace(/<(.|\n)*?>/ig, "")

const LinkGroup = ({ a, title }) => {
    return (
        <View style={styles.subGroup}>
            <Text style={styles.header}>{title}</Text>
            {a.map(tag => {
                const link = removeTag(tag)
                return (
                    <Text style={styles.linkText} key={link} onPress={() => Linking.openURL(link)}>
                        {link}
                    </Text>
                )
            })}
        </View>
        
    )
}

const Citation = ({ author, title, id}) => {
    const date = moment().format('LL')
    const citation = `${author}, "${title}," Milton Historic Sites, accessed ${date} http://miltonhistoricsites.org/items/show/${id}`
    return (
        <View style={styles.subGroup}>
            <Text style={styles.header}>Citation:</Text>
            <Text>{citation}</Text>
        </View>
    )
}

const SingleStory = ({ navigation, route }) => {
    const [content, setContent] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [tours, setTours] = useState([])

    useEffect(() => {
            Promise.all([
                api.getStory(route.params?.id).then(response => {
                    setContent(response)
                }),
                api.getAllTours().then(response => {
                    setTours(response.tours)
                })
            ])
            .then((values) => {
                setIsFetching(false)
            }) 
    }, [route.params?.id])
    
    return (isFetching) ? <LoadingIcon />
        : (<ScrollView>
            {<BackButton backCallBack={() => navigation.navigate('StoryMain')} />}
            <Image style={styles.image} source={{uri: Object.keys(content.files)[0]}} />
            <View style={styles.infoContainer}>
                <Text style={styles.titleText}>{content.title}</Text>
                <Text style={styles.subText}>{content.subtitle.replace('&#039;', '\'')}</Text>
                <Text style={styles.authorText}>By {content.creator[0]}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.textLede}>{content.lede}</Text>
                <Text>{removeTag(content.description)}</Text>
            </View>
            <View style={styles.imageSection}>
                <Text style={styles.subText}>Images</Text>
                <View style={styles.ImageViewContainer}>
                    {Object.keys(content.files).map(url => (
                    <View style={styles.imageContainer}>
                        <Image style={styles.gridImage} key={url} source={{uri: url}} />
                    </View>
                    ))}
                </View>
            </View>
            <View style={styles.mapSection} >
                <Text style={styles.mapTitle}>Map</Text>
                <View style={styles.horizLine} />
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.image} 
                    region={{
                        latitude: content.latitude,
                        longitude: content.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.035
                    }}
                    showsUserLocation={true}
                >
                    <StoryMarker story={content} />  
                </MapView>
                <Text style={styles.italic}>{content.address}</Text>
            </View>
            <View style={styles.bottomContent}>
                <View style={styles.subGroup}>
                    <Text style={styles.box}>The Milton Historical Society is more interesting than you thought, isn't it</Text>
                </View>
                <LinkGroup a={[content.website]} title={"Official Website:"}/>
                <Citation author={content.creator} title={content.title} id={content.id} />
                <View style={styles.subGroup}>
                    <Text style={styles.header}>Related Tours:</Text>
                    <View style={styles.tourGroup}>
                        {findRelatedTours(tours, content.id).map(tour => (
                        <TouchableOpacity 
                            style={styles.buttonContainer} 
                            key={tour.id} 
                            onPress={() => navigation.navigate('Tours', { screen: 'tourSingle', params: { tour: tour }})}
                        >
                            <Text style={styles.tourButton}>{tour.title ? tour.title : ''}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.subGroup}>
                    <Text style={styles.header}>Subjects:</Text>
                </View>
                <LinkGroup a={content.related_resources} title={"Related Resources:"}/>
                <Text style={styles.italic}>Published on {getNewDate(content.modified)}</Text>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    image : {
        padding: 70,
        width: width,
        aspectRatio: 1.5
    },
    infoContainer: {
        backgroundColor: 'black',
    },
    titleText: {
        paddingTop: 5,
        fontSize: 23,
        color: 'white',
        paddingBottom: 10
    },
    subText: {
        color: 'white',
        fontSize: 17,
        paddingBottom: 10

    },
    authorText: {
        color: 'white',
        fontSize: 12,
        paddingBottom: 10
        
    },
    descriptionContainer: {
        backgroundColor: 'white',
        padding: 15
    },
    textLede: {
        paddingBottom: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    imageViewContainer: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: "center"
    },
    imageContainer: {
        padding: 10,
        width: '50%'
    },
    gridImage: {
        aspectRatio: 1.5,
    },
    italic: {
        fontStyle: 'italic',
        marginLeft: 10,
        marginRight: 10
    },
    mapTitle: {
        padding: 5,
        fontSize: 17
    },
    horizLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    bottomContent: {
        backgroundColor: "white",
        paddingTop: 10
    },
    header: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5
    },
    subGroup: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    box: {
        borderColor: 'black',
        backgroundColor: 'lightgray',
    },
    tourButton: {
        backgroundColor: 'black',
        maxWidth: 100,
        padding: 5,
        color: 'white',
        fontSize: 10
    },
    tourGroup: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    linkText: {
        color: 'blue'
    },
    imageSection: {
        backgroundColor: 'black', 
        paddingTop: 10
    },
    mapSection: {
        backgroundColor: 'white'
    },
    buttonContainer: {
        padding: 5
    }
})
export default SingleStory