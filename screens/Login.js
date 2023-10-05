import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Pressable,
} from "react-native";

import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from '../components/Logo'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");

	const handleLogin = () => {
		storeUsername(username);   
		 navigation.navigate("Home");
	};

	const storeUsername = async (value) => {
		try {
			await AsyncStorage.setItem("username", value);
		} catch (err) {
			console.error(err);
		}
	};


    return (
        <SafeAreaView style={styles.loginScreen}>           
                
              
            <View style={styles.loginContainer}>
          
            <Logo style={styles.icon} ></Logo>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginBottom: 15,
                        textAlign: "center",
                    }}
                >
                    Login
                </Text>
             
                <View style={{ width: "100%" }}>
                    <TextInput
                        id='inputLog'
                        style={styles.textInput}
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>
                <Pressable onPress={handleLogin} style={styles.loginButton}>
                    <View>
                        <Text id="btn_id" style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
                            SIGN IN
                        </Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Login;


const styles = StyleSheet.create({
	loginScreen: {
		flex: 1,
      
	},
	loginContainer: {
		flex: 2,
		padding: 10,
		flexDirection: "column",
		justifyContent: "center",      
        
	},
	textInput: {
		borderWidth: 1,
		width: "100%",
		padding: 12,
		marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        
	},
	loginButton: {
		width: 150,
		backgroundColor: "#555555",
		padding: 15,
        borderRadius: 10,
        marginTop:40,
        marginLeft:120      
        
	},
    icon:{
        paddingLeft: 8,
        width: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'

    },

});