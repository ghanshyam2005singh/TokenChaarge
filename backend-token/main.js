const {
  Wallet,
  JsonRpcProvider,
  Contract,
  parseEther,
  ethers,
} = require("ethers");
require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Importar CORS

const app = express();
app.use(cors());

app.use(express.json());

// Configura el proveedor RPC
const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Inicializa la billetera con el proveedor
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

// Configura el contrato
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  "function recharge(address account, uint256 amount) public",
];
const contract = new Contract(contractAddress, contractABI, wallet);

// Endpoint de recarga
app.post("/recharge", async (req, res) => {
  const { account, amount } = req.body;
  try {
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance (wei): ${balance.toString()} wei`);

    const tx = await contract.recharge(
      account,
      parseEther(amount.toString()) // Cambia aquí la llamada a parseEther
    );
    await tx.wait();
    res.json({ status: "Success", txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
});

// Inicia el servidor
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
