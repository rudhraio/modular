export function generateString(size: number, type: string = "alphanumeric") {
    let charset = '';

    if (type === "alpha") {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } else if (type === "numeric") {
        charset = '0123456789';
    } else {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

    return Array.from({ length: size }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}