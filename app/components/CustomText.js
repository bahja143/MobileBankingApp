import { Text } from "react-native";

export default function CustomText({
  bold,
  light,
  style,
  children,
  semibold,
  ...otherProps
}) {
  return (
    <Text
      style={[
        {
          fontFamily: bold
            ? "Inter_700Bold"
            : semibold
            ? "Inter_500Medium"
            : light
            ? "Inter_300Light"
            : "Inter_400Regular",
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
