import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  const handleUpdate = (id, name, price) => {
    localStorage.setItem(
      "product",
      JSON.stringify({ name: name, price: price })
    );
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`);
        const filterProducts = products.filter((product) => product._id !== id);
        setProducts(filterProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>De Campo A Campo CRUD</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID Products</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<AddCircleIcon />}
                    onClick={handleCreate}
                  >
                    Add Product
                  </Button>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                ? products.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">$ {row.price}</TableCell>
                      <TableCell>
                        <Stack
                          spacing={1}
                          direction="row"
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() =>
                              handleUpdate(row._id, row.name, row.price)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(row._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                : console.log(products)}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
