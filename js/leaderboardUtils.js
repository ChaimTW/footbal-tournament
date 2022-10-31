function onLoad(){
    const mainElem = document.getElementsByTagName('main')[0];
    const spinnerElem = document.getElementsByClassName('spinner-border')[0]

    mainElem.classList.add('disabled')
    spinnerElem.classList.remove('disabled')
    setTimeout(() => {
        mainElem.classList.remove('disabled')
        spinnerElem.classList.add('disabled')
    }, 500);
}

onLoad()

// TODO - Pull scores from DB & populate leaderboard