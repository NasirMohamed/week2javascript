//Sources selection

function getSources() {

var getSource = "https://newsapi.org/v1/sources?sortBysAvailable=latest";
	
	var requestSource = new XMLHttpRequest();
	
	requestSource.open("GET", getSource, true);
	
	requestSource.onload = function () {
		
		if( requestSource.readyState == 4 && requestSource.status == 200 ) {
			
		sourceData = JSON.parse(requestSource.responseText);
			
		var source = document.getElementById("source");
			
			 for (var i = 0; i < sourceData.sources.length; i++) {
				 
				optionID = sourceData.sources[i].id;
				optionName = sourceData.sources[i].name;
				 
				var option = document.createElement("option");
				option.innerHTML = optionName;
				option.setAttribute("value", optionID);
				option.setAttribute("name", optionName);
				source.appendChild(option);
				 
			 } 	
		} 	
	} 
requestSource.send();
} 

getSources();

//Modal Heading
		
modalHeading = document.getElementById("exampleModalLabel");
		
//

//ARTICLES DISPLAYED

var logos = ["bbc-news", "the-guardian-uk", "cnn", "business-insider", "abc-news-au", "reuters"];

function bbcNews() {
	sourceID = logos[0];
	modalHeading.innerHTML = "Latest news from: BBC News";
} 

function guardianUK() {
	sourceID = logos[1];
	modalHeading.innerHTML = "Latest news from: The Guardian UK";
}

function cnnNews() {
	sourceID = logos[2];
	modalHeading.innerHTML = "Latest news from: CNN";
}

function businessIn() {
	sourceID = logos[3];
	modalHeading.innerHTML = "Latest news from: Business Insider";
}

function abcNews() {
	sourceID = logos[4];
	modalHeading.innerHTML = "Latest news from: ABC News AU";
}

function reutersNews() {
	sourceID = logos[5];
	modalHeading.innerHTML = "Latest news from: Reuters";
}

var theButton = document.getElementById("myButton");
theButton.addEventListener("click", getSource, false);
theButton.addEventListener("click", getNews, false);

function getSource() {
	sourceID = document.getElementById("source").value;
	
	var sourceName = $("#source option:selected" ).text();
		
		modalHeading.innerHTML = "Latest news from: " + sourceName;
}

function getNews() {
	
getLatest = "https://newsapi.org/v1/articles?source=" + sourceID + "&sortBy=top&apiKey=c855d9487fc645178c6b9cb8268f1918";

var newsRequest = new XMLHttpRequest();
	
newsRequest.open("GET", getLatest, true);
	
newsRequest.onload = function() {
	
	if (newsRequest.readyState == 4 && newsRequest.status == 200) {
		
		var receivedArticles = JSON.parse(newsRequest.responseText);
		
		var articles = receivedArticles.articles;
		
		for (i=0; i < articles.length; i++) {
			
			var articleDiv = document.getElementById("article");
			
			var article = document.createElement("div");
			article.setAttribute("class", "col-md-12 closeMe");
			
			var title = document.createElement("h2");
			title.innerHTML = articles[i].title;
			article.appendChild(title);
			
			var artImage = document.createElement("img");
			artImage.src = articles[i].urlToImage;
			artImage.setAttribute("class", "img-fluid");
			article.appendChild(artImage);
						
			var pubDate = new Date(articles[i].publishedAt),
			locale = "en-us", 
			month = pubDate.toLocaleString(locale, { month: "short" });
			
			var year = "2" + pubDate.getYear() - 100;
			var day = pubDate.getDate();
			var hours = pubDate.getHours();
			var minutes = pubDate.getMinutes();
			
			var published = document.createElement("p");
			published.innerHTML = "Published at: " + day + "-" + month + "-" + year + " " + hours + ":" + minutes;
			article.appendChild(published);
			
			var readMore = document.createElement("a");
			var readButton = document.createElement("button");
			readButton.innerHTML = "Read more";
			readMore.setAttribute("target", "_blank"); 
			readMore.appendChild(readButton);
			readMore.href = articles[i].url;
			
			var description = document.createElement("p");
			description.innerHTML = articles[i].description + "<br>";
			description.appendChild(readMore);
			article.appendChild(description);
			
			articleDiv.appendChild(article); 
		}
	} 
}

newsRequest.send(); 

}