import { useState } from "react";
import { Button, View, Text } from "react-native";
import * as MailComposer from "expo-mail-composer";

export default function App() {
  const [result, setResult] = useState(null);

  const sendMessage = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        setResult({
          success: false,
          message: "Email is not available on this device.",
        });
        return;
      }

      const response = await MailComposer.composeAsync({
        recipients: ["test@test.local"],
        subject: "Test",
        body: "Test",
      });

      if (response.status === MailComposer.MailComposerStatus.SENT) {
        setResult({ success: true, message: "Sent" });
      } else if (
        response.status === MailComposer.MailComposerStatus.CANCELLED
      ) {
        setResult({ success: false, message: "Cancelled" });
      } else if (response.status === MailComposer.MailComposerStatus.SAVED) {
        setResult({ success: true, message: "Draft saved" });
      } else {
        setResult({ success: false, message: "Failed to send" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setResult({ success: false, message: String(error) });
    }
  };

  return (
    <View
      style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button onPress={sendMessage} title="Send message" />

      {result && (
        <Text textAlign="center" color={result.success ? "$green" : "$red"}>
          {result.message}
        </Text>
      )}
    </View>
  );
}
