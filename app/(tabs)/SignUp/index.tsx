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

const signUpSchema = z
  .object({
    fullname: z
      .string()
      .regex(/[^A-Za-z\S\\-]/, {message: "Special character not allowed (other than '-' and ' ')"})
      .min(3, { message: "Full name must be at least 3 characters" }),
    email: z.string().trim().email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least 2 Uppercase" })
      .regex(/[a-z]/, { message: "Password must contain at least 2 Lowercase" })
      .regex(/[0-9]/, { message: "Password must contain 1 number" })
      .regex(/[^a-zA-Z0-9\S]/, {
        message:
          "Password must contain at least 1 special character that is not white space",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset, // add reset function to reset form values when canceling edits
    watch, // add watch function to track form values, which will help us keep the save button disabled/enabled
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const watchedValues = watch();

  const isFormFilled = Object.values(watchedValues).every((v) => v.length > 0);

  const onSubmit = (data: SignUpForm) => {
    console.log("Form Data:", data);
  };

  return (
    <ScrollView>
      {/* Full Name*/}
      <Text style={styles.label}>Full Name</Text>
      <Controller
        control={control}
        name="fullname"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.fullname && styles.InputError]}
            placeholder="Jane Doe"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChange={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.fullname && (
        <Text style={styles.error}>{errors.fullname.message}</Text>
      )}

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
      {/*Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.InputError]}
            placeholder="********"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChange={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      <Pressable
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isFormFilled}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SignUp;

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
