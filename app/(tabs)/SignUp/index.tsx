import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { theme } from "@/styles/theme";

const SignUpSchema = z.object({
  fullname: z.string().min(3, "Full name must be at least 3 characters").regex (/[A-Za-z\\-]/),
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least 2 Uppercase" })
    .regex(/[a-z]/, { message: "Password must contain at least 2 Lowercase" })
    .regex(/[0-9]/, { message: "Password must contain 1 number" })
    .regex(/[^a-zA-Z0-9\S]/, {
      message: "Password must contain at least 1 special character that is not white space",
    }),
  confirmPassword: z.string 
});

const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
