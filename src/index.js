//import "./styles.css";

/*******************************************************
 * Array with the structure of the Menu and Submenus
 *******************************************************/
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

/********************************************************
 * Defining Main Area of the webPage
 ********************************************************/
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList = "flex-ctr";

/********************************************************
 * Defining the TOP MENU Style
 ********************************************************/ 
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

/*****************************************************
 * Adding Menu Items (a tags) 
 *****************************************************/
for (let i = 0; i < menuLinks.length; i++) {
  let aE1 = document.createElement("a");
  aE1.textContent = menuLinks[i].text;
  aE1.setAttribute("href", menuLinks[i].href);
  topMenuEl.appendChild(aE1);
}

/*****************************************************
 * Defining the SUB MENU Style
 *****************************************************/
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList = "flex-around";
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

/******************************************************
 * Function helper that add the submenu links
 * @param {*} menusublinks 
 ******************************************************/
function buildSubmenu(menusublinks){
  while(subMenuEl.firstChild){
    subMenuEl.removeChild(subMenuEl.firstChild)
  }
  for ( i=0;i<menusublinks.length;i++){
    let aE1 = document.createElement("a");
    aE1.textContent = menusublinks[i].text;
    aE1.setAttribute("href", menusublinks[i].href);
    subMenuEl.appendChild(aE1);
  }
}



/*************************************************************
 * Creating a constant to save the topMenu children elements
 *************************************************************/
const topMenuLinks = topMenuEl.children;

/*************************************************************
 * Handle Event Listener for the Main Menu
 *************************************************************/
topMenuEl.addEventListener("click", event => {
  //adding the prevetDefault to avoid propagation
  event.preventDefault();

  //if the click target is not an a Tag it returns and do nothing
  if(event.target.tagName!=='A'){
       return;
     }
  
  //Loop to check who a tag is the target
   for(let i=0;i<topMenuLinks.length;i++){
    
    //If it is not the target the active class is removed
    if(topMenuLinks[i].textContent!==event.target.textContent){
      topMenuLinks[i].classList.remove("active")
    } else { //if it is the a target clicked
      //toggle the active class
      topMenuLinks[i].classList.toggle("active")
      //If after toggle the class is active we proceed to activate the submenu
      if(topMenuLinks[i].classList.contains('active')){
        //The about A tag is excluded       
        if(event.target.textContent!=='about'){
          //The submenu appears
          subMenuEl.style.top="100%"
          //The subarray that belong to the A tag Active it is save in a constant
          const selectedSubmenu=menuLinks.find(subMenu=>subMenu.text===event.target.textContent)
          
          //The helper function bulidSubmenu is executed
          buildSubmenu(selectedSubmenu.subLinks)          
        }
        else {//if it is the About tag clicked
          //The submenu is hide
          subMenuEl.style.top="0"
          //the h1 in the main element is change to ABOUT
          mainEl.querySelector("h1").textContent=event.target.textContent
        }    
      }
      else{//if after toggle the A don't have the active class the submenu is hide
        subMenuEl.style.top="0"
      }
      
    }
   }
    
});

/***********************************************************************
 * Handle Event Lister for the SubMenu
 ***********************************************************************/
subMenuEl.addEventListener("click",event =>{
  //Adding the preventDefault to avoid propagation
  event.preventDefault();
  //if the element click in the submenu is not a tag.  Nothing happens
  if(event.target.tagName!=='A'){
    return;
  } 
  //Print in the console the text inside the A tag
  console.log(event.target.textContent)
  
  //Hide the submenu
  subMenuEl.style.top="0"
  //Iterate between the main menu A tags to remove the active class
  for(let i=0;i<topMenuLinks;i++){
    topMenuLinks.classList.remove("active")
  }
  //Change the h1 text with the name of the sub menu tag clicked
  mainEl.querySelector("h1").textContent=event.target.textContent
  
})


