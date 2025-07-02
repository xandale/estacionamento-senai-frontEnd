import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Veiculos from "./Veiculo";

jest.mock("axios");

describe("Veiculos Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs and buttons", () => {
    render(<Veiculos />);
    expect(screen.getByPlaceholderText("Placa")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Modelo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cor")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  test("fetches and displays vehicles", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id_veiculo: 1, placa: "ABC-1234", modelo: "Carro", cor: "Azul", tipo_veiculo: "Carro" },
      ],
    });

    render(<Veiculos />);
    expect(await screen.findByText("Placa: ABC-1234")).toBeInTheDocument();
  });

  test("creates a new vehicle", async () => {
    axios.post.mockResolvedValueOnce({});
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Veiculos />);
    fireEvent.change(screen.getByPlaceholderText("Placa"), { target: { value: "ABC-1234" } });
    fireEvent.change(screen.getByPlaceholderText("Modelo"), { target: { value: "Carro" } });
    fireEvent.change(screen.getByPlaceholderText("Cor"), { target: { value: "Azul" } });
    fireEvent.click(screen.getByText("Cadastrar"));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/veiculos",
      expect.objectContaining({ placa: "ABC-1234", modelo: "Carro", cor: "Azul" }),
      expect.any(Object)
    );
  });
});
