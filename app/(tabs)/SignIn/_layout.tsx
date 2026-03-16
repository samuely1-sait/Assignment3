import { Stack } from "expo-router";
import React from "react";

export default function SignInLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "SignIn"}} />
    </Stack>
  );
}