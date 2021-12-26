
try {
    chrome.storage.sync.get(['accentColor', 'accentColorHSL'], r => {
        // Validate Hex Color
        if(!/^#([A-F0-9]{6}|[A-F0-9]{3}|[A-F0-9]{8})$/i.test(r.accentColor)) return;

        const style = document.createElement("style");

        style.innerHTML = `
            :root {
                --theme-accent-color: ${r.accentColor} !important;
                --theme-accent-color-hue: ${r.accentColorHSL.h} !important;
                --theme-accent-color-sat: ${r.accentColorHSL.s} !important;
                --theme-accent-color-lig: ${r.accentColorHSL.l} !important;
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
