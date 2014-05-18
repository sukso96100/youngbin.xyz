$.getJSON('contents.json', function (json) {
var tipuesearch = [];
for (var key in json) {
    if (json.hasOwnProperty(key)) {
        var item = json[key];
        array.push({
            title: item.title,
            text: item.text,
            tags: item.tags,
            loc: item.loc
        });
    }
}
});
