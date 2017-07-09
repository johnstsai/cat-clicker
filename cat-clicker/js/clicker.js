/**
 * 
 * @authors Johns Tsai (johnsmtsai@gmail.com)
 * @date    2017-07-05 20:47:50
 * @version 2.0
 */

/*Model*/

var model = {
	currentCat: null, 
	cats: [
		{
			clickCount: 0,
			name: 'Holy',
			imgSrc: 'https://c2.staticflickr.com/2/1634/23699921890_ce7a36cbc7_c.jpg',
			imgAttribution: ''
		},
		{
			clickCount: 0,
			name: 'Cow',
			imgSrc: 'https://c2.staticflickr.com/8/7113/6959127764_6611211de9_c.jpg',
			imgAttribution: ''
		}
	]
};

/*Controller*/

var controller = {

	init: function(){
		//set current cat to the first one in the list
		model.currentCat = model.cats[0];

		//tell view to initialize
		catListView.init();
		catView.init();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	//set the current selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	//increments the counter for the current selected cat
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	}
};

/*View*/

var catView = {

	init: function() {
		//store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		// on click, increment the current cat counter
		this.catImageElem.addEventListener('click', function(){
			controller.incrementCounter();
		});

		//render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function() {
		//update the DOM elements with values from current cat
		var currentCat = controller.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
	}
};

var catListView = {

	init: function() {
		//store DOM element for easy access later
		this.catListElem = document.getElementById('cat-list');

		//render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function() {
		var cat, elem, i;
		// gt the cats we'll be rendering from the controller
		var cats = controller.getCats();

		//empty the cat list
		this.catListElem.innerHTML = '';

		//loop over the cats
		for (i=0; i<cats.length;i++) {
			//this is the cat we currently looping over
			cat = cats[i];

			//make a new cat list item and set its text
			elem = document.createElement('li');
			elem.textContent = cat.name;

			//on click, setCurrent and render the catView
			//(this uses the closure-in-a-loop trick to connect
			//the value of the cat variable to the click event function)
			elem.addEventListener('click', (function(catCopy){
				return function() {
					controller.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			//add element to the list
			this.catListElem.appendChild(elem);
		}
	}
};

// initiate

controller.init();



/* first version code
var clicks = 0;
var nums = [1,2,3,4,5,6,7,8,9,10];
for (var i = 0 ; i < nums.length; i++) {
    var num = nums[i];
    var elem = document.getElementById('cat'+i);
    elem.addEventListener('click', function(){
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
}, false);
}
*/