function Player(marker) {
    return {marker}
}

const gameBoard = (function() {
    function _createElement(type, text) {
        const el = document.createElement(type);
        el.innerText = text;

        return el
    }
    let gameBoardElements = [];
    for(let i = 0; i < 9; i++){
        gameBoardElements[i] = {el: _createElement("div", i+1), used: false}
    }
    return {gameBoardElements};
})();

const displayController = (function() {
    const elements = gameBoard.gameBoardElements;
    elements.forEach(element => {
        document.body.append(element.el);
    })
})();