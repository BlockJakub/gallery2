/*
    Copyright (c) 2025 Jakub Janecek
    All rights reserved.
    See copyright_rights_plan.txt for details.
*/
// Enable accessible flip-card toggling for touch and keyboard users
(function () {
    'use strict';

    function initFlipCards() {
        const cards = document.querySelectorAll('.flip-card');
        cards.forEach(card => {
            // Ensure structure: wrap front/back in inner
            let inner = card.querySelector('.flip-card-inner');
            if (!inner) {
                // create inner wrapper and move children inside
                inner = document.createElement('div');
                inner.className = 'flip-card-inner';
                while (card.firstChild) inner.appendChild(card.firstChild);
                card.appendChild(inner);
            }

            // Make the card focusable for keyboard
            if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

            // Click/tap toggles flip. Explicit flip buttons inside card should toggle too.
            card.addEventListener('click', function (e) {
                // If a flip-toggle button was clicked, toggle and stop
                const toggleBtn = e.target.closest('.flip-toggle');
                if (toggleBtn) {
                    inner.classList.toggle('is-flipped');
                    e.stopPropagation();
                    return;
                }

                // avoid toggling when other interactive elements (links/buttons) inside are clicked
                if (e.target.closest('a, button')) return;
                inner.classList.toggle('is-flipped');
            });

            // Keyboard accessibility
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    inner.classList.toggle('is-flipped');
                }
            });

            // Ensure aria-hidden on faces mirrors the visual state
            const syncAria = () => {
                const front = inner.querySelector('.flip-card-front');
                const back = inner.querySelector('.flip-card-back');
                const flipped = inner.classList.contains('is-flipped');
                if (front) front.setAttribute('aria-hidden', flipped ? 'true' : 'false');
                if (back) back.setAttribute('aria-hidden', flipped ? 'false' : 'true');
            };

            // Observe class changes and sync aria
            const mo = new MutationObserver(syncAria);
            mo.observe(inner, { attributes: true, attributeFilter: ['class'] });
            syncAria();
        });
    }

    document.addEventListener('DOMContentLoaded', initFlipCards);
})();
