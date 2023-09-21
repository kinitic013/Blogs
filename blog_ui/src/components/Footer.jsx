import React from "react"
import { Box } from "@chakra-ui/react";

function Footer()
{
    return  <Box
    as="footer"
    p={4}
    position="fixed"
    bottom="0"
    width="100%"
    textAlign="center"
  >
    © {new Date().getFullYear()} Benzene.co.in All rights reserved.
  </Box>
}

export default Footer;