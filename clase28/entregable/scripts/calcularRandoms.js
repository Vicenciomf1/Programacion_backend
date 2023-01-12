
process.on('message', cant => {
    const numbers = {}
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000)
        if (!numbers[randomNumber]) {
            numbers[randomNumber] = 0
        }
        numbers[randomNumber]++
    }
    process.send(numbers)
})

process.send('listo')
