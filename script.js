const targetCounts = {
    codeforces: 750,
    leetcode: 150,
    total: 1200
};

// Time in milliseconds for the count to complete (e.g., 3 seconds)
const duration = 3000;

// Function to increment the numbers smoothly
function animateCount(id, end) {
    const element = document.getElementById(id);
    let start = 0;
    const increment = end / (duration / 30); // Calculate how much to increment per frame
    const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
            start = end;
            clearInterval(interval);
        }
        element.innerText = Math.floor(start) + '+';
    }, 30); // Update every 30ms
}

// Intersection Observer to trigger counting when 50% of the section is visible
document.addEventListener("DOMContentLoaded", function () {
    const problemSolvingSection = document.querySelector('.problem-solving'); // Target the section

    const observerOptions = {
        root: null,
        threshold: 0.80 // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the counting animation
                animateCount('codeforces-count', targetCounts.codeforces);
                animateCount('leetcode-count', targetCounts.leetcode);
                animateCount('online-judges-count', targetCounts.total);
                
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(problemSolvingSection); // Observe the problem-solving section
});



document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll('.project');

    const observerOptions = {
        root: null,
        threshold: 0.4 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    projects.forEach(project => {
        observer.observe(project);
    });
});


