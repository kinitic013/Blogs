 const  glassButtonStyle = {
    bg: "rgba(255, 255, 255, 0.1)", // Set a translucent background color
    backdropFilter: "blur(4px)", // Apply a blur filter for the glass effect
    border: "2px solid rgba(255, 255, 255, 0.5)", // Add a translucent border
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a shadow
    color: "white", // Text color
    _hover: {
      bg: "rgba(255, 255, 255, 0.2)", // Change background color on hover
    },
    _active: {
      bg: "rgba(255, 255, 255, 0.3)", // Change background color when active
    },
  };

  export default glassButtonStyle;