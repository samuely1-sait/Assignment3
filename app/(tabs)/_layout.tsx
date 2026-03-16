import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { height: 60 } }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signIn"
        options={{
          title: "SignIn",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "enter" : "enter-outline"} 
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SignUp"
        options={{
          title: "SignUp",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chevron-up" : "chevron-up-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
