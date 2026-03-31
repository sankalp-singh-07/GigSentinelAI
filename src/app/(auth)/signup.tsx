import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { COLORS } from "../../constants/theme";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Mock signup delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      login({ name, email });
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-emerald-500"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        <View className="mb-8 items-center">
          <Text className="text-white text-4xl font-extrabold mb-2">Join Us</Text>
          <Text className="text-emerald-100 text-lg">Start protecting your income</Text>
        </View>

        <View className="bg-white rounded-3xl p-6 shadow-xl">
          <Text className="text-gray-800 text-2xl font-bold mb-6">Create Account</Text>

          {error ? (
            <Text className="text-red-500 mb-4 font-medium">{error}</Text>
          ) : null}

          <View className="mb-4">
            <Text className="text-gray-500 mb-2 font-semibold">Full Name</Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-800"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 mb-2 font-semibold">Email Address</Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-800"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 mb-2 font-semibold">Password</Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-800"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-500 mb-2 font-semibold">Confirm Password</Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-800"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
            className={`${
              loading ? "bg-emerald-300" : "bg-emerald-500"
            } rounded-xl p-4 items-center shadow-lg`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-500">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-emerald-600 font-bold">Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
