import { h } from "preact";
import Router from "preact-router";
import { html } from "htm/preact";
import { AppProvider } from "./AppContext.js";

/**
 * @typedef {Object} Props
 * @property {string} url
 * @property {string} share
 */

const Home = () =>
  html`<main style="padding: 2rem"><h1>Hello world</h1></main>`;

/**
 * @param {Props} props
 */
const App = (props) => {
  return html`
    <${AppProvider}>
      <${Router}>
        <${Home} path="/" default />
      </${Router}>
    </${AppProvider}>
  `;
};

export default App;
