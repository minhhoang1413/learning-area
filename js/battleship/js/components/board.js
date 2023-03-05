function Board(grid, name, ships, playerAttack = null) {
    const table = document.createElement('table')

    const caption = document.createElement('caption')
    caption.textContent = name
    table.appendChild(caption)

    const thead = document.createElement('thead')
    table.appendChild(thead)
    const theadRow = document.createElement('tr')
    thead.appendChild(theadRow)
    theadRow.appendChild(document.createElement('th'))
    for (let i = 1; i <= grid.length; i++) {
        const th = document.createElement('th')
        th.textContent = i
        theadRow.appendChild(th)
    }

    const tbody = document.createElement('tbody')
    table.appendChild(tbody)
    for (let i = 0; i < grid.length; i++) {
        const tr = document.createElement('tr')
        tbody.appendChild(tr)
        const th = document.createElement('th')
        th.textContent = i + 1
        tr.appendChild(th)
        for (let j = 0; j < grid[i].length; j++) {
            const td = document.createElement('td')
            tr.appendChild(td)

            if (grid[i][j]) {
                td.textContent = grid[i][j]
                td.className = grid[i][j]
            }

            if (playerAttack) {
                td.addEventListener('click', () => {
                    playerAttack([i, j])
                })
            }
            if (ships && ships.includes(i + ',' + j)) {
                td.classList.add('ship')
            }
        }
    }
    return table
}
export default Board