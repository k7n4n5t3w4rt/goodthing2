import { h, render } from "preact";
import { html } from "htm/preact";
import App from "./App.js";

const root = document.getElementById("goodthing");
if (root) {
  render(html`<${App} />`, root);
}
