import { Stack } from "expo-router";
import React from "react";

export default function SignUpLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "SignUp"}} />
    </Stack>
  );
}