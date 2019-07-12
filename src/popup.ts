const switchBox = <HTMLInputElement>document.getElementById("switch-box");
const config = <HTMLDivElement>document.getElementById("config");

/* init */
(function init() {
    chrome.storage.sync.get("run", ({ run }) => {
        switchBox.checked = run;
    });
})();

/* handle on/off function */
switchBox.addEventListener("change", function() {
    chrome.storage.sync.set({
        run: this.checked
    });
});

//navigate to setting page
config.onclick = () => {
    if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
    } else {
        // Reasonable fallback.
        window.open(chrome.runtime.getURL("options.html"));
    }
};
