/*
    Copyright (c) 2025 Jakub Janecek
+  All rights reserved.
    See copyright_rights_plan.txt for details.
*/
// Dark mode toggle - accessible, keyboard-friendly, and persistent
// Feature: toggles a class on <html> (html.dark-theme), swaps Bootstrap Icon classes
// localStorage key: 'hm_theme' with values 'dark' or 'light'

(function () {
    'use strict';

    const LS_KEY = 'hm_theme';
    const THEME_CLASS = 'dark-theme';
    const BTN_ID = 'themeToggle';

    function isStoredDark() {
        try {
            return localStorage.getItem(LS_KEY) === 'dark';
        } catch (e) {
            return false;
        }
    }

    function setStored(theme) {
        try {
            if (theme === 'dark') localStorage.setItem(LS_KEY, 'dark');
            else localStorage.removeItem(LS_KEY);
        } catch (e) {
            // ignore storage errors
        }
    }

    function updateIcon(btn, dark) {
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (!icon) return;
        icon.classList.remove('bi-moon', 'bi-sun');
        icon.classList.add(dark ? 'bi-sun' : 'bi-moon');
        btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
        btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }

    function applyTheme(dark) {
        const root = document.documentElement; // <html>
        if (dark) root.classList.add(THEME_CLASS);
        else root.classList.remove(THEME_CLASS);
        const btn = document.getElementById(BTN_ID);
        updateIcon(btn, dark);
    }

    function toggleTheme() {
        const root = document.documentElement;
        const currentlyDark = root.classList.contains(THEME_CLASS);
        const nextDark = !currentlyDark;
        applyTheme(nextDark);
        setStored(nextDark ? 'dark' : 'light');
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Initialize from storage only (start light unless user chose dark previously)
        const startDark = isStoredDark();
        applyTheme(startDark);

        const btn = document.getElementById(BTN_ID);
        if (!btn) return;

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            toggleTheme();
        });

        // keyboard: Enter/Space should toggle when focused
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });

        // Expose for debugging in console if needed
        try { window.darkMode = { toggle: toggleTheme, apply: applyTheme }; } catch (e) { }
    });
})();
