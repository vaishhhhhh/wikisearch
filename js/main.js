import { clearSearchText, setSearchFocus, showClearTextButton, clearPushListener } from "./searchBar.js"
import { getSearchTerm, retreiveSearchResults } from "./dataFunctions.js";
import { builSearchResults, clearStatsLine, setStatsLine, deleteSearchResults } from "./searchResults.js"
document.addEventListener("readystatechange", (e) => {
    if (e.target.readyState === "complete") {
        initApp();
    }
})

const initApp = () => {
    // set the focus
    setSearchFocus();
    // listeners to clear text
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton)
    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText)
    // form
    clear.addEventListener("keydown", clearPushListener)
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitSearch);


}
// defining submitsearch

const submitSearch = (e) => {
    e.preventDefault();
    deleteSearchResults();
    // process the search
    processTheSearch();
    // set the focus
    setSearchFocus();

}
// process the search
const processTheSearch = async () => {
    // clear the stats line
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retreiveSearchResults(searchTerm);
    if (resultArray.length)
        builSearchResults(resultArray);
    setStatsLine(resultArray.length);

}