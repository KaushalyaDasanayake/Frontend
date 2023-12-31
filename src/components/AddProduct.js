import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown } from "react-bootstrap";
import ArrowSvg from "../assets/arrow.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
    const primaryColor = "#001EB9";
    const [productData, setProductData] = useState({
        sku: "",
        productName: "",
        quantity: "",
        description: "",
    });
    const [imageFiles, setImageFiles] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const files = event.target.files;
        setImageFiles(files);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();

            // Append product data dynamically
            Object.keys(productData).forEach((key) => {
                formData.append(key, productData[key]);
            });

            // Append image files if available
            if (imageFiles) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append("images", imageFiles[i]);
                }
            }

            const response = await axios.post("http://localhost:3001/api/products", formData);

            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

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
                    <div className="circle blue-circle" style={{ backgroundColor: primaryColor}}></div>

                    {/* Green indicator circle */}
                    <div className="circle green-indicator"></div>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <h3
                style={{
                    display: "flex",
                    alignItems: "center",
                    letterSpacing: "2px",
                    fontWeight: "bold",
                }}
            >
                PRODUCTS
                <span
                    style={{
                        display: "flex",
                        marginLeft: "10px",
                        alignItems: "center",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: primaryColor,
                    }}
                >
                    <img
                        src={ArrowSvg}
                        alt="Arrow"
                        style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "5px",
                        }}
                    />
                    Add New Product
                </span>
            </h3>

            <div className="container mt-5">
                <form className="row" onSubmit={handleFormSubmit}>
                    {/* First Row */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mb-3">
                                <label
                                    htmlFor="sku"
                                    className="col-sm-2 col-form-label"
                                    style={{ fontWeight: 500 }}
                                >
                                    SKU
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        style={{ border: "none", backgroundColor: "#f0f0f0" }}
                                        id="sku"
                                        name="sku"
                                        value={productData.sku}
                                        onChange={(e) =>
                                            setProductData({ ...productData, sku: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mb-3">
                                <label
                                    htmlFor="productName"
                                    className="col-sm-2 col-form-label"
                                    style={{ fontWeight: 500 }}
                                >
                                    Name
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        style={{ border: "none", backgroundColor: "#f0f0f0" }}
                                        id="productName"
                                        name="productName"
                                        value={productData.productName}
                                        onChange={(e) =>
                                            setProductData({
                                                ...productData,
                                                productName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="row mb-3">
                                <label
                                    htmlFor="quantity"
                                    className="col-sm-2 col-form-label"
                                    style={{ fontWeight: 500 }}
                                >
                                    Qty
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        pattern="[0-9]*"
                                        style={{ border: "none", backgroundColor: "#f0f0f0" }}
                                        id="quantity"
                                        name="quantity"
                                        value={productData.quantity}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            setProductData({
                                                ...productData,
                                                quantity: numericValue,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label
                            htmlFor="discription"
                            className="col-sm-12 col-form-label"
                            style={{ fontWeight: 500 }}
                        >
                            Description
                        </label>

                        <label
                            htmlFor="discription"
                            className="col-sm-12 col-form-label"
                            style={{ fontSize: "12px", color: "#969191" }}
                        >
                            A small description about the product
                        </label>

                        <div className="col-sm-12">
                            <input
                                type="text"
                                className="form-control"
                                required
                                style={{
                                    border: "none",
                                    backgroundColor: "#f0f0f0",
                                    height: "90px",
                                    width: "102%",
                                }}
                                id="description"
                                name="description"
                                value={productData.description}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Image Uploader */}
                    <div className="row mb-3">
                        <div className="row">
                            <div className="col-sm-2">
                                <label
                                    htmlFor="image"
                                    className="col-form-label"
                                    style={{ fontWeight: 500 }}
                                >
                                    Product Image
                                </label>
                            </div>

                            <div className="col-sm-2" style={{ marginLeft: "-50px" }}>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imageInput"
                                    name="image"
                                    style={{ display: "none" }}
                                    multiple
                                    onChange={handleFileChange}
                                />

                                <label
                                    htmlFor="imageInput"
                                    style={{
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        marginLeft: "10px",
                                        color: primaryColor,
                                    }}
                                >
                                    Add Images
                                </label>
                            </div>
                        </div>

                        <div>
                            <p
                                className="col-form-label"
                                style={{ fontSize: "12px", color: "#969191" }}
                            >
                                JPEG, PNG, SVG, or GIF <br />
                                (Maximum file size 50MB)
                            </p>
                        </div>
                    </div>

                    <Col sm={12} className="mt-3 d-flex justify-content-end">
                        <Button
                            type="submit"
                            variant="primary"
                            style={{
                                backgroundColor: primaryColor,
                                color: "white",
                                width: "160px",
                            }}
                        >
                            Add Product
                        </Button>
                    </Col>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
