import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CartList({ route }) {
    const data = route.params
    console.log(data)
    const [productlist, setProductList] = useState(data);

    const renderItem = ({ item }) => {
        console.log(item, "--")
        return (<TouchableOpacity style={styles.itemContainer}>
            <View>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={{ width: '70%' }}>
                <View>
                    <Text style={styles.name}>{item.title}</Text>
                </View>
                <View style={styles.viewDirection}>
                        <Icon name="star" size={15} color="green" />
                        <Text style={{ fontSize: 14, color: '#888', }}> {item.rating.rate}</Text>
                    </View>
                <View style={[styles.viewDirection, { justifyContent: 'flex-end' , marginTop:15}]}>
                    
                    <View>
                        <Text style={{ marginRight: 10 }}>$ {item.price}</Text>
                    </View>
                </View>
            </View>


        </TouchableOpacity>);
    };


    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={productlist.cartData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => <View style={{ margin: 100 }}></View>}
                />
            </View>
            <View style={{ flex: 0.1, justifyContent: 'flex-end', alignItems: 'flex-end', margin: 10 }}>
                <TouchableOpacity
                    onPress={() => { Alert.alert("Functionality not yet developed") }}
                    style={styles.btnStyle}>
                    <Text style={{ color: 'white' }}>CHECKOUT</Text>
                    {/* <Icon name="rocket" size={30} color="#900" /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // width:'100%',
        borderWidth: 1,
        margin: 10
    },
    viewDirection: {
        flexDirection: 'row'
    },
    btnStyle: {
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        width: '35%',
        alignItems: 'center',
        marginTop: 25
    },
});