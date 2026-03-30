import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#94a3b8"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          placeholderTextColor="#94a3b8"
        />
         <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          placeholderTextColor="#94a3b8"
        />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Already have an account? Log In</Text>
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
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#f1f5f9",
    marginHorizontal: 24,
    marginTop: -45,
    borderRadius: 28,
    padding: 24,
  },
  label: {
    color: "#334155",
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#dff5ea",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#0f172a",
  },
  signupButton: {
    marginTop: 28,
    backgroundColor: "#14d8b4",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  signupText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 16,
  },
  backText: {
    marginTop: 18,
    textAlign: "center",
    color: "#64748b",
  },
});