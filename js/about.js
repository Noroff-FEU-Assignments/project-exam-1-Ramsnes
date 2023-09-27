// Select all timeline events
const timelineEvents = document.querySelectorAll(".timeline-event");

// Add event listeners to each event header
timelineEvents.forEach((event) => {
  const eventHeader = event.querySelector("h3");

  eventHeader.addEventListener("click", function () {
    // Toggle the 'active' class to show/hide the content
    event.classList.toggle("active");
  });
});
