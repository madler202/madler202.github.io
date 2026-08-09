// const portfolioProjects = [
//   {
//     title: "Project One",
//     description: "A short description of project one.",
//     tags: ["HTML", "CSS", "JavaScript"],
//     link: "#"
//   },
//   {
//     title: "Project Two",
//     description: "A short description of project two.",
//     tags: ["React", "API", "UX"],
//     link: "#"
//   },
//   {
//     title: "Project Three",
//     description: "A short description of project three.",
//     tags: ["Node.js", "Express", "MongoDB"],
//     link: "#"
//   }
// ];

// function createProjectCard(project) {
//   const card = document.createElement("article");
//   card.className = "project-card";
//   card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
//   card.style.padding = "1rem";
//   card.style.borderRadius = "12px";
//   card.style.background = "#fff";
//   card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
//   card.style.cursor = "pointer";
//   card.style.height = "100px";


//   const title = document.createElement("h3");
//   title.textContent = project.title;
//   card.appendChild(title);

//   const description = document.createElement("p");
//   description.textContent = project.description;
//   card.appendChild(description);

//   const tagContainer = document.createElement("div");
//   tagContainer.className = "project-tags";
//   tagContainer.style.display = "flex";
//   tagContainer.style.gap = "0.5rem";
//   tagContainer.style.flexWrap = "wrap";
//   tagContainer.style.margin = "0.75rem 0";

//   project.tags.forEach(tagText => {
//     const tag = document.createElement("span");
//     tag.textContent = tagText;
//     tag.style.padding = "0.25rem 0.6rem";
//     tag.style.borderRadius = "999px";
//     tag.style.background = "#f0f0f0";
//     tag.style.fontSize = "0.85rem";
//     tagContainer.appendChild(tag);
//   });

//   card.appendChild(tagContainer);

//   const link = document.createElement("a");
//   link.href = project.link;
//   link.textContent = "View project";
//   link.style.color = "#0d6efd";
//   link.style.textDecoration = "none";
//   card.appendChild(link);

//   card.addEventListener("mouseenter", () => {
//     card.style.transform = "translateY(-8px) scale(1.02)";
//     card.style.boxShadow = "0 18px 30px rgba(0,0,0,0.14)";
//   });

//   card.addEventListener("mouseleave", () => {
//     card.style.transform = "none";
//     card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
//   });

//   return card;
// }

// function renderPortfolioCards() {
//   const container = document.getElementById("projects-container");
//   if (!container) {
//     console.warn("No element with id 'projects-container' found.");
//     return;
//   }

//   container.style.display = "grid";
//   container.style.gap = "1.5rem";
//   container.style.gridTemplateColumns = "repeat(auto-fit, minmax(240px, 1fr))";

//   portfolioProjects.forEach(project => {
//     const card = createProjectCard(project);
//     container.appendChild(card);
//   });
// }

// window.addEventListener("DOMContentLoaded", renderPortfolioCards);

        // document.addEventListener("DOMContentLoaded", function() {
        //         const vectors = document.querySelectorAll('.vector-one, .vector-two');
        //         vectors.forEach((vector) => {
        //             vector.style.animation = 'none';
        //             void vector.offsetWidth; 
        //             vector.style.animation = 'spin 2s linear';
        //         });
        //     });

const flipcards = document.querySelectorAll('.flip-card-wrapper');
flipcards.forEach(card => { 

    let rotateYFrontValue = 0;
    let rotateYBackValue = -180;

    card.addEventListener("mouseenter", function(){
        const front = this.querySelector('.flip-card-front');
        const back = this.querySelector('.flip-card-back');

        rotateYFrontValue += 180;
        rotateYBackValue += 180;

        front.style.transform = `rotateY(${rotateYFrontValue}deg)`;
        back.style.transform = `rotateY(${rotateYBackValue}deg)`;
       
    });

    card.addEventListener("mouseleave", function(){
        const front = this.querySelector('.flip-card-front');
        const back = this.querySelector('.flip-card-back');

        rotateYFrontValue += 180;
        rotateYBackValue += 180;

        front.style.transform = `rotateY(${rotateYFrontValue}deg)`;
        back.style.transform = `rotateY(${rotateYBackValue}deg)`;
    });
})


class HDCarousel {
	version = 0.1;
	el = null; // element housing the carousel
	items = []; // array of carousel items
	size = 3; // total items to display
	activeClass = false; // if middle item should get an active class
	gap = 22; // margin/gap in px
	width = 0;

	constructor(el, settings = {}) {
		console.log("HDCarousel v" + this.version + " init");

		if (settings !== {}) {
			if (settings.gap) {
				this.gap = parseInt(settings.gap);
			}
			if (settings.size) {
				this.size = parseInt(settings.size);
			}
			if (settings.activeClass) {
				this.activeClass = true;
			}
		}
		this.el = el;

		this.init();
	}

