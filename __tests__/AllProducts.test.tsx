import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AllProducts from "../src/components/AllProducts/AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductByAdmin,
  useFetchProducts,
} from "../src/controller/productController";

jest.mock("../src/config/firebase", () => ({}));

jest.mock("../src/controller/productController", () => ({
  deleteProductByAdmin: jest.fn(),
  useFetchProducts: jest.fn(),
}));

jest.mock("../src/components/utils/IntersectionObserver", () =>
  jest.fn(() => jest.fn())
);

jest.mock("../src/components/Navbar/Navbar", () => ({ children }: any) => (
  <>{children}</>
));

describe("AllProducts Component", () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const products = [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      photo: ["photo1.jpg"],
      rating: ["4.5"],
    },
    {
      id: "2",
      name: "Product 2",
      price: 200,
      photo: ["photo2.jpg"],
      rating: ["4.0"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        productReducer: { products },
        userReducer: { user: { isAdmin: true } },
      })
    );
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useFetchProducts as jest.Mock).mockImplementation(() => {});
  });

  it("renders products", async () => {
    render(<AllProducts />);
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("navigates to product details when product is clicked", async () => {
    render(<AllProducts />);
    fireEvent.click(screen.getByText("Product 1"));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/product-details/1");
    });
  });

  it("calls deleteProductByAdmin when delete button is clicked by admin", async () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        productReducer: { products },
        userReducer: { user: { isAdmin: true } },
      })
    );
    render(<AllProducts />);
    fireEvent.click(screen.getAllByTestId("dummy-delete")[0]);
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(deleteProductByAdmin).toHaveBeenCalledWith("1", dispatchMock);
    });
  });
});
