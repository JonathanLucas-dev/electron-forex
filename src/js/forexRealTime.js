const forexInterval = () =>{
    let time = setInterval(function(){
        clearInterval(time);
        getForex();
        forexInterval();
    }, 100000);
}

const pulse = (BidBefore, BidAfter, AskBefore, AskAfter, boxForex) => {
    let divFather = boxForex.parentresponse;
    let primaryColumn = divFather.classList.contains("primaryColumn");
    let secondColumn = divFather.classList.contains("secondColumn");

    if (primaryColumn){
        if (Number(BidBefore) != BidAfter || Number(AskBefore) != AskAfter) {
            divFather.style.background =  "#dadada11";

            setTimeout(function() {
                divFather.style.background =  "#222731";
            }, 500);
        }
    }

    if (secondColumn){
        if (Number(BidBefore) != BidAfter || Number(AskBefore) != AskAfter) {
            divFather.style.background = "#dadada11"

            setTimeout(function() {
                divFather.style.background =  "#2b303c"
            }, 500);
        }
    }
}

const compareData = (variavel, api, div) => {
    if (Number(variavel) < api) {
        div.classList.remove("sinalizationForexRed");
        div.classList.add("sinalizationForexGreen");
    } else if (variavel > api) {
        div.classList.remove("sinalizationForexGreen");
        div.classList.add("sinalizationForexRed");
    }
}

const getForex = () => {
    let url = "https://economia.awesomeapi.com.br/last/USD-BRL,CNY-BRL,GBP-BRL,JPY-BRL,EUR-BRL,CHF-BRL,AUD-BRL,CAD-BRL,NOK-BRL,DKK-BRL,RUB-BRL,SEK-BRL,MXN-BRL,CLP-BRL,ARS-BRL,COP-BRL"

    fetch(url)
    .then(res => res.json())
    .then(response => {

        let data = Object.keys(response).map(function (key) {
            return [response[key]];
        });

        data.forEach(e => {
            console.log(e[0])
        
                let divBid = document.querySelector(`.forexBid${e[0].code}`);
                let divVar = document.querySelector(`.forexVar${e[0].code}`);
                let BidForex = document.querySelector(`.forexBid${e[0].code}`).innerHTML;
                let AskForex = document.querySelector(`.forexAsk${e[0].code}`).innerHTML;
                let sinalization = document.querySelector(`#sinalizationForex${e[0].code}`);

               // pulse(Number(BidForex), e[0].bid, Number(AskForex), e[0].ask, divBid);
                document.querySelector(`.forexName${e[0].code}`).innerHTML = e[0].code;
                document.querySelector(`.forexHigh${e[0].code}`).innerHTML = e[0].high;
                document.querySelector(`.forexLow${e[0].code}`).innerHTML = e[0].low;
                document.querySelector(`.forexBid${e[0].code}`).innerHTML = e[0].bid;
                document.querySelector(`.forexAsk${e[0].code}`).innerHTML = e[0].ask;
                document.querySelector(`.forexVar${e[0].code}`).innerHTML = e[0].varBid;

                compareData(Number(BidForex), e[0].bid, sinalization);

                if ( document.querySelector(`.forexVar${e[0].code}`).innerHTML.substr(0, 1) == "-"){
                    divVar.style.color = "red";
                } else {
                    divVar.style.color = "#fff";
                }
        })

    })
}

getForex();
forexInterval();