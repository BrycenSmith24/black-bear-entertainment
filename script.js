document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const API_ENDPOINT = "https://discordformsend.palmtree145709.workers.dev/submit";

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) return;

    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = href;
      }, 460);
    });
  });

  async function sendToWorker(payload) {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Submission failed");
    }
  }

  const jobForm = document.getElementById("job-application-form");
  if (jobForm) {
    jobForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fd = new FormData(jobForm);

      try {
        await sendToWorker({
          type: "job",
          name: fd.get("name") || "",
          email: fd.get("email") || "",
          role: fd.get("role") || "",
          message: fd.get("message") || ""
        });

        alert("Application sent to Black Bear Entertainment.");
        jobForm.reset();
      } catch (err) {
        alert("Could not send application right now.");
        console.error(err);
      }
    });
  }

  const pitchForm = document.getElementById("film-pitch-form");
  if (pitchForm) {
    pitchForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fd = new FormData(pitchForm);

      try {
        await sendToWorker({
          type: "pitch",
          name: fd.get("name") || "",
          email: fd.get("email") || "",
          title: fd.get("title") || "",
          request: fd.get("request") || "",
          message: fd.get("message") || ""
        });

        alert("Pitch sent to Black Bear Entertainment.");
        pitchForm.reset();
      } catch (err) {
        alert("Could not send pitch right now.");
        console.error(err);
      }
    });
  }
});
