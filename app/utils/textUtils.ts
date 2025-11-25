

export function toTitleCase(str: string): string {
    if (!str) return "";
    const lower = str.toLowerCase();
    const exceptions = ["de", "da", "do", "dos", "das", "e"];

    return lower.split(' ').map((word, index) => {
        if (index > 0 && exceptions.includes(word)) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export function formatDateExtended(dateString: string): string {
    if (!dateString) return "";

    let date: Date;
    // Check if YYYY-MM-DD
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateString.split('-').map(Number);
        date = new Date(year, month - 1, day);
    } else if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const [day, month, year] = dateString.split('/').map(Number);
        date = new Date(year, month - 1, day);
    } else {
        date = new Date(dateString);
    }

    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const extendedDate = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

    return `${formattedDate} - ${extendedDate}`;
}

