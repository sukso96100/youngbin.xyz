JekyllSearch.init({
    searchInput: document.getElementById("search-input"),
    searchResults: document.getElementById("search-results"),
    jsonFile: "/search.json",
    template: "<a href='{url}' title='{desc}'>{title}</a>",
    fuzzy: true
});
