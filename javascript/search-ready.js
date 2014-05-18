var searchToggle = document.querySelectorAll(".search-toggle")[0],
	JSloaded = false;
searchToggle.onclick = function( e ){
	var search = document.querySelectorAll(".search")[0],
		results = document.querySelectorAll(".results")[0];

	search.classList.toggle("show");
	results.classList.toggle("show");

	results.innerHTML = "";

	setTimeout(function () {
		search.value = "";
		search.focus();
	},100);

	if( !JSloaded ){
		JSloaded = true;
		JekyllSearch.init({
			//fuzzy: true,
			limit: 10,
			template: '<a href="{url}" title="{desc}" class="search-result-item">{title}</a>',
			searchResultsHeader: '<h4>Search results</h4><span class="nano-copy">powered by <a style="display:inline-block;" href="http://christian-fei.com/simple-jekyll-search-jquery-plugin/">Simple Jekyll Search</a></span>'
		});
	}
};
