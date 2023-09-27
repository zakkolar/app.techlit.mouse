export const getMinutes = function(seconds: number) {
    return Math.floor(seconds/60).toString().padStart(2, '0');
}

export const getSeconds = function(seconds: number) {
    return (seconds % 60).toString().padStart(2,'0');
}