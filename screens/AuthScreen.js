import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import firebase from "firebase";
import * as Google from "expo-google-app-auth";
// import * as Google from "expo-google-sign-in"

import { ANDROID_ID } from "@env";
import Colors from "../constants/Colors";
import TextDefault from "../components/TextDefault";

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const signInWithGoogleAsync = async () => {
      try {
            const result = await Google.logInAsync({                                                //login with google
                behavior: "web",
                androidClientId: ANDROID_ID,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {                                                        //if response is success
                await firebase                                                                      //authenticate with firebase
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.LOCAL);        

                const credential = firebase.auth.GoogleAuthProvider.credential(
                    result.idToken,
                    result.accessToken
                );

                const googleProfileData = await firebase
                    .auth()
                    .signInWithCredential(credential);

                    props.navigation.navigate("App");                                               //navigate to App page

            } else {
            return { cancelled: true };
            }
      } catch (e) {
        console.log(e);
        Alert.alert("An error has occured", error, [{ text: "Okay" }]);                             //report error
        return { error: true };
      }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <Button onPress={() => {signInWithGoogleAsync()}} title="Login with Google" />
      )}
      <TextDefault >App currently in development, information likely to be lost in upcoming updates</TextDefault>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
export default AuthScreen;
