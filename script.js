document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  if (localStorage.getItem("atlantic_logged_in") !== "yes" && !window.location.pathname.endsWith("login.html")) {
    window.location.href = "login.html";
    return;
  }

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
      const subject = encodeURIComponent(`Job Application - ${fd.get("name") || ""}`);
      const body = encodeURIComponent(
        `Name: ${fd.get("name") || ""}\nEmail: ${fd.get("email") || ""}\nApplying For: ${fd.get("role") || ""}\n\nMessage:\n${fd.get("message") || ""}`
      );

      window.location.href = `mailto:${studioEmail}?subject=${subject}&body=${body}`;
    });
  }

  const pitchForm = document.getElementById("film-pitch-form");
  if (pitchForm) {
    pitchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(pitchForm);
      const subject = encodeURIComponent(`Film Pitch - ${fd.get("title") || ""}`);
      const body = encodeURIComponent(
        `Name: ${fd.get("name") || ""}\nEmail: ${fd.get("email") || ""}\nFilm Title: ${fd.get("title") || ""}\nRequested Support: ${fd.get("request") || ""}\n\nPitch:\n${fd.get("message") || ""}`
      );

      window.location.href = `mailto:${studioEmail}?subject=${subject}&body=${body}`;
    });
  }
});
