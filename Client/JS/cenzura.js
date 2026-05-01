export function cenzura (titleInput, textInput){
    const titleValue = titleInput.toLowerCase();
    const textValue = textInput.toLowerCase();
    const text = titleValue + " " + textValue;
    console.log(text)
    const filterRegex = /\b(fuck|f+u+c+k+|f\*{2}k|shit|bitch|asshole|nigger|faggot|cunt|dick|pussy|bastard|slut|hooker|pula|pulă|pizda|pizdă|muie|mue|futu|fute|cur|coaie|fraier|curva|curvă|taman|bozgor|jidan|cioara|cioară|bulangiu|cretin|idiot|suge|cacat|căcat|caca|pizd|dracu|naiba|mă-ta|mata|matii|mă-tii|jeg|avorton|borât|borat|handicapat|puță|puta|clit|futu-i)\b/gi;
    return filterRegex.test(text)
}

//true - daca contine un cuv urat
