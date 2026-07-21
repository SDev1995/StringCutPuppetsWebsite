async function loadUpcomingGigs() {
    const gigList = document.getElementById("gig-list");

    if (!gigList) {
        return;
    }

    try {
        const response = await fetch("data/gigs.json");

        if (!response.ok) {
            throw new Error("Unable to load gigs.");
        }

        const gigs = await response.json();

        const upcomingGigs = gigs
            .filter((gig) => new Date(gig.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);

        if (upcomingGigs.length === 0) {
            gigList.innerHTML = "<p>No upcoming shows announced.</p>";
            return;
        }

        gigList.innerHTML = upcomingGigs
            .map((gig) => {
                const date = new Date(`${gig.date}T12:00:00`);

                const formattedDate = new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }).format(date);

                const ticketLink = gig.ticketUrl
                    ? `<a class="button button-secondary" href="${gig.ticketUrl}">Tickets</a>`
                    : "<span>Details soon</span>";

                return `
                    <article class="gig-card">
                        <time class="gig-date" datetime="${gig.date}">
                            ${formattedDate}
                        </time>

                        <div>
                            <strong>${gig.venue}</strong>
                            <div class="gig-location">${gig.location}</div>
                        </div>

                        ${ticketLink}
                    </article>
                `;
            })
            .join("");
    } catch (error) {
        console.error(error);
        gigList.innerHTML = "<p>Shows could not be loaded.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadUpcomingGigs);