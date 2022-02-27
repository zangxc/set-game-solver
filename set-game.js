function checkOneAttribute(att1, att2, att3) {
  var allSame = (att1===att2 && att2 === att3)
  var allDiff = (att1!=att2 && att2 != att3 && att1 != att3)
  return allSame || allDiff
}
function checkAll3cards(card1,card2,card3) {
  for (i=0;i<4;i++) {
    if (!checkOneAttribute(card1[i],card2[i],card3[i])) {
      return false
    }
  }
  return true
}


function findTargetClass(){
  var targetClass = ""
  svgs = document.getElementsByTagName('svg')
  for (let svg of svgs){
    parentClass = svg.parentNode.getAttribute('class')
    if (parentClass && parentClass.includes(' ')) {
      var targetClass = parentClass.split(' ')[1]
      break
    }
  }
  return targetClass
}

function extractCards(targetClass) {
  var cards = []
  for (let item of document.getElementsByClassName(targetClass)){
    var svg=item.firstChild.firstChild
    if (svg.getAttribute('fill') === 'transparent') {
      var filling = 'transparent'
    } else if (svg.getAttribute('mask') === '') {
      var filling = 'solid'
    } else {
      var filling = 'stripe'
    }

    var svg2=item.firstChild.lastChild
    var card = [item.childElementCount, svg.href.baseVal, svg2.getAttribute('stroke'), filling, item]
    // console.log(item.childElementCount, svg.href.baseVal, svg.getAttribute('fill'), svg.getAttribute('mask'), item)
    // item.style.backgroundColor = 'green'
    cards.push(card)
  }
  return cards
}

function searchSet(cards){
  var count=0
  for (let i=0; i < cards.length-2; i++) {
    for (let j=i+1; j< cards.length-1; j++) {
      for (let k=j+1; k < cards.length; k++) {
        if (checkAll3cards(cards[i],cards[j], cards[k])){
          console.log(i,j,k)
          console.log(cards[i],cards[j], cards[k])
          cards[i][4].style.backgroundColor = 'gold'
          cards[j][4].style.backgroundColor = 'gold'
          cards[k][4].style.backgroundColor = 'gold'
          count++
          break
        }
      }
      if (count>0) {
        break
      }
    }
    if (count>0) {
      break
    }
  }
}


var targetClass = findTargetClass()
console.log(targetClass)

searchSet(extractCards(targetClass))

