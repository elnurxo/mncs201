const btn = document.querySelector("button");

btn.addEventListener("click",function(){
    if(btn.classList.contains("dark-btn")){
        btn.classList.remove("dark-btn");
        document.body.classList.add("dark");
        btn.textContent = "change to light mode";
    }
    else{
        btn.classList.add("dark-btn");
        document.body.classList.remove("dark");
        btn.textContent = "change to dark mode";
    }
});