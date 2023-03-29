
let startValue = 1;

const changeCardInfo = (card) => {
    let term = document.getElementById("term");
    let def = document.getElementById("def")
    //console.log(card)

    term.innerText = card.term
    def.innerText = card.def
    def.classList = "card-text visually-hidden";

}

const getArr = async () => {
    let baseArr = []
    await fetch("http://localhost:3000/range")
        .then(response => response.json())
        .then((data) => {
            baseArr = data.values;
            changeCardInfo(baseArr[0])
            buttonListeners(baseArr)
        })

}

const buttonListeners = (arr) => {
    let flipBut = document.getElementById("flip");
    let submitBut = document.getElementById("submit")
    let nextBut = document.getElementById("next")
    let backBut = document.getElementById("back")

    submitBut.onclick = () => {
        startValue = parseInt(document.getElementById("start").value);
        changeCardInfo(arr[startValue]);
        updateCounter()
    }

    nextBut.onclick = () => {
        startValue = startValue + 1
        changeCardInfo(arr[startValue]);
        updateCounter();
    }

    flipBut.onclick = () => {
        let def = document.getElementById("def")
        if (def.classList.toString() === "card-text visually-hidden"){
            def.classList = "card-text";
        } else {
            def.classList = "card-text visually-hidden";
        }
    }

    backBut.onclick = () => {
        startValue = startValue - 1
        changeCardInfo(arr[startValue]);
        updateCounter();
    }


}

const updateCounter = () => {
    let counterElement = document.getElementById("counter")
    //console.log(counterElement.innerText);
    let counter = startValue
    counterElement.innerText = "" + counter;

}

window.onload = () => {
    getArr();
}