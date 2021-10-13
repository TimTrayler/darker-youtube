
try {
    document.querySelector("#chatframe").addEventListener("load", () => {
        const frame = document.querySelector("#chatframe");

        frame.contentDocument.head.append(`
            <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("styles/livechat.css")}">
            <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("styles/backgrounds.css")}">
        `)

    })
} catch(e){}
