'use strict';

var obsidian = require('obsidian');

class InsertJalaliDatePlugin extends obsidian.Plugin {
    onload() {
       
        this.addRibbonIcon('calendar-with-checkmark', 'درج تاریخ شمسی امروز', () => {
            this.insertJalaliDate();
        });
      
        this.addCommand({
            id: 'insert-jalali-date',
            name: 'Insert Jalali Date (Full)',
            callback: () => {
                this.insertJalaliDate();
            }
        });
    
        this.addCommand({
            id: 'insert-jalali-date-short',
            name: 'Insert Jalali Date (Short)',
            callback: () => {
                this.insertJalaliDateShort();
            }
        });
    }
    insertJalaliDate() {
        const activeEditor = this.app.workspace.activeEditor;
        if (!activeEditor) {
            new obsidian.Notice('No active editor found. Please open a markdown file.');
            return;
        }
        const editor = activeEditor.editor;
        const todayJalali = this.getFullJalaliDate();
        editor.replaceSelection(todayJalali);
    }
    insertJalaliDateShort() {
        const activeEditor = this.app.workspace.activeEditor;
        if (!activeEditor) {
            new obsidian.Notice('No active editor found. Please open a markdown file.');
            return;
        }
        const editor = activeEditor.editor;
        const todayJalali = this.getJalaliDate();
        editor.replaceSelection(todayJalali);
    }
    getFullJalaliDate() {
        const jalaliDate = this.gregorianToJalali(new Date());
        const persianMonths = [
            'فروردین', 'اردیبهشت', 'خرداد',
            'تیر', 'مرداد', 'شهریور',
            'مهر', 'آبان', 'آذر',
            'دی', 'بهمن', 'اسفند'
        ];
        const persianDays = [
            'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه',
            'پنج‌شنبه', 'جمعه'
        ];
      
        const dayOfWeek = new Date().getDay();
        const persianDayName = persianDays[(dayOfWeek + 1) % 7];
        const persianMonthName = persianMonths[jalaliDate.month - 1];
        return `${persianDayName} ${jalaliDate.day} ${persianMonthName} ${jalaliDate.year}`;
    }
    gregorianToJalali(gregorianDate) {
        const gy = gregorianDate.getFullYear();
        const gm = gregorianDate.getMonth() + 1;
        const gd = gregorianDate.getDate();

        // Simple lookup table for recent years (2020-2030)
        const yearOffsets = {
            2020: 1399, 2021: 1400, 2022: 1401, 2023: 1402, 2024: 1403,
            2025: 1404, 2026: 1405, 2027: 1406, 2028: 1407, 2029: 1408, 2030: 1409
        };
        
        // If we have the year in our lookup table, use it
        if (yearOffsets[gy]) {
            const jy = yearOffsets[gy];
            // Calculate day of year
            const dayOfYear = this.getDayOfYear(gy, gm, gd);
            // Convert to Jalali month and day
            const { month, day } = this.dayOfYearToJalali(dayOfYear, jy);
            return { year: jy, month, day };
        }
        // Fallback to simple calculation for other years
        const jy = gy - 621;
        const dayOfYear = this.getDayOfYear(gy, gm, gd);
        const { month, day } = this.dayOfYearToJalali(dayOfYear, jy);
        return { year: jy, month, day };
    }
    getDayOfYear(year, month, day) {
        const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Check for leap year
        if (month > 2 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
            monthDays[2] = 29;
        }
        let dayOfYear = day;
        for (let i = 1; i < month; i++) {
            dayOfYear += monthDays[i];
        }
        return dayOfYear;
    }
    dayOfYearToJalali(dayOfYear, jalaliYear) {
        // Adjust for Persian New Year (around March 20-21)
        let adjustedDay = dayOfYear - 79; // Approximate offset for Persian New Year
        if (adjustedDay <= 0) {
            // Previous year
            adjustedDay += 365;
            if (this.isLeapYear(jalaliYear - 1)) {
                adjustedDay += 1;
            }
        }
        // Jalali months: 6 months of 31 days, 5 months of 30 days, last month varies
        const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];
        let month = 1;
        let day = adjustedDay;
        for (let i = 0; i < 12; i++) {
            if (day <= monthDays[i]) {
                month = i + 1;
                break;
            }
            day -= monthDays[i];
        }
        // Handle leap year for last month
        if (month === 12 && this.isLeapYear(jalaliYear) && day > 29) {
            day = 30;
        }
        else if (month === 12 && !this.isLeapYear(jalaliYear) && day > 29) {
            day = 29;
        }
        return { month, day };
    }
    isLeapYear(jalaliYear) {
        // Simple leap year calculation for Jalali calendar
        return (jalaliYear % 4 === 1);
    }
    getJalaliDate() {
        const jalaliDate = this.gregorianToJalali(new Date());
        return `${jalaliDate.year}-${String(jalaliDate.month).padStart(2, '0')}-${String(jalaliDate.day).padStart(2, '0')}`;
    }
}

module.exports = InsertJalaliDatePlugin;
