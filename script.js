// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Existing code for smooth scrolling and mobile navigation toggle (KEEP THIS) ---
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

    // --- NEW FUNCTION TO CLEAR NUMBERS AND SET A PLACEHOLDER ---
    function resetNumbersToPlaceholder() {
        const allNumberCells = document.querySelectorAll(
            '.prize-number, .results-table.special-table tbody td, .results-table.consolation-table tbody td'
        );
        allNumberCells.forEach(cell => {
            cell.textContent = "-";
        });
    }

    // --- NEW FUNCTION FOR THE SLOW REVEAL EFFECT ---
    function slowReveal(elements, values, delay) {
        let i = 0;
        function revealNext() {
            if (i < elements.length) {
                elements[i].textContent = values[i];
                i++;
                setTimeout(revealNext, delay);
            }
        }
        revealNext();
    }

    // --- YOUR CUSTOM FUNCTION FOR UPDATING DRAW NUMBERS ---
    function updateDrawNumbers() {
        console.log("Updating draw numbers with YOUR GENERATED RESULTS!");

        // Example: Replace these lines with your actual logic
        const newFirstPrize = "1234";
        const newSecondPrize = "5678";
        const newThirdPrize = "9012";
        const newSpecialResults = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "0000"];
        const newConsolationResults = ["1010", "2020", "3030", "4040", "5050", "6060", "7070", "8080", "9090", "0101"];
        const newJackpot1 = "RM 7,500,000.00";
        const newJackpot2 = "RM 250,000.00";
        const newDrawDate = "Thu 07-08-2025";
        const newDrawNo = "No.5951/25";

        // Step 1: Update metadata instantly
        document.querySelector('.jackpot-item:nth-child(1) .jackpot-amount').textContent = newJackpot1;
        document.querySelector('.jackpot-item:nth-child(2) .jackpot-amount').textContent = newJackpot2;
        document.querySelector('.draw-date').textContent = newDrawDate;
        document.querySelector('.draw-no').textContent = newDrawNo;
        document.querySelector('.results-main-section .section-description').textContent = `Here are the latest official results for ${newDrawDate} (Draw ${newDrawNo}).`;

        // Step 2: Clear all number fields to placeholder just before the reveal
        resetNumbersToPlaceholder();

        // Step 3: Gather all the elements in the desired reveal order
        const allNumberElements = [
            document.querySelector('.prize-section.top-prizes .prize-row:nth-child(1) .prize-number'),
            document.querySelector('.prize-section.top-prizes .prize-row:nth-child(2) .prize-number'),
            document.querySelector('.prize-section.top-prizes .prize-row:nth-child(3) .prize-number'),
            ...document.querySelectorAll('.results-table.special-table tbody td'),
            ...document.querySelectorAll('.results-table.consolation-table tbody td')
        ];

        // Step 4: Combine the new values into one array in the same order
        const allNewValues = [
            newFirstPrize,
            newSecondPrize,
            newThirdPrize,
            ...newSpecialResults,
            ...newConsolationResults
        ];

        // Step 5: Start the slow reveal with a 5-second delay between each number
        const revealDelay = 5000; // 5000 milliseconds = 5 seconds
        slowReveal(allNumberElements, allNewValues, revealDelay);

        console.log("Draw numbers update process started!");
    }

    // --- Scheduling the Next Result ---
    function scheduleNextResult(hour, minute, second) {
        const now = new Date();
        const updateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);

        if (updateTime.getTime() < now.getTime()) {
            updateTime.setDate(updateTime.getDate() + 1);
        }

        const timeToWait = updateTime.getTime() - now.getTime();
        console.log(`Next result update scheduled for: ${updateTime.toLocaleString()} (in ${timeToWait / 1000} seconds)`);

        setTimeout(() => {
            updateDrawNumbers();
            scheduleNextResult(hour, minute, second);
        }, timeToWait);
    }

    // --- CALL THIS FUNCTION TO SCHEDULE YOUR NEXT DRAW ---
    scheduleNextResult(21, 0, 0); // 9 PM
});
