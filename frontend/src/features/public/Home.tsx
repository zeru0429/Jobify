import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <>
      <Box>
        <Button onClick={handleClick}>Admin</Button>
        <div>Home</div>
      </Box>
    </>
  );
};

export default Home;
