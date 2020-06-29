import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import api from '../../../utils/api'
import LoadingIcon from '../../misc/LoadingIcon'
import BackButton from '../../misc/BackButton'
import moment from 'moment'
import StoryMarker from './StoryMarker'

const width = Dimensions.get('window').width

const getNewDate = d => moment(d).format("MMM D YYYY")

const removeTag = element => element.replace(/<(.|\n)*?>/ig, "")

const LinkGroup = ({ a, title }) => {
    return (
        <View style={styles.subGroup}>
            <Text style={styles.header}>{title}</Text>
            {a.map(tag => {
                const link = removeTag(tag)
                return (
                    <Text style={{color: 'blue'}} key={link} onPress={() => Linking.openURL(link)}>
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

const SingleStory = ({ item, backCallBack }) => {
    const [content, setContent] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        api.getStory(item.id).then(response => {
            setContent(response)
            setIsFetching(false)
        })
    }, [])

    return (isFetching) ? <LoadingIcon />
        : (<ScrollView>
            <BackButton backCallBack={backCallBack} />
            <Image style={styles.image} source={{uri: item.fullsize}} />
            <View style={styles.infoContainer}>
                <Text style={styles.titleText}>{content.title}</Text>
                <Text style={styles.subText}>{content.subtitle}</Text>
                <Text style={styles.authorText}>By {content.creator[0]}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.textLede}>{content.lede}</Text>
                <Text>{removeTag(content.description)}</Text>
            </View>
            <View style={{backgroundColor: 'black', paddingTop: 10}}>
                <Text style={styles.subText}>Images</Text>
                <View style={styles.imageContainer}>
                    {Object.keys(content.files).map(url => <Image style={styles.gridImage} key={url} source={{uri: url}} />)}
                </View>
            </View>
            <View style={{backgroundColor: 'white'}} >
                <Text style={styles.mapTitle}>Map</Text>
                <View style={styles.horizLine} />
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.image} 
                    region={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.035
                    }}
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
    imageContainer: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    gridImage: {
        padding: 70,
        margin: 10,
        aspectRatio: 1.5
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
    }
})
export default SingleStory