import { calculateRisk } from "../components/scanner.js";
import { analyzeChatLogic } from "../components/chatAnalyzer.js";
import { showResult } from "../components/ui.js";

window.scan = function () {
  const data = {
    location: document.getElementById("location").checked,
    phone: document.getElementById("phone").checked,
    sameuser: document.getElementById("sameuser").checked
  };

  const score = calculateRisk(data);
  showResult(score);
};

window.analyzeChat = function () {
  const text = document.getElementById("chat").value;
  const result = analyzeChatLogic(text);

  document.getElementById("chatResult").innerText = result;
};
