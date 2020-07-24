import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import api from '../../../utils/api'

const ListItem = ({ item, removeItem }) => {
    return (
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10, borderWidth: 1, borderColor: 'white'}}>
        <TouchableOpacity onPress={() => removeItem(item.item.id)} style={{padding: 10, backgroundColor: 'white'}}>
            <FontAwesome5Icon name='trash-alt' style={{ fontSize: 20}} />
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
                label: 'Select an Expresion...',
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
                style={{ fontSize:16, backgroundColor: 'white', padding: 10 }} 
                onChangeText={value => setText(value)}
            />
            <View style={{
                backgroundColor: '#0095FF',
                marginTop: 20,
                marginLeft: 120,
                marginRight: 120,
            }}>
                <Button
                title='Add Search Query'
                color='#fff'
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
        <View>
            <FlatList
                data={terms}
                renderItem={(item) => <ListItem removeItem={removeCallBack} item={item} />}
                keyExtractor={item => item.id.toString()}
                style={{ backgroundColor: 'darkslateblue'}}
            />
            <Text style={{ fontSize: 20, backgroundColor: 'darkslateblue', color: 'white', padding: 10}}>Extended Search</Text>
            <QueryForm addCallBack={addCallBack} />
            <View style={styles.submit}>
                <Button
                    title='Extended Search'
                    color='#fff'
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
        fontSize: 16,
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
        fontSize: 16,
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
    submit: {
        backgroundColor: '#0095FF',
        marginTop: 10,
        marginLeft: 120,
        marginRight: 120,
        marginBottom: 10
      }
})
export default NarrowBy