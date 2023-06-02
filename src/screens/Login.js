import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = () => {

        try {
            //  fetch('https://fakestoreapi.com/users/1').then(res=>res.json())
            // .then(json=>{
            //     console.log(json)
            //     if (username === json['username'] && password === json['password']) {
            //         navigation.navigate('ProductList');
            //         setErrorMessage('');
            //     } else {
            //         setErrorMessage('Invalid credentials');
            //     }
            // })
            if (username === "" && password === "") {
                setErrorMessage('Fields cannot be empty');
            }
            else if (username && password) {
                fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        navigation.navigate('ProductList');
                        setErrorMessage('');
                    }).catch(()=>{
                        setErrorMessage('Invalid credentials');
                    })
            }
            else {
                setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Invalid credentials');
        }
    };

    const handleRegister = () => {

        try {
            navigation.navigate('Register');
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };


    useEffect(() => {
        setErrorMessage('');
    }, []);
    return (
        <ImageBackground source={require('../../assets/login_bg.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View>
                <Text style={styles.subTitle}>Please Sign in into your Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username (Enter donero)"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password (Enter ewedon)"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.btnStyle}>
                        <Text style={{ color: 'white' }}>LOGIN</Text>
                        {/* <Icon name="rocket" size={30} color="#900" /> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginBottom: -100 }}>
                <Text style={styles.subTitle}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={{ color: '#f79b0f', fontWeight: 'bold' }}> Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add transparency for the background image
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 15,
        color: 'grey',
        // fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
    btnStyle: {
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        width: '25%',
        alignItems: 'center',
        marginTop: 25
    },
    error: {
        color: 'red',
        // marginBottom: 10,
    },
});