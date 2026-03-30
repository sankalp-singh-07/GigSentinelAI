import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Reset Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a reset link.
        </Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
        />
         <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back to Login</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    color: "#64748b",
    marginBottom: 20,
    lineHeight: 20,
  },
  label: {
    color: "#334155",
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#dff5ea",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#0f172a",
  },
  button: {
    marginTop: 28,
    backgroundColor: "#14d8b4",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
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