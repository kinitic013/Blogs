import { useState } from "react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

function Item(props) {
  const [isTruncated, setIsTruncated] = useState(true);
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <Card
      p="40px"
      color="black"
      mt="4"
      bg="rgba(255, 255, 255, 0.1)"
      rounded="md"
      shadow="md"
      className="item"
      maxW="1200px"
      w="100%"
      backdropFilter="blur(8px)"
      borderWidth="2px"
      borderColor="rgba(255, 255, 255, 0.1)"
    >
      <CardHeader>
        <Text className="author">{props.authorId}</Text>
        <Text className="title" noOfLines={[3]} value={props.Head}>
          {props.Head}
        </Text>
      </CardHeader>

      <CardBody className="body">
        <Text noOfLines={isTruncated ? 2 : undefined}>{props.Head}</Text>
        {props.Head.length > 100 && (
          <Button onClick={toggleTruncate} variant="link" size="sm" mt={2}>
            {isTruncated ? "Read More" : "Read Less"}
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

export default Item;
