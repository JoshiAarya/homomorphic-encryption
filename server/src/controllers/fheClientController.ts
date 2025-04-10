import { Request, Response } from "express";
import axios from "axios";

export const sendUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const inputData = req.body;

    await axios.post("http://localhost:8001/encrypt", {
      input: inputData,
    });

    res.status(200).json({ msg: "Data encrypted successfully" });
  } catch (err: any) {
    console.error("Encryption failed:", err?.response?.data || err.message);
    res.status(500).json({ error: "Encryption failed" });
  }
};

export const fetchPrediction = async (req: Request, res: Response): Promise<void> => {
  try {
    const decryptRes = await axios.get("http://localhost:8001/decrypt");

    const { salary } = decryptRes.data;
    res.status(200).json({ salary });
  } catch (err: any) {
    console.error("Decryption failed:", err?.response?.data || err.message);
    res.status(500).json({ error: "Decryption failed" });
  }
};
