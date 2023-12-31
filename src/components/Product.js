import React, { useEffect, useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import StaredSvg from "../assets/starred.svg";
import StarSvg from "../assets/star.svg";
import ArrowSvg from "../assets/arrow.svg";
import EditSvg from "../assets/edit-icon.svg";
import DeleteSvg from "../assets/delete-icon.svg";
import AlertSvg from "../assets/alert.svg";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { updateAllProducts } from "../actions/productActions.js";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

const Products = () => {
  // Local state to manage products
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonStatus, setSearchButtonStatus] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  const primaryColor = "#001EB9";
  // redux
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  // search filter
  const handleSearch = () => {
    if (searchInput.trim() === "") {
      setSearchButtonStatus(false);
      setProducts(allProducts);
    } else {
      setSearchButtonStatus(true);
      const updatedFilteredProducts = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setProducts(updatedFilteredProducts);
    }
  };

  // favourite filter
  const handleClickFavourite = async () => {
    const updatedFilteredProducts = allProducts.filter(
      (product) => product.isFavorite === true
    );
    setProducts(updatedFilteredProducts);
  };

  // favourite
  const handleFavourite = async (id) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/api/products/" + id
      );
      if (response.status === "200") {
        setShowDeleteModal(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error favouriting data:", error);
    }
  };

  // delete
  const handleDelete = async (id) => {
    const key = localStorage.getItem("Key");
    try {
      const response = await axios.delete(
        "http://127.0.0.1:3001/api/products/" + key
      );
      if (response.status === "200") {
        setShowDeleteModal(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const showDeleteConfirmation = (id) => {
    localStorage.setItem("Key", id);
    setShowDeleteModal(true);
  };

  const hideDeleteConfirmation = () => {
    setShowDeleteModal(false);
  };

  const showEditPage = (id) => {
    navigate(`/add-product/${id}`);
  }

  const handleClick = () => {
    // Redirect to the 'addProduct' component
    navigate("/add-product");
  };

  // fetch data
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/api/products");
      const data = response.data;
      console.log(data, 200);
      setProducts(data.data);

      // Dispatch action to update Redux store
      dispatch(updateAllProducts(data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[dispatch, setProducts]);

  useEffect(() => {
    setSearchButtonStatus(false);
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <div style={{ margin: "5% auto 0", width: "80%" }}>
      {/* ADMIN BAR  */}
      <div className="admin-status-container">
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
            }}
          >
            ADMIN
          </Dropdown.Toggle>
        </Dropdown>

        <div className="status-indicator">
          {/* Blue circle */}
          <div className="circle blue-circle" style={{ backgroundColor: primaryColor }}></div>

          {/* Green indicator circle */}
          <div className="circle green-indicator"></div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <h3 align="left">PRODUCTS</h3>
      <br></br>
      {/* search bar start */}
      <div style={{ position: "relative", width: "60%", float: "left" }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for products"
            style={{ borderRadius: "25px", border: "none", backgroundColor: "#f0f0f0" }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="input-group-append">
            <Button
              variant="primary"
              style={{
                backgroundColor: primaryColor,
                borderRadius: "25px",
                marginTop: "5px",
                marginBottom: "5px",
                marginLeft: "-8vw",
                width: "7vw",
                zIndex: "5",
              }}
              onClick={() => handleSearch()}
            >
              <BiSearch style={{ marginRight: "5px" }} />
              Search
            </Button>
          </div>
        </InputGroup>
      </div>
      {/* right side buttons */}
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ margin: "0 10px 0 0", width: "160px", backgroundColor: primaryColor }}
          onClick={handleClick}
        >
          New Product
        </Button>

        <Button
          style={{
            backgroundColor: primaryColor,
            border: "1px solid #007bff",
            borderRadius: "4px",
            background: "white",
            color: "#fff",
          }}
        >
          <img
            src={StaredSvg}
            alt="Star"
            style={{ width: "20px", height: "20px", marginLeft: "5px" }}
            onClick={handleClickFavourite}
          />
        </Button>
      </div>
      {/* Table */}
      {!searchButtonStatus ? (
        <Table>
          <thead>
            <tr>
              <th style={{ color: primaryColor }}>SKU</th>
              <th style={{ color: primaryColor }}>IMAGE</th>
              <th style={{ color: primaryColor }}>PRODUCT NAME</th>
              <th style={{ color: primaryColor }}>QUANTITY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.sku}</td>
                <td>
                  {product.imageUrl.length > 0 ? (
                    <img
                      src={"http://127.0.0.1:3001/" + product.imageUrl[product.imageUrl.length - 1].path}
                      alt={product.productName}
                      style={{ width: "50px" }}
                    />
                  ) : (
                    <div className="status-indicator">
                    <div className="circle blue-circle" style={{ backgroundColor: '#969191', width: "40px", height:'40px' }}></div>
                    </div>
                  )}
                </td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    src={DeleteSvg}
                    alt="Delete"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                    onClick={() => showDeleteConfirmation(product._id)}
                  />
                  <img
                    src={EditSvg}
                    alt="Edit"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                    onClick={() => showEditPage(product._id)}
                  />
                  {product.isFavorite ? (
                    <img
                      src={StaredSvg}
                      alt="Star"
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                      }}
                      onClick={() => {
                        handleFavourite(product._id);
                      }}
                    />
                  ) : (
                    <img
                      src={StarSvg}
                      alt="Star"
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                      }}
                      onClick={() => {
                        handleFavourite(product._id);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Table>
          <thead>
            <tr> {products.length} results found for 'Books'</tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <tr style={{ color: "#007BFF" }}>{product.sku}</tr>
                  <tr style={{ fontWeight: "bold" }}>{product.productName}</tr>
                  <tr>{product.description}</tr>
                </td>
                <td>
                  <p>
                    {" "}
                    <img
                      src={ArrowSvg}
                      alt="Edit"
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                        marginTop: "2vw",
                      }}
                    />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} size="xs" centered>
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
          onClick={() => hideDeleteConfirmation()}
        ></Modal.Header>
        <Modal.Body
          className="d-flex flex-column align-items-center text-center"
          style={{ borderTop: "none", borderBottom: "none" }}
        >
          <div>
            <img
              src={AlertSvg}
              alt="Edit"
              style={{
                width: "50px", // Adjust the width as needed
                marginBottom: "10px", // Add margin at the bottom
              }}
            />
          </div>
          <div className="mb-2">
            <b>
              <p>ARE YOU SURE?</p>
            </b>
          </div>
          <div>
            <p>You will not be able to undo this action if you proceed.</p>
          </div>
          <div>
            <Button
              variant="secondary"
              style={{ borderRadius: "0" }}
              onClick={() => hideDeleteConfirmation()}
            >
              Cancel
            </Button>
            <Button
              style={{ borderRadius: "0", marginLeft: "1vw", backgroundColor: primaryColor, }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
