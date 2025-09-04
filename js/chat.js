
async function askQuestionToSpace() {
  const input = document.getElementById("chat-input");
  const contentBox = document.getElementById("chat-content");
  const q = input.value.trim();
  if (!q) return;

  contentBox.innerHTML = "🧠 Thinking...";

  try {
    const spaceUrl = "https://huggingface.co/spaces/atharvabillore001/shopper-help-rag";
    const api = spaceUrl + "/api/predict/";

    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [q] })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Space error: " + res.status + " - " + text);
    }

    const json = await res.json();
    // Gradio usually returns output in json.data[0] (or json.data)
    const out = json?.data?.[0] ?? (Array.isArray(json?.data) ? json.data.join("\n") : json.data);
    // If your Space returns plain text or markdown, render with marked (or plain)
    contentBox.innerHTML = marked ? marked.parse(out) : out;
  } catch (err) {
    console.error(err);
    contentBox.innerText = "Error contacting the demo. See console for details.";
  }
}
