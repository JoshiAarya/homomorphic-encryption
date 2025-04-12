import { Request, Response } from "express";
import axios from "axios";

// This controller sends user input to the FHE client microservice and returns the decrypted prediction.
export const sendAndGetPrediction = async (req: Request, res: Response): Promise<void> => {
  try {
    // For testing, using static input data for now.
    const userData = [8.5, 400, 750, 2, 3, 5, 80, 7, 2];

    // Use host.docker.internal if the FHE client container is running in Docker on the same machine.
    const url = "http://localhost:8010/sendandgetprediction";
    
    const response = await axios.post(url, { input: userData }, {
      headers: { "Content-Type": "application/json" },
    });
    
    const { salary } = response.data;
    res.status(200).json({ salary });
  } catch (err: any) {
    console.error("FHE pipeline error:", err?.response?.data || err.message);
    res.status(500).json({ error: "FHE pipeline failed" });
  }
};
