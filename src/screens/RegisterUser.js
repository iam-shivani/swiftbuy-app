import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';

const RegisterUse = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        if (username = "") {
            setErrorMessage('Username cannot be empty');
        }
        else {
            if (username && password && password === confirmPassword) {
            
                try {
                    const response = await fetch('https://fakestoreapi.com/users/', { //the device ip address 
                        method: "POST",
                        body: JSON.stringify(
                            {
                                email: 'John@gmail.com',
                                username: 'johnd',
                                password: 'm38rmF$',
                                name: {
                                    firstname: 'John',
                                    lastname: 'Doe'
                                },
                                address: {
                                    city: 'kilcoole',
                                    street: '7835 new road',
                                    number: 3,
                                    zipcode: '12926-3874',
                                    geolocation: {
                                        lat: '-37.3159',
                                        long: '81.1496'
                                    }
                                },
                                phone: '1-570-236-7033'
                            }
                        )
                    })
                    const data = await response.json();
                    console.log(data)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                setErrorMessage('');
                console.log('Registration successful');
            } else {
                setErrorMessage('Please enter valid credentials');
            }
        }
    };

    return (
        // <ImageBackground source={require('../assets/register_img.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
            />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TouchableOpacity
                onPress={handleRegister}
                style={styles.btnStyle}>
                <Text style={{ color: 'white' }}>REGISTER</Text>
            </TouchableOpacity>
        </View>
        // </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' for different image resizing options
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
        alignItems: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default RegisterUse;
