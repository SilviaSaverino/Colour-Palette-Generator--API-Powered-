const colorWheel = document.getElementById("color-wheel")
const colorSchemeSelector = document.getElementById("colour-scheme-selector")
const colorPaletteRendered = document.getElementById("color-palette")

document.getElementById("form-btn").addEventListener('click', function(e){
    e.preventDefault()
    let selectedColour = colorWheel.value.slice(1)
    let colorDropdownOption = colorSchemeSelector.value
    
    console.log(selectedColour, colorDropdownOption)

fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColour}&mode=${colorDropdownOption}&count=7`)
    .then(response => response.json())
    .then(data => {
        let dataHexValues = data.colors.map((hex) =>{
            return hex.hex.value
        })
        renderColourPalette(dataHexValues)
    })

})

function renderColourPalette(colourArray) {
    let colorPaletteRenderedHTML =""
    for (let data of colourArray){
        colorPaletteRenderedHTML += `
        <div class="single-color" style="background-color: ${data}">${data}</div>
        `
    }
    colorPaletteRendered.innerHTML = colorPaletteRenderedHTML
}