export function shuffleArray(array) {
    const arr = [...array]
    for (let i = 0; i < 100; i++) {
        const index1 = Math.floor(Math.random() * arr.length)
        const index2 = Math.floor(Math.random() * arr.length)
        const temp = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = temp
    }
    return arr
}
export function displayTime(milisec) {
    return (milisec / 1000).toFixed(1) + 's'
}
