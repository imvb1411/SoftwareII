import React from "react";
import { StyleSheet, Text, View, Image, Button} from "react-native";
import * as Expo from 'expo';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }
    signIn = async () =>{
        try {
            console.log("Login1");
            const result = await Expo.Google.logInAsync({
                androidClientId: "940449004503-6h5q7ppi14c0ii7992eqg56gmm07v0d5.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });
            console.log("Login2");
            if (result.type === 'success') {
                console.log("Entro");
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl})
            } else {
                console.log("Cancelled");
            }
        } catch (e) {
            console.log("Error",e);
        }
    }
    render() {
        return (
        <View style={styles.container}>
            {this.state.signedIn ?
                (<LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl}/>)
                :
                (<LoginPage signIn={this.signIn}/>)}
        </View>
        )
    }
}

const LoginPage = props =>{
    return (
        <View>
            <Text style={styles.header}> Login con Google</Text>
            <Button title="Login con Google" onPress={()=>props.signIn()}/>
        </View>
    )
}

const LoggedInPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Bienvenido:{props.name}</Text>
            <Image style={styles.image} source={{ uri: props.photoUrl }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})

