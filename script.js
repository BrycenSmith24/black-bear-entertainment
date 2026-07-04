document.addEventListener("DOMContentLoaded", () => {

    // Fade in page when loaded
    document.body.classList.add("loaded");

    // Handle navigation transitions
    document.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("http") &&
            !link.hasAttribute("target")
        ) {

            link.addEventListener("click", function (e) {

                e.preventDefault();

                document.body.classList.add("page-exit");

                setTimeout(() => {
                    window.location.href = href;
                }, 500);

            });

        }

    });

});
