
try {
    chrome.storage.sync.get(['accentColor'], r => {
        // Validate Hex Color
        if(!/^#([A-F0-9]{6}|[A-F0-9]{3}|[A-F0-9]{8})$/i.test(r.accentColor)) return;

        const style = document.createElement("style");

        style.innerHTML = `
            :root {
                --theme-accent-color: ${r.accentColor} !important;
            }
        `;

        document.head.append(style);
    })
}catch(err) {
    console.error(err)
}

try {
    const themeColor = getComputedStyle(document.body).getPropertyValue("--theme-accent-color").replace(/ /g, "")

    if(document.querySelector("meta[name=theme-color]")) {
        document.querySelector("meta[name=theme-color]").setAttribute( "content", themeColor )
    } else {
        document.head.append(`<meta name="theme-color" content="${themeColor}">`)
    }
}catch(err) {
    console.error(err)
}
