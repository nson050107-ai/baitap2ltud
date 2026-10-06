import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const trimmedName = name.trim();
  const trimmedStudentId = studentId.trim();
  const studentIdPattern = /^B[A-Z]{2}\d{6}$/;
  const isValidStudentId = (value: string) => studentIdPattern.test(value.toUpperCase());
  const nameError = submitted && !trimmedName;
  const studentIdError = submitted && !trimmedStudentId;
  const invalidStudentIdFormat = submitted && trimmedStudentId && !isValidStudentId(trimmedStudentId);

  const handleStudentIdChange = (value: string) => {
    const raw = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (!raw) {
      setStudentId("");
      return;
    }

    const normalized = raw.startsWith("B") ? raw.slice(1) : raw;
    let letters = "";
    let digits = "";

    for (const char of normalized) {
      if (/[A-Z]/.test(char) && letters.length < 2) {
        letters += char;
      } else if (/[0-9]/.test(char) && digits.length < 6) {
        digits += char;
      }
    }

    setStudentId(`B${letters}${digits}`.slice(0, 9));
  };

  const handleContinue = () => {
    setSubmitted(true);

    if (!trimmedName || !trimmedStudentId || !isValidStudentId(trimmedStudentId)) {
      return;
    }

    router.push({
      pathname: "/page2",
      params: { name: trimmedName, studentId: trimmedStudentId },
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.layout}>
            <View style={[styles.box, styles.box1]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, styles.box2]}>
              <Text style={styles.boxText}>2</Text>
            </View>

            <View style={styles.middleRow}>
              <View style={[styles.box, styles.middleBox, styles.box3]}>
                <Text style={[styles.boxText, styles.textBlack]}>3</Text>
              </View>
              <View style={[styles.box, styles.middleBox, styles.box4]}>
                <Text style={styles.boxText}>4</Text>
              </View>
              <View style={[styles.box, styles.middleBox, styles.box5]}>
                <Text style={styles.boxText}>5</Text>
              </View>
            </View>

            <View style={[styles.box, styles.box6]}>
              <Text style={styles.boxText}>6</Text>
            </View>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, nameError && styles.inputError]}
              value={name}
              onChangeText={setName}
              placeholder="UserName"
              autoCapitalize="words"
            />
            {nameError && (
              <Text style={styles.errorText}>Vui lòng nhập UserName.</Text>
            )}

            <TextInput
              style={[styles.input, (studentIdError || invalidStudentIdFormat) && styles.inputError]}
              value={studentId}
              onChangeText={handleStudentIdChange}
              placeholder="Ví dụ: BXX123456"
              autoCapitalize="characters"
              maxLength={9}
              keyboardType="default"
            />
            {studentIdError && (
              <Text style={styles.errorText}>Vui lòng nhập MSSV.</Text>
            )}
            {!studentIdError && invalidStudentIdFormat && (
              <Text style={styles.errorText}>
                MSSV phải có dạng BXX123456 (2 chữ cái + 6 chữ số).
              </Text>
            )}
          </View>

          <Pressable style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Click me</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  keyboardContainer: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  layout: { width: "100%", maxWidth: 600, gap: 10 },
  middleRow: {
    width: "76%",
    flexDirection: "row",
    gap: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  boxText: { color: "#fff", fontSize: 48, fontWeight: "700" },
  textBlack: { color: "#000" },
  box1: { height: 115, backgroundColor: "#287fe5" },
  box2: { height: 115, backgroundColor: "#ff3b3f" },
  middleBox: { flex: 1, height: 240 },
  box3: { backgroundColor: "#ffd21c" },
  box4: { backgroundColor: "#2caf6c" },
  box5: { backgroundColor: "#7d3fe0" },
  box6: {
    height: 200,
    backgroundColor: "#ff7611",
  },
  form: {
    width: "100%",
    maxWidth: 600,
    gap: 8,
    paddingTop: 10,
    paddingBottom: 12,
  },
  input: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 8,
    color: "#111827",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "#DC2626" },
  errorText: { marginBottom: 2, color: "#DC2626", fontSize: 13 },
  button: {
    alignSelf: "center",
    minWidth: 120,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#111827",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
