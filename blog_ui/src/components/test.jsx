import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function PopUp() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>
        Your Chakra experience may be degraded.
      </AlertDescription>
    </Alert>
  );
}

export {PopUp} ;