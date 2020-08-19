import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import api from '../../../utils/api'
import { Colors, Typography } from '../../../styles/index'

const ListItem = ({ item, removeItem }) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => removeItem(item.item.id)} style={styles.listItem}>
            <FontAwesome5Icon name='trash-alt' style={styles.icon} />
        </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.text}>{item.item.operation ? item.item.operation : 'N/A'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>{item.item.field ? item.item.field : 'N/A'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>{item.item.text ? item.item.text : 'N/A'}</Text>
            </View>

    </View>
    )
}

const QueryForm = ({ addCallBack }) => {
    const [boolDrop, setBoolDrop] = useState('')
    const [fieldDrop, setFieldDrop] = useState('')
    const [text, setText] = useState('')

    return (
        <View>
            <RNPickerSelect
            placeholder={{
                label: 'Select...',
                value: null,
                color: '#9EA0A4'
            }}
            onValueChange={(value) => setBoolDrop(value)}
            items={[
                { label: 'And', value: 'And' },
                { label: 'Or', value: 'Or' },
            ]}
            style={pickerStyle}
            />
            <RNPickerSelect
            placeholder={{
                label: 'Narrow By...',
                value: null,
                color: '#9EA0A4'
            }}
            onValueChange={(value) => setFieldDrop(value)}
            items={[
                { label: 'Title', value: 'Title' },
                { label: 'Creator', value: 'Creator' },
                { label: 'Description', value: 'Description' },
            ]}
            style={pickerStyle}
            />
            <TextInput 
                placeholder="Enter Search Term"  
                style={styles.advSearchInput} 
                onChangeText={value => setText(value)}
            />
            <View style={styles.add}>
                <Button
                title='Add Search Query'
                color={(Platform.OS === 'android') ? Colors.BUTTON_COLOR : '#fff'}
                onPress={() => addCallBack(boolDrop,fieldDrop,text)}
                />
            </View>
        </View>
    )
}

const NarrowBy = ({ searchCallBack }) => {
    const [terms, setTerms] = useState([])
    const addCallBack = (bool,field,text) => {
        if (bool || field || text) {
            setTerms(terms.concat({ id: terms.length, operation: bool, field: field, text: text}))
        }
    }

    const removeCallBack = (id) => setTerms(terms.filter(term => term.id !== id))

    return (
        <View style={styles.background}>
            <FlatList
                data={terms}
                renderItem={(item) => <ListItem removeItem={removeCallBack} item={item} />}
                keyExtractor={item => item.id.toString()}
                style={styles.background}
            />
            <Text style={styles.searchTitleText}>Extended Search</Text>
            <QueryForm addCallBack={addCallBack} />
            <View style={styles.submit}>
                <Button
                    title='Extended Search'
                    color={(Platform.OS === 'android') ? Colors.BUTTON_COLOR : '#fff'}
                    onPress={() => {
                        searchCallBack(api.buildExtendedSearchQuery(terms))
                    }}
                />
            </View>
        </View>
    )
}

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: Typography.REGULAR,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white'
      },
      inputAndroid: {
        fontSize: Typography.REGULAR,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white'
      },
})

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        marginTop: 10
    },
    container: {
        width: '30%',
        height: 40,
        borderColor: 'black',
        borderLeftWidth: 1,
        backgroundColor: 'white'
    },
    add: {
        backgroundColor: Colors.BUTTON_COLOR,
        marginTop: 20,
        marginLeft: 120,
        marginRight: 120,
    },
    submit: {
        backgroundColor: Colors.BUTTON_COLOR,
        marginTop: 10,
        marginLeft: 120,
        marginRight: 120,
        marginBottom: 10
      },
      searchTitleText: {
        fontSize: Typography.SUB_HEADING,
        backgroundColor: Colors.BACKGROUND, 
        color: 'white', 
        padding: 10
      },
      listContainer: {
        flex: 1, 
        flexDirection: 'row', 
        marginBottom: 10, 
        marginTop: 10, 
        borderWidth: 1, 
        borderColor: 'white'
      },
      background: {
        backgroundColor: Colors.BACKGROUND
      },
      listItem: {
        padding: 10, 
        backgroundColor: 'white'
      },
      advSearchInput: { 
        fontSize: Typography.REGULAR, 
        backgroundColor: 'white', 
        padding: 10 
    },
    icon: {
        fontSize: Typography.SUB_HEADING
    }
})
export default NarrowBy