import { aiDetect } from "../api.js";
import Log from "../modules/log.model.js"


async function logController(req, res) {
  try {
    const { description, notes, time } = req.body;
    const tags = await aiDetect(description, notes);
    const log = {
      description,
      notes,
      time,
      tags,
    };

    const createLog = await Log.create(log);
    res.status(201).json({
      message: "Log created successfully",
      log: createLog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

export { logController };