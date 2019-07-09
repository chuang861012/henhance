const switchBox = <HTMLInputElement>document.getElementById("switch-box");

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
