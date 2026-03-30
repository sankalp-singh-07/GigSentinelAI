import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top green section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
      </View>

      {/* White rounded card */}
      <View style={styles.card}>
        <Text style={styles.label}>Username Or Email</Text>
        <TextInput
          placeholder="example@email.com"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            style={styles.passwordInput}
          />
          <Ionicons name="eye-outline" size={20} color="#64748b" />
        </View> 
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
<TouchableOpacity
  style={styles.signupButton}
  onPress={() => router.push("/register")}
>
  <Text style={styles.signupText}>Sign Up</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },

  header: {
    backgroundColor: "#14d8b4",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerTitle: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#f1f5f9",
    marginHorizontal: 24,
    marginTop: -45,
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  label: {
    color: "#334155",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#dff5ea",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0f172a",
  },

  passwordContainer: {
    backgroundColor: "#dff5ea",
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0f172a",
  },
  loginButton: {
    marginTop: 28,
    backgroundColor: "#14d8b4",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },

  loginText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 16,
  },

  forgotText: {
    textAlign: "center",
    marginTop: 14,
    color: "#64748b",
    fontSize: 13,
  },

  signupButton: {
    marginTop: 18,
    backgroundColor: "#dff5ea",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  signupText: {
    color: "#0f172a",
    fontWeight: "600",
    fontSize: 16,
  },
  
});