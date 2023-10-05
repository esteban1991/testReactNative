import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentUI from "./CommentUI.js";

const Comments = ({ navigation, route }) => {
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([
        {
            id: "1",
            title: "todo 1",
            user: "teban",
        },
        {
            id: "2",
            title: "todo 2",
            user: "teban 2",
        },
        {
            id: "3",
            title: "todo 3",
            user: "teban 1",
        },
    ]);
    const [user, setUser] = useState("");

    // fetches username
    const getUsername = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            if (username !== null) {
                setUser(username);
            }
        } catch (err) {
            console.error(err);
        }
    };

    
    useLayoutEffect(() => {
        getUsername();
    }, []);

    // details to the console
    const addComment = () => console.log({ comment, user });

    return (
        <View style={styles.screen}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={(value) => setComment(value)}
                    multiline={true}
                />
                <Button title='Post Comment' onPress={addComment} />
            </View>

            <View>
                <FlatList
                    data={commentsList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommentUI item={item} />}
                />
            </View>
        </View>
    );
};

export default Comments;

const styles = StyleSheet.create({
	screen: {
		padding: 10,
	},
	form: {
		flexDirection: "row",
		marginBottom: 40,
	},
	input: {
		borderWidth: 1,
		padding: 12,
		flex: 1,
		justifyContent: "center",
	},
});