
function updateSimilarColors(hex) {
    document.querySelector(".is-compatible").hidden = true;

    let asHSL = hexToHSL(hex)
    let style = document.createElement('style')

    if(asHSL["l"] > .7 && asHSL["s"] < .5) {
        document.querySelector(".is-compatible").hidden = false;
    }

    style.innerHTML = `
    :root{
        --accent-color: ${hex};
        --accent-color-saturation: ${asHSL["s"]};
        --accent-color-lightness: ${asHSL["l"]};
    }`

    document.head.append(style)
}

function updateThemeColor(hex, callback) {
    try {
    updateSimilarColors()
    } catch(err) {
        console.error(err)
    }

    chrome.storage.sync.set({
        accentColor: hex
    }, callback);
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['accentColor'], r => {
        // Validate Hex Color
        if(!/^#([A-F0-9]{6}|[A-F0-9]{3}|[A-F0-9]{8})$/i.test(r.accentColor)) return;

        document.querySelector("#themeColor").value = r.accentColor;
        updateSimilarColors(r.accentColor)
    })
})

document.querySelector("#save").addEventListener("click", function() {
    let accentColor = document.querySelector("#themeColor").value;

    updateThemeColor(accentColor, () => alert("Done!"))
})

document.querySelectorAll(".similarColor").forEach(e => {
    e.addEventListener("click", event => {
        var color = [...getComputedStyle(e).backgroundColor.slice(4)]

        color.pop()
        color = color.join("").split(", ")
        color = "#" + color.map(x => parseInt(x).toString(16)).join("")

        alert(color);

        document.querySelector("#themeColor").value = color
        updateThemeColor(color)
    })
})