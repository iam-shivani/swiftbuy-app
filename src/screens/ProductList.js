import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, TextInput, StatusBar, Button, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { addToCart } from '../redux/action';
// import { useDispatch, useSelector } from 'react-redux';


export default function ProductList({ navigation }) {
    const [productlist, setProductList] = useState([]);
    const [originalProduct, setOriginalProduct] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [cartData, setCartData] = useState([]);
    // const [ cartItems, setCartItems] = useState(0);
    // console.log(cartData)
    // const dispatch = useDispatch();
    // const reducerCart = useSelector((state) => state.reducer);

    useEffect(() => {
        fetchProduct();

        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to exit the App?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();

    }, []);


    const fetchProduct = async () => {
        try {
            await fetch('https://fakestoreapi.com/products/').then(res => res.json())
                .then(json => {
                    setProductList(json);
                    setOriginalProduct(json);
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text === "") {
            setProductList(originalProduct);
        }
        else {
            const filteredData = productlist.filter((product) =>
                product.title.toLowerCase().includes(text.toLowerCase())
            );
            setProductList(filteredData);
        }
    };

    const handleSort = (option) => {
        setSortOption(option);

        let sortedData = [...productlist]; // Create a copy of the product data

        if (option === 'price_asc') {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (option === 'price_desc') {
            sortedData.sort((a, b) => b.price - a.price);
        } else if (option === 'rating_asc') {
            // Sort by rating in ascending order
            sortedData.sort((a, b) => a.rating.rate - b.rating.rate);
        } else if (option === 'rating_desc') {
            // Sort by rating in ascending order
            sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        setProductList(sortedData);
    };

    // const handleAddToCart = (item)=>{
    //     dispatch(addToCart(item));
    // }
    // const addToCart = (productId) => {
    //     const updatedData = productlist.map((product) => {
    //         if (product.id === productId) {
    //             return { ...product };
    //         }
    //         return product;
    //     });
    //     setCartData(updatedData);
    // };


    const renderItem = ({ item }) => {
        // const handleAddToCart = () => {
        //     addToCart(item.id);
        // };


        return (<TouchableOpacity style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>$ {item.price}</Text>
            <View style={styles.viewDirection}>
                <Icon name="star" size={15} color="green" />
                <Text style={{ fontSize: 14, color: '#888', }}> {item.rating.rate}</Text>
            </View>
            {cartData.includes(item) ?
                <TouchableOpacity
                    onPress={() => {
                        setCartData(cartData.filter((x) => x.id !== item.id))
                    }}
                    style={[styles.addToCartBtn,{backgroundColor:'#363636'}]}>
                    <Text style={{color:'white'}}>Remove from Cart</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={() => {
                        setCartData([...cartData, item])
                    }}
                    // onPress={() => handleAddToCart(item)}
                    style={styles.addToCartBtn}>
                    <Text>Add to Cart</Text>
                </TouchableOpacity>
            }
        </TouchableOpacity>);
    };

    return (
        <View style={{ backgroundColor: 'white' ,fkex:1}}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="grey" translucent={true} />
            <View style={styles.mainSearchContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                    <Icon name="search" size={15} color="grey" />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => {
                            navigation.navigate("CartList", {cartData})
                        }}>
                        <Text style={{ color: 'white' }}>
                            Cart - {cartData.length}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.sortContainer}>
                <Text style={styles.sortLabel}>Sort By:</Text>
                <TouchableOpacity
                    style={[styles.sortOption, sortOption === 'price_asc' && styles.selectedSortOption]}
                    onPress={() => handleSort('price_asc')}
                >
                    <View style={{ paddingRight: 5 }}><Text>Price</Text></View>
                    <Icon name="arrow-up" size={15} color="#f79b0f" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortOption, sortOption === 'price_desc' && styles.selectedSortOption]}
                    onPress={() => handleSort('price_desc')}
                >
                    <View style={{ paddingRight: 5 }}><Text>Price</Text></View>
                    <Icon name="arrow-down" size={15} color="#f79b0f" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortOption, sortOption === 'rating_asc' && styles.selectedSortOption]}
                    onPress={() => handleSort('rating_asc')}
                >
                    <View style={{ paddingRight: 5 }}><Text>Rating</Text></View>
                    <Icon name="arrow-up" size={15} color="#f79b0f" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortOption, sortOption === 'rating_desc' && styles.selectedSortOption]}
                    onPress={() => handleSort('rating_desc')}
                >
                    <Text>Rating</Text>
                    <View style={{ paddingRight: 5 }}><Icon name="arrow-down" size={15} color="#f79b0f" /></View>
                </TouchableOpacity>
            </View>

            <FlatList
                data={productlist}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                ListFooterComponent={() => <View style={{ margin: 100 }}></View>}
            />
            {/* </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    mainSearchContainer: {
        padding: 5,
        paddingTop: 40,
        flexDirection: 'row',
        width: '100%',
    },
    searchContainer: {
        backgroundColor: '#fff9f0',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        alignItems: 'center',
        paddingRight: 10,
        width: '80%',
        // marginBottom: 10,
    },
    searchInput: {
        height: 40,
        width: '90%',
        paddingHorizontal: 10,
    },
    listContainer: {
        justifyContent: 'space-between',
        flexGrow: 1, marginBottom: 10
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderWidth: 0.5,
        padding: 6,
        borderRadius: 6,
    },
    image: {
        width: 120,
        height: 120,
        marginTop: 5,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    btnStyle: {
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 20,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
    viewDirection:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    sortLabel: {
        marginRight: 10,
        marginLeft: 10
    },
    sortOption: {
        marginRight: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedSortOption: {
        backgroundColor: '#fff9f0',
    },
    addToCartBtn: {
        backgroundColor: "#ff9d0a",
        color: 'black',
        paddingRight: 6,
        paddingLeft: 6,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 5,
        marginTop: 5
    }
});