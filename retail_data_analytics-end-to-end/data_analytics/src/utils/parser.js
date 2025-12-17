// src/utils/parser.js
import Papa from "papaparse";

/**
 * Parse CSV text into normalized rows.
 * Expected columns: OrderID, Date, Customer, Product, Category, Quantity, Price, Region
 */
export function parseCsv(text) {
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        try {
          const data = result.data.map((r) => ({
            OrderID: r.OrderID || r.orderId || r.Order || "",
            Date: r.Date ? new Date(r.Date) : new Date(r.date || Date.now()),
            Customer: r.Customer || r.customer || "Unknown",
            Product: r.Product || r.product || "",
            Category: r.Category || r.category || "Uncategorized",
            Quantity: Number(r.Quantity || r.quantity || 1),
            Price: Number(r.Price || r.price || 0),
            Region: r.Region || r.region || "Unknown",
          }));
          resolve(data);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
}
