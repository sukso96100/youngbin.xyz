        // custom transformation: scale header's title
        var titleStyle = document.querySelector('.title').style;
        // added code - here we need to obtain the title div as well
        var title = document.querySelector('.title');
//        var subtitle = document.querySelector('.subtitle');
//        var subtitleStyle = document.querySelector('.subtitle').style;

        addEventListener('core-header-transform', function (e) {
            var d = e.detail;
            var m = d.height - d.condensedHeight;
            var scale = Math.max(0.5, (m - d.y) / (m / 0.25)  + 0.5);
            titleStyle.transform = titleStyle.webkitTransform =
                'scale(' + scale + ') translateZ(0)';
//            subtitleStyle.transform = subtitleStyle.webkitTransform =
//                'scale(' + scale + ') translateZ(0)';
//             added code - here we hide the title when the header is condensed
//            subtitle.hidden = d.y == m;
        });




document.addEventListener('polymer-ready', function() {
  var navicon = document.getElementById('navicon');
  var drawerPanel = document.getElementById('drawerPanel');
  navicon.addEventListener('click', function() {
    drawerPanel.togglePanel();
  });
    loadWorksData();
});

function href(url){
location.href = url.toString();
}

document.addEventListener('polymer-ready', function() {
    console.log("Polymer is Ready")
     loadWorksData()
  });


function loadWorksData(){
   console.log("Loading Works Data from JSON...");
//Json 파일 읽기
$.getJSON( "/works.json", function( data ) {
    console.log("Loading Works Data from JSON... - JSON Loaded");
 var WorksArray = data.works;
    for(var i=0; i<WorksArray.length; i++){
        console.log(WorksArray[i].title);
   
        var name = WorksArray[i].title;
        var desc = WorksArray[i].desc;
        var link = "'"+WorksArray[i].link+"'";
        var element = '<paper-shadow z="1" class="works-card" align="center"><h2>'+name+'</h2><p>'+desc+'</p><paper-fab onclick="href('+link+')" icon="arrow-forward"></paper-fab></paper-shadow>';
        
  $('#works-contents').append(element);
    }
 
});
}