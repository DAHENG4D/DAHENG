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

    // --- Language Switching Logic ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-lang-en], [data-lang-zh]'); // Select all elements with translation attributes

    function setLanguage(lang) {
        localStorage.setItem('selectedLang', lang); // Store selected language
        elementsToTranslate.forEach(element => {
            const enText = element.getAttribute('data-lang-en');
            const zhText = element.getAttribute('data-lang-zh');

            if (lang === 'en' && enText) {
                element.textContent = enText;
            } else if (lang === 'zh' && zhText) {
                element.textContent = zhText;
            }
        });

        // Update active class for buttons
        langButtons.forEach(button => {
            button.classList.remove('active');
            if (button.id === `lang-${lang}`) {
                button.classList.add('active');
            }
        });

        // Update special description that's dynamically generated
        updateResultsSectionDescription();
    }

    // Add event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.replace('lang-', '');
            setLanguage(lang);
        });
    });

    // Initialize language on page load
    const storedLang = localStorage.getItem('selectedLang') || 'en'; // Default to English
    setLanguage(storedLang);

    // Function to update the results section description based on current language
    function updateResultsSectionDescription() {
        const drawDateElement = document.querySelector('.draw-date');
        const drawNoElement = document.querySelector('.draw-no');
        const sectionDescriptionElement = document.querySelector('.results-main-section .section-description');

        if (drawDateElement && drawNoElement && sectionDescriptionElement) {
            const drawDate = drawDateElement.textContent;
            const drawNo = drawNoElement.textContent;
            const currentLang = localStorage.getItem('selectedLang') || 'en';

            if (currentLang === 'en') {
                sectionDescriptionElement.textContent = `Here are the latest official results for ${drawDate} (${drawNo}).`;
            } else if (currentLang === 'zh') {
                sectionDescriptionElement.textContent = `以下是 ${drawDate} （开奖编号：${drawNo}）的最新官方成绩。`;
            }
        }
    }


    // --- YOUR CUSTOM FUNCTION FOR UPDATING DRAW NUMBERS ---
    function updateDrawNumbers() {
        console.log("Updating draw numbers with YOUR GENERATED RESULTS!");

        const newFirstPrize = "1234";
        const newSecondPrize = "5678";
        const newThirdPrize = "9012";
        const newSpecialResults = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "0000"];
        const newConsolationResults = ["1010", "2020", "3030", "4040", "5050", "6060", "7070", "8080", "9090", "0101"];
        const newJackpot1 = "RM 7,500,000.00";
        const newJackpot2 = "RM 250,000.00";
        const newDrawDate = "Thu 07-08-2025";
        const newDrawNo = "No.5951/25";

        document.querySelector('.prize-section.top-prizes .prize-row:nth-child(1) .prize-number').textContent = newFirstPrize;
        document.querySelector('.prize-section.top-prizes .prize-row:nth-child(2) .prize-number').textContent = newSecondPrize;
        document.querySelector('.prize-section.top-prizes .prize-row:nth-child(3) .prize-number').textContent = newThirdPrize;

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

        document.querySelector('.draw-date').textContent = newDrawDate;
        document.querySelector('.draw-no').textContent = newDrawNo;

        // Call this after updating date/no to ensure the description is in the correct language
        updateResultsSectionDescription();

        console.log("Draw numbers updated successfully!");
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

    scheduleNextResult(21, 0, 0);

    // Optional: Call updateDrawNumbers() once when the page first loads
    // if you want to ensure the results are fresh upon page load,
    // rather than waiting for the first scheduled update.
    updateDrawNumbers(); // Initial call to set content and description
});
