//to clean up Reddit rss feed
function removeSubmittedByElements () {
  const tdElements = document.querySelectorAll('td')
  const filteredElements = Array.from(tdElements).filter(td =>
    td.textContent.includes('submitted by')
  )
  //console.log(filteredElements)
  filteredElements.forEach(td => td.remove())
}

//to clean up TechCrunch rss feed
function removeTechCrunchAllRightReservedElements () {
  const elements = document.querySelectorAll('p')
  const filteredElements = Array.from(elements).filter(p =>
    p.textContent.includes('TechCrunch. All rights reserved.')
  )
  //console.log(filteredElements)
  filteredElements.forEach(td => td.remove())
}

//to clean up Euromaidan
function removePaBannerCodeElements() {
  const elements = document.querySelectorAll('div#pa_banner_code');
  elements.forEach(div => div.remove());
}

removeSubmittedByElements()
removeTechCrunchAllRightReservedElements()
removePaBannerCodeElements()
