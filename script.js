// script.js (Simplified for focus on scheduling)

document.addEventListener('DOMContentLoaded', () => {
    // --- Existing code for smooth scrolling and mobile navigation toggle (KEEP THIS) ---
    // Make sure these parts of your script.js are still there if you need them.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            const navbarLinks = document.querySelector('.nav-links');
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (navbarLinks && navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
            }
        });
    });

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbarLinks = document.querySelector('.nav-links');
    if (hamburgerMenu && navbarLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // --- YOUR CUSTOM FUNCTION FOR UPDATING DRAW NUMBERS ---
    // This is where you'll call your own fair result'
    function updateDrawNumbers() {
        console.log("Updating draw numbers with YOUR GENERATED RESULTS!");

        // Example: Replace these lines with your actual logic
        // This is a placeholder that would call your methods to get new numbers
        const newFirstPrize = "1234"; // Call your function to get the new First Prize
        const newSpecialResults = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "0000"]; // Your 10 special results
        const newConsolationResults = ["1010", "2020", "3030", "4040", "5050", "6060", "7070", "8080", "9090", "0101"]; // Your 10 consolation results
        const newJackpot1 = "RM 7,500,000.00";
        const newJackpot2 = "RM 250,000.00";
        const newDrawDate = "Thu 07-08-2025"; // Update to the new date
        const newDrawNo = "No.5951/25"; // Update to the next draw number


        // --- Update the DOM with your new numbers ---
        document.querySelector('.prize-section.top-prizes .prize-row:nth-child(1) .prize-number').textContent = newFirstPrize;
        // You'll need to update 2nd and 3rd prize numbers similarly
        document.querySelector('.prize-section.top-prizes .prize-row:nth-child(2) .prize-number').textContent = "5678"; // Example
        document.querySelector('.prize-section.top-prizes .prize-row:nth-child(3) .prize-number').textContent = "9012"; // Example

        const specialCells = document.querySelectorAll('.results-table.special-table tbody td');
        specialCells.forEach((cell, index) => {
            cell.textContent = newSpecialResults[index];
        });

        const consolationCells = document.querySelectorAll('.results-table.consolation-table tbody td');
        consolationCells.forEach((cell, index) => {
            cell.textContent = newConsolationResults[index];
        });

        document.querySelector('.jackpot-item:nth-child(1) .jackpot-amount').textContent = newJackpot1;
        document.querySelector('.jackpot-item:nth-child(2) .jackpot-amount').textContent = newJackpot2;

        // Update the draw date and number in the header of the results card
        document.querySelector('.draw-date').textContent = newDrawDate;
        document.querySelector('.draw-no').textContent = newDrawNo;

        // You might also want to update the main section description if it displays the date/draw number
        document.querySelector('.results-main-section .section-description').textContent = `Here are the latest official results for ${newDrawDate} (Draw ${newDrawNo}).`;

        console.log("Draw numbers updated successfully!");
    }

    // --- Scheduling the Next Result ---

    /**
     * Schedules the `updateDrawNumbers` function to run daily at a specific time.
     * If the time has already passed today, it schedules for the next day.
     *
     * @param {number} hour - The hour (0-23) for the update.
     * @param {number} minute - The minute (0-59) for the update.
     * @param {number} second - The second (0-59) for the update.
     */
    function scheduleNextResult(hour, minute, second) {
        const now = new Date();
        const updateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);

        // If the update time has already passed today, schedule for tomorrow
        if (updateTime.getTime() < now.getTime()) {
            updateTime.setDate(updateTime.getDate() + 1); // Move to the next day
        }

        const timeToWait = updateTime.getTime() - now.getTime();
        console.log(`Next result update scheduled for: ${updateTime.toLocaleString()} (in ${timeToWait / 1000} seconds)`);

        setTimeout(() => {
            updateDrawNumbers(); // Execute your update logic
            // After executing, re-schedule for the next day
            scheduleNextResult(hour, minute, second);
        }, timeToWait);
    }

    // --- CALL THIS FUNCTION TO SCHEDULE YOUR NEXT DRAW ---
    // Example: Schedule the next draw result to appear at 9:00 PM (21:00:00) today.
    // Based on current time (Wednesday, August 6, 2025 at 8:48:16 PM +08):
    // This will run in about 11 minutes.
    scheduleNextResult(21, 0, 0); // 9 PM, 0 minutes, 0 seconds

    // Optional: Call updateDrawNumbers() once when the page first loads
    // if you want to ensure the results are fresh upon page load,
    // rather than waiting for the first scheduled update.
    // updateDrawNumbers();
});
