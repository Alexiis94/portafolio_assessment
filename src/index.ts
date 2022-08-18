import app from "./app";
import "./database";

app.listen(app.get("port"));
console.log("Server On port", app.get("port"));
