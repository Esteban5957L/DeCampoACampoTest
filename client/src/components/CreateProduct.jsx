import { Container, Button, TextField, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateProduct() {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!name || !price) {
        console.log("Please enter a name and price");
        alert("Please enter a name and price");
        return;
      }
      axios
        .post(`${import.meta.env.VITE_API_URL}/create/`, { name, price })
        .then((res) => {
          console.log(res);
          navigation("/");
        })
        .catch((err) => console.log(err));
    },
    [name, price, navigation]
  );

  return (
    <Container>
      <h2>Create Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#fff",
          color: "rgba(0, 0, 0, 0.87)",
          borderRadius: "4px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="price"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          fullWidth
          required
          type="number"
          inputProps={{ step: 0.01, min: 1.0, max: 1000000.0 }}
        />
        <Stack spacing={1} direction="row" justifyContent="space-evenly">
          <Button
            variant="contained"
            color="error"
            onClick={() => navigation("/")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
