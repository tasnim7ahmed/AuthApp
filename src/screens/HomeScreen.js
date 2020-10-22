import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    if (response.ok) {
      setPosts(response.data);
    }
  };

  const loadUsers = async () => {
    const response = await getUsers();
    if (response.ok) {
      setUsers(response.data);
    }
    setLoading(false);
  };
  const getName = (id) => {
    let Name = "";
    users.forEach((element) => {
      if (element.id == id) Name = element.name;
    });
    return Name;
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  if (!loading) {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Header
              leftComponent={{
                icon: "menu",
                color: "#fff",
                onPress: function () {
                  props.navigation.toggleDrawer();
                },
              }}
              centerComponent={{ text: "The Office", style: { color: "#fff" } }}
              rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: function () {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                },
              }}
            />
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
              />
              <Button title="Post" type="outline" onPress={function () {}} />
            </Card>

            <FlatList
              data={posts}
              renderItem={function ({ item }) {
                return (
                  <PostCard
                    author={getName(item.userId)}
                    title={item.title}
                    body={item.body}
                  />
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;
