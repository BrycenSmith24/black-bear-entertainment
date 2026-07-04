document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

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

  const studioEmail = "blackbear.entertainment@gmail.com";

  const jobForm = document.getElementById("job-application-form");
  if (jobForm) {
    jobForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(jobForm);
      const name = fd.get("name") || "";
      const email = fd.get("email") || "";
      const role = fd.get("role") || "";
      const message = fd.get("message") || "";

      const subject = encodeURIComponent(`Job Application - ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nApplying For: ${role}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:${studioEmail}?subject=${subject}&body=${body}`;
    });
  }

  const pitchForm = document.getElementById("film-pitch-form");
  if (pitchForm) {
    pitchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(pitchForm);
      const name = fd.get("name") || "";
      const email = fd.get("email") || "";
      const title = fd.get("title") || "";
      const message = fd.get("message") || "";
      const request = fd.get("request") || "";

      const subject = encodeURIComponent(`Film Pitch - ${title}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nFilm Title: ${title}\nRequested Support: ${request}\n\nPitch:\n${message}`
      );

      window.location.href = `mailto:${studioEmail}?subject=${subject}&body=${body}`;
    });
  }
});