	async init() {
		await this.createMarkup();

		// set nav listeners
		const nav = this.el.parentElement.getElementsByClassName("hdcarousel_nav_item");
		for (let i = 0; i < nav.length; i++) {
			nav[i].addEventListener("click", () => this.move(nav[i]));
		}

		await this.setMinItems();

		this.width = await this.getSize();
		this.el.style.height = await this.getHeight();

		await this.clone("prev");
		await this.build();
	}

	async createMarkup() {
		const nav = `<div class="hdcarousel_nav"><div class="hdcarousel_nav_item" aria-role="button" data-dir="prev">&#xab;</div><div class="hdcarousel_nav_item" aria-role="button" data-dir="next">&#xbb;</div></div>`;

		// create new element
		let wrapper = document.createElement("div");
		wrapper.classList.add("hdcarousel_wrapper");

		// clone carousel and insert into the wrapper
		let carousel = this.el.cloneNode(true);
		wrapper.insertAdjacentElement("afterbegin", carousel);
		wrapper.insertAdjacentHTML("beforeend", nav);

		// add the new wrapper before the old carousel
		this.el.insertAdjacentElement("beforebegin", wrapper);

		// remove the old carousel and reset the variables
		this.el.remove();
		this.el = wrapper.firstChild;
		this.el.classList.add("hdcarousel");
		console.log(this.el);

		this.items = this.el.getElementsByClassName("hdcarousel_item");
	}

	async setMinItems() {
		const minItems = this.size + 2;
		if (this.items.length < minItems) {
			let itemsLength = this.items.length;
			for (let i = 0; i < itemsLength; i++) {
				let c = this.items[i].cloneNode(true);
				this.el.append(c);
			}
		}

		if (this.items.length < minItems) {
			await this.setMinItems();
		}
	}

	async getSize() {
		let w = this.el.clientWidth;
		w = w / this.size - this.gap;
		return w;
	}

	async getHeight() {
		let h = this.items[0].clientHeight;

		// check if another item is higher
		for (let i = 0; i < this.items.length; i++) {
			let item_h = this.items[i].clientHeight;
			if (item_h > h) {
				h = item_h;
			}
		}
		return h + "px";
	}

	async build() {
		let l = this.width * -1;
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].style.width = this.width + "px";
			this.items[i].style.left = l + "px";
			l = l + this.width;
			if (i > 0) {
				let g = this.gap / this.size;
				l = l + this.gap + g;
			}
		}

		if (this.activeClass) {
			this.setActive();
		}
	}

	async clone(pos = "next") {
		let item = null;
		if (pos === "next") {
			item = this.items[0];
		} else {
			item = this.items[this.items.length - 1];
		}

		let c = item.cloneNode(true);

		if (pos === "next") {
			this.el.append(c);
		} else {
			this.el.prepend(c);
		}

		item.remove();
	}

	async move(el) {
		let pos = el.getAttribute("data-dir");
		if (pos === "next") {
			this.next();
		} else {
			this.prev();
		}
	}

	async next() {
		await this.clone("next");
		await this.build();
	}

	async prev() {
		await this.clone("prev");
		await this.build();
	}

	setActive() {
		let m = Math.round(this.size / 2);
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].classList.remove("hdcarousel_item_active");
			if (i === m) {
				this.items[i].classList.add("hdcarousel_item_active");
			}
		}
	}
}

const el = document.getElementById("like_and_subscribe");
new HDCarousel(el, { activeClass: true });





// class HDCarousel {
//     el = null;
//     items = [];
//     size = 4;
//     gap = 0;
//     item={
//         width: 0,
//         gap: 0,
//         left: 0,
//     };

//     constructor(el, settings = {}){
//         this.el = el;
//         this.items = el.getElementsByClassName("hdcarousel_item");



//         this.init()
//         console.log(this);

//     }
//     async init(){
//         this.item.width = await this.getSize();
//         this.el.style.height = this.items[0].clientHeight + "px";

//         await this.clone("prev")
//         await this.build();

//         setInterval(() => this.next(), 2000);
//     }


//       async getSize(){
//         let w = this.el.clientWidth;
//         w = w / this.size; 
//         return w;
//       }

//       async build(){
//         let l = this.item.width * -1;
//         for(let i=0; i < this.items.length; i++){  
//             this.items[i].style.width = this.item.width + "px"; 
//             this.items[i].style.left = l + "px";
//             l = l + this.item.width;
//         }
//       }

//       async clone(pos = "next"){
//         let item = 0;
//         if(pos === "next"){
//             item = this.items[0];
//         }else{
//             item = this.items[this.items.length - 1];
//         }
//         let c = item.cloneNode(true);

//         if (pos === "next"){
//             this.el.append(c)
// ;        }else{
//             this.el.prepend(c);
//         }
//       }
//       async next(){
//         await this.clone("next");
//         await this.build();
//       }
//     }
// const el = document.getElementById("like_and_subscribe");
// new HDCarousel(el);
