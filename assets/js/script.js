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

    if (!chroma) {
        console.error('Chroma-js not loaded');
        return;
    }

    let colorPaletteRenderedHTML =""
    for (let data of colourArray){
        const brightness = chroma(data).luminance()
        const textColor = brightness > 0.5 ? 'black' : 'white'

        colorPaletteRenderedHTML += `
        <div class="single-color" style="background-color: ${data}; color: ${textColor}">${data}</div>
        `;
    }
    colorPaletteRendered.innerHTML = colorPaletteRenderedHTML

}