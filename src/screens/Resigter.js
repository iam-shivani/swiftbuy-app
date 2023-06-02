import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';

export default function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        if(firstname === "" )
        {
            setErrorMessage('Firstname cannot be empty');
        }
        else if(lastname === "" )
        {
            setErrorMessage('Lastname cannot be empty');
        }
        else if (username === "") {
            setErrorMessage('Username cannot be empty');
        }
        else if (password === "" && confirmPassword === "") {
            setErrorMessage('Password cannot be empty');
        }
        else if (username && password && confirmPassword) {
            fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email:'',
                        username:username,
                        password:password,
                        name:{
                            firstname:firstname,
                            lastname:lastname
                        },
                        address:{
                            city:'',
                            street:'',
                            number:0,
                            zipcode:'',
                            geolocation:{
                                lat:'',
                                long:''
                            }
                        },
                        phone:''
                    }
                ),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    navigation.navigate('ProductList');
                    setErrorMessage('');
                }).catch(() => {
                    setErrorMessage('Currently, we are not accepting any new registrations');
                })
        }
        else {
            setErrorMessage('Currently, we are not accepting any new registrations');
        }
    };

    const handleLogin = () => {
        try {
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };
    return (
        <ImageBackground source={require('../../assets/login_bg.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="First name"
                onChangeText={(text) => setFirstname(text)}
                value={firstname}
            />
            <TextInput
                style={styles.input}
                placeholder="Last name"
                onChangeText={(text) => setLastname(text)}
                value={lastname}
            />
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
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.btnStyle}>
                    <Text style={{ color: 'white' }}>REGISTER</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginBottom: -100 }}>
                <Text style={styles.subTitle}>Already have an account?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={{ color: '#f79b0f', fontWeight: 'bold' }}> Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
       </ImageBackground>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 15,
        color: 'grey',
        // fontWeight: 'bold',
        marginBottom: 20
    },
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
        width: '30%',
        alignItems: 'center',
        marginTop: 25
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

