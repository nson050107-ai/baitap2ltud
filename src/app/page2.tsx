import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page2() {
  const { name, studentId } = useLocalSearchParams<{
    name?: string;
    studentId?: string;
  }>();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Pressable style={styles.backButton} onPress={() => router.replace("/")}>
        <Text style={styles.backButtonText}>←</Text>
      </Pressable>

      <View style={styles.information}>
        <Text style={styles.title}>Thông tin sinh viên</Text>
        <Text style={styles.label}>UserName</Text>
        <Text style={styles.value}>{name ?? ""}</Text>
        <Text style={styles.label}>MSSV</Text>
        <Text style={styles.value}>{studentId ?? ""}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#000",
    marginTop: 8,
  },
  backButtonText: { color: "#fff", fontSize: 26, fontWeight: "700" },
  information: { marginTop: 32 },
  title: {
    marginBottom: 28,
    color: "#111827",
    fontSize: 24,
    fontWeight: "700",
  },
  label: { marginTop: 14, color: "#6B7280", fontSize: 14 },
  value: { marginTop: 4, color: "#111827", fontSize: 18, fontWeight: "600" },
});
