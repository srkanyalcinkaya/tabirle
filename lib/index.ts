export const getZodiacSign = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    return '';
};

export const getAscendantSign = (birthDate: string | number | Date) => {
    if (!birthDate || !(birthDate instanceof Date)) {
        return ""; // Geçersiz bilgi varsa null döndür
    }

    // Saat ve dakika bilgilerini al
    const hour = birthDate.getHours(); // Saat
    const minute = birthDate.getMinutes(); // Dakika (şu an kullanılmıyor)
    // Doğum saatine göre yükselen burç aralığı (genel tablo)
    const ascendantSigns = [
        "aries",    // 06:00 - 08:00
        "taurus",   // 08:00 - 10:00
        "gemini",   // 10:00 - 12:00
        "cancer",   // 12:00 - 14:00
        "leo",      // 14:00 - 16:00
        "virgo",    // 16:00 - 18:00
        "libra",    // 18:00 - 20:00
        "scorpio",  // 20:00 - 22:00
        "sagittarius", // 22:00 - 00:00
        "capricorn", // 00:00 - 02:00
        "aquarius",  // 02:00 - 04:00
        "pisces",    // 04:00 - 06:00
    ];

    // Saat aralığına göre yükselen burcu belirle
    const index = Math.floor((hour % 24) / 2); // Her burç 2 saatlik aralık
    return ascendantSigns[index];
};