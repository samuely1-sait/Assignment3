import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { theme } from "@/styles/theme";

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least 2 Uppercase" })
    .regex(/[a-z]/, { message: "Password must contain at least 2 Lowercase" })
    .regex(/[0-9]/, { message: "Password must contain 1 number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least 1 special character",
    }),
});

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset, // add reset function to reset form values when canceling edits
    watch, // add watch function to track form values, which will help us keep the save button disabled/enabled
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  

  const watchedValues = watch();

  const isFormFilled = Object.values(watchedValues).every((v) => v.length > 0);


  const onSubmit = (data: SignInForm) => {
    console.log("Form Data:", data);
  }
  
  return (
    <ScrollView>
      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.InputError]}
            placeholder="e.g example@example.com"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChange={onChange}
            keyboardType="email-address"
            autoCapitalize="words"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.InputError]}
            placeholder="********"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChange={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Pressable
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isFormFilled}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16,
  },
  error: {
    color: theme.colors.error,
    fontSize: 13,
    marginTop: 4,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 14,
    fontSize: 16,
    color: theme.colors.text,
  },
  InputError: {
    borderColor: theme.colors.error,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
    button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});
