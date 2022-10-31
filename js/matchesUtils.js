console.log('hallo')


function setDropDowns(){
    let matchDateTimes = document.querySelectorAll("[id^='matchdateLongId']")

    for(let i = 0; i < matchDateTimes.length; i++){
        let dateString = matchDateTimes[i].textContent
        let dateStringSplit = dateString.split('-')
    
        let day = parseInt(dateStringSplit[0])
        let month = parseInt(dateStringSplit[1])
        let [year, time] = dateStringSplit[2].split(', ')
        year = parseInt(year) + 2000
        time = parseInt(time.replace(':00', ''))
    
        let d = new Date(year, month - 1, day, time);
        let guessDisabled = isInThePast(d)
    
        
    
        if(guessDisabled){
            matchDateTimes[i].parentNode.parentNode.parentNode.children[3].children[1].children[0].disabled = true
            matchDateTimes[i].parentNode.parentNode.parentNode.children[4].children[1].children[0].disabled = true
        }
    }
}

function isInThePast(date) {
    const today = new Date();
    return date < today;
  }

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



function save() {
    let allPredictions = document.getElementsByName('575[predicted_home_goals]');
    let predictionsPerMatch = [];
    let matchNumber = 1 //

    for(let i = 0; i < allPredictions.length; i++) {
        let currentPrediction = allPredictions[i]
        if(i % 2 == 0){
            let currentMatch = {}
            currentMatch.homeTeam = currentPrediction.parentNode.children[2].textContent
            currentMatch.matchNumber = matchNumber;
            currentMatch.homeGoals = parseInt(currentPrediction.value);
            predictionsPerMatch.push(currentMatch);
        } else {
            predictionsPerMatch[predictionsPerMatch.length - 1].awayTeam = currentPrediction.parentNode.children[2].textContent
            predictionsPerMatch[predictionsPerMatch.length - 1].awayGoals = parseInt(currentPrediction.value);
            matchNumber++;
        }
    }
    console.log(JSON.stringify(predictionsPerMatch));
}

setDropDowns()
onLoad()
// TODO - Pull predictions when opening form
// TODO - Also show past predictions in the disabled select elements
// TODO - Logic for loading spinner until predictions have been pulled 
// TODO - POST request to server when saving results
// TODO - Save input when moving to leaderboards without clicking save
// TODO - Pull result after matches have been played