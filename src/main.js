import "lugano-planb-vite-theme/theme.css";
import { mountPlanBHeader } from "lugano-planb-vite-theme";

const app = document.querySelector("#app");

mountPlanBHeader({
  target: app,
  headerContent: {
    eyebrow: "Lugano LIPS",
    title: "Lugano Improvement Proposals",
    lede: "Community-authored improvement proposals for Lugano Plan B.",
  },
});

const content = document.createElement("main");
content.className = "planb-container planb-main";
content.innerHTML = `
  <section class="planb-panel">
    <h2>Latest proposals</h2>
    <p>Render your repository content here.</p>
  </section>
`;

app.append(content);
