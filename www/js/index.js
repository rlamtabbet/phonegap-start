/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
		
		$('#add_button').click(function() {
			app.addToSearch();
		});

		$('#clear_button').click(function() {
			app.clearSearchItems();  
		});

		var searchItemsArray = app.getSearchItems();
		for (var i = 0; i < searchItemsArray.length; i++) {
			var key = searchItemsArray[i];
			var value = JSON.parse(localStorage[key]);
			app.addSearchItemToDOM(key, value);
		}

        console.log('Received Event: ' + id);
    }
	
	getSearchItems: function() {
		var searchItemsArray = localStorage.getItem("searchItemsArray");
		if (!searchItemsArray) {
			searchItemsArray = [];
			localStorage.setItem("searchItemsArray", JSON.stringify(searchItemsArray));
		} else {
			searchItemsArray = JSON.parse(searchItemsArray);
		}
		return searchItemsArray ;
	}

	addToSearch: function() {
		if (!window["localStorage" ]) { 
			alert ("No local storage support");
			//you can put alternate code here
			return false;
		}

		var searchItemsArray = app.getSearchItems();
		var value = $("#note_text").val();

		if(value!="" ) {
			var currentDate = new Date();
			var key = "Item_" + currentDate.getTime();
			var ItemObj = {"value": value};
			localStorage.setItem (key , JSON.stringify(ItemObj));    
			searchItemsArray.push(key);
			localStorage.setItem("searchItemsArray", JSON.stringify(searchItemsArray));
			app.addSearchItemToDOM(key, ItemObj);
			$("#note_text").val('');
		} else {
			alert ("Enter Search Item");
		}
	}

	deleteSearchItem: function(key) {
		var searchItemsArray = app.getSearchItems();
		if (searchItemsArray) {
			for (var i = 0; i < searchItemsArray.length; i++) {
				if (key == searchItemsArray[i]) {
					searchItemsArray.splice(i, 1);
				}
			}

			localStorage.removeItem(key);
			localStorage.setItem("searchItemsArray", JSON.stringify(searchItemsArray));
			app.removeItemFromDOM(key);
		}
	}

	addSearchItemToDOM: function(key, ItemObj) {
		$('#searchItems').prepend($('<li/>', {
			'data-role': 'list-divider',
			'id': key
		}).append($('<a/>', {
			'href': 'test.html',
			'data-transition': 'slide',
			'text': ItemObj.value
		})).click(function (event) {
			event.stopPropagation();
			app.deleteSearchItem(key);
		}));

		$('#searchItems').listview('refresh');
	}

	removeItemFromDOM: function(key) {
		$('#'+key).remove();
		return false
	}

	clearSearchItems: function() {
		localStorage.clear();
		$('#searchItems').children().remove('li');
	}
};
