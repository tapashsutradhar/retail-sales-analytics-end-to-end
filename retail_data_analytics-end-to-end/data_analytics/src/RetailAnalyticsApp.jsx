import { parseCsv } from "./utils/parser";

// inside handleFile:
reader.onload = async () => {
  try {
    const text = reader.result;
    const data = await parseCsv(text);
    setRows(data);
  } catch (err) {
    console.error("Parsing error:", err);
  }
};
