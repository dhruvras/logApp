import Log from "../modules/log.model.js"

export const getAllData = async (req, res) => {
    try {
        const data = await Log.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}