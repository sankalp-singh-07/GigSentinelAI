import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { COLORS } from "../../constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Mock login delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      login({ name: "Rahul", email });
      // Navigation will be handled by the root layout redirecting to (tabs)
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-emerald-500 justify-center px-6"
    >
      <View className="mb-10 items-center">
        <Text className="text-white text-4xl font-extrabold mb-2">GigSentinel</Text>
        <Text className="text-emerald-100 text-lg">Secure your earnings today</Text>
      </View>

      <View className="bg-white rounded-3xl p-6 shadow-xl">
        <Text className="text-gray-800 text-2xl font-bold mb-6">Login</Text>

        {error ? (
          <Text className="text-red-500 mb-4 font-medium">{error}</Text>
        ) : null}

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

        <View className="mb-6">
          <Text className="text-gray-500 mb-2 font-semibold">Password</Text>
          <TextInput
            className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-800"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
          className={`${
            loading ? "bg-emerald-300" : "bg-emerald-500"
          } rounded-xl p-4 items-center shadow-lg`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-500">Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="text-emerald-600 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
