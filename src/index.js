//import "./styles.css";
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
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList = "flex-ctr";
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");
for (let i = 0; i < menuLinks.length; i++) {
  let aE1 = document.createElement("a");
  aE1.textContent = menuLinks[i].text;
  aE1.setAttribute("href", menuLinks[i].href);
  topMenuEl.appendChild(aE1);
}

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList = "flex-around";
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";


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



//const topMenuLinks = document.getElementsByTagName("a");
const topMenuLinks = topMenuEl.children;
//console.log(topMenuLinks)
topMenuEl.addEventListener("click", event => {
  event.preventDefault();
  if(event.target.tagName!=='A'){
       return;
     }
   //console.log(event.target.textContent);
   for(let i=0;i<topMenuLinks.length;i++){
    //console.log(event.target.textContent+" "+ topMenuLinks[i].textContent)
    if(topMenuLinks[i].textContent!==event.target.textContent){
      //console.log("remove active from"+topMenuLinks[i].textContent)
      topMenuLinks[i].classList.remove("active")
    } else {
      //console.log("add active from"+topMenuLinks[i].textContent)
      topMenuLinks[i].classList.toggle("active")
      if(topMenuLinks[i].classList.contains('active')){
        //activar el submenu       
        if(event.target.textContent!=='about'){
          //dibjuar el submenu
          subMenuEl.style.top="100%"
          //obtener el array del objeto submenu a mostrar
          const selectedSubmenu=menuLinks.find(subMenu=>subMenu.text===event.target.textContent)
          console.log(selectedSubmenu.subLinks)
          
          buildSubmenu(selectedSubmenu.subLinks)
         // console.log("active otro submenu")
          
        }
        else {
          subMenuEl.style.top="0"
          mainEl.querySelector("h1").textContent=event.target.textContent
        }    
      }
      else{
        subMenuEl.style.top="0"
        //console.log("inactive un submenu")
      }
      
    }
   }
   
  
});

subMenuEl.addEventListener("click",event =>{
  event.preventDefault();
  if(event.target.tagName!=='A'){
    return;
  } 
  console.log(event.target.textContent)
  subMenuEl.style.top="0"
  
  for(let i=0;i<topMenuLinks;i++){
    topMenuLinks.classList.remove("active")
  }

  mainEl.querySelector("h1").textContent=event.target.textContent
  
})


