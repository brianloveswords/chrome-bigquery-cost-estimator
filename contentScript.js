// @ts-check

~(() => {
    let findRootNode = () => document.querySelector("bq-workspace");

    /**
     * @typedef {"b" | "kb" | "mb" | "gb"  | "tb" | "pb"} SizeTag
     */

    /**
     * @param {SizeTag} tag
     * @param {number} size
     */
    let toTB = (tag, size) => {
        switch (tag) {
            case "b":
                return size / 1000 / 1000 / 1000 / 1000;
            case "kb":
                return size / 1000 / 1000 / 1000;
            case "mb":
                return size / 1000 / 1000;
            case "gb":
                return size / 1000;
            case "tb":
                return size;
            case "pb":
                return size * 1000;
        }
    };

    /**
     * @param {string} s
     * @return {SizeTag}
     */
    let tagFromString = (s) => {
        switch (s) {
            case "PiB":
            case "PB":
                return "pb";
            case "TiB":
            case "TB":
                return "tb";
            case "GiB":
            case "GB":
                return "gb";
            case "MiB":
            case "MB":
                return "mb";
            case "KiB":
            case "KB":
                return "kb";
            case "B":
                return "b";
            default:
                throw new Error(`could not determine units in "${s}"`);
        }
    };

    /**
     * @param {string} s
     * @return {string}
     */
    let dollarsFromString = (s) => {
        const parts = s
            .replace(",", "")
            .match(/(\d+(?:\.\d+)?) (B|KiB|KB|MiB|MB|GiB|GB|TiB|TB|PiB|PB)/);
        if (!parts) throw new Error(`could not find a unit string in "${s}"`);
        let [tag, size] = [tagFromString(parts[2]), parseFloat(parts[1])];
        let tb = toTB(tag, size);
        let cost = tb * 5;
        return `$${cost.toFixed(2)}`;
    };

    /**
     * @param {string} s
     * @return {string}
     */
    let addCost = (s) => {
        return s.replace("when run", `and cost ${dollarsFromString(s)}`);
    };

    let observerCallback = (_, observer) => {
        let rootNode = findRootNode();

        let statusNodes = [...rootNode.querySelectorAll(".query-validation-status div")].filter(
            (node) => /** @type {HTMLElement} */ (node).innerText?.includes("will process"),
        );

        if (statusNodes.length == 0) {
            return;
        }

        // Make sure to disable the observer before mutating nodes or else we
        // get that sweet infinite loop.
        observer.disconnect();
        statusNodes.forEach((node) => {
            let el = /** @type {HTMLElement} */ (node);
            el.innerText = addCost(el.innerText);
        });
        connectObserver();
    };

    let connectObserver = () => {
        let rootNode = findRootNode();
        if (!rootNode) {
            console.log("target node could not be found");
            return void setTimeout(connectObserver, 1e3);
        }
        const child = rootNode.firstChild;
        if (!child) {
            console.log("node does not have children");
            return void setTimeout(connectObserver, 1e3);
        }
        console.log("setting up observer");
        new MutationObserver(observerCallback).observe(rootNode, {
            childList: true,
            subtree: true,
        });
    };
    connectObserver();
})();
