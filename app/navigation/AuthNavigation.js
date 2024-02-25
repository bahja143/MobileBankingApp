import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "../screens/SignUpScreen";
import ExchangeNav from "../navigation/ExchangeNav";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreatePinScreen from "../screens/CreatePinScreen";
import PinSignInScreen from "../screens/PinSignInScreen";
import VerificationScreen from "../screens/VerificationScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";
import PasswordSignInScreen from "../screens/PasswordSignInScreen";
import CustomerSupportScreen from "../screens/CustomerSupportScreen";
import ForgotCredentialScreen from "../screens/ForgotCredentialScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="welcome" component={WelcomeScreen} />
    <Stack.Screen name="exchange" component={ExchangeNav} />
    <Stack.Screen name="signUp" component={SignUpScreen} />
    <Stack.Screen name="createPin" component={CreatePinScreen} />
    <Stack.Screen name="signInPin" component={PinSignInScreen} />
    <Stack.Screen name="verify" component={VerificationScreen} />
    <Stack.Screen name="forgot" component={ForgotCredentialScreen} />
    <Stack.Screen name="support" component={CustomerSupportScreen} />
    <Stack.Screen name="normalPassword" component={PasswordSignInScreen} />
    <Stack.Screen name="createPassword" component={CreatePasswordScreen} />
  </Stack.Navigator>
);

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
