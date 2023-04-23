import { Container, Button, TextField, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct() {
  const product = JSON.parse(localStorage.getItem("product"));
  const [price, setPrice] = useState(product.price);
  const [name, setName] = useState(product.name);
  const { id } = useParams();
  const navigation = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (window.confirm("Are you sure you want to update the item?")) {
        axios
          .put(`${import.meta.env.VITE_API_URL}/update/${id}`, { name, price })
          .then((res) => {
            localStorage.clear();
            console.log(res);
            navigation("/");
          })
          .catch((err) => console.log(err));
      }
    },
    [id, name, price, navigation]
  );

  return (
    <Container>
      <h2>Update Product</h2>
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
          disabled
          id="id-disabled"
          label="ID Products"
          defaultValue={id}
          margin="normal"
          fullWidth
        />
        <TextField
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          defaultValue={name}
          required
          fullWidth
        />
        <TextField
          id="price"
          label="Price"
          margin="normal"
          fullWidth
          type="number"
          defaultValue={price}
          required
          inputProps={{ step: 0.01, min: 1.0, max: 1000000.0 }}
          onChange={(e) => setPrice(e.target.value)}
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
            Update
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
