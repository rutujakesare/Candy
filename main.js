const candyList = document.getElementById("candyList");
const addCandyButton = document.getElementById("addCandy");




let candies = [];

if (localStorage.getItem("candies")) {
    candies = JSON.parse(localStorage.getItem("candies"));
    candies.forEach((candyData) => {
      addCandyToCrudCrud(candyData);
    });
  }

  function saveCandiesToLocalStorage() {
    localStorage.setItem("candies", JSON.stringify(candies));
  }

function addCandyToCrudCrud(candyData) {

    candies.push(candyData);


    const listItem = document.createElement("li");
    candyList.appendChild(listItem);
    
    function updateListItem() {
        listItem.innerHTML = `${candyData.name} - ${candyData.description}, Price: Rs.${candyData.price}, Quantity: ${candyData.quantity}
        <button class="buy" data-amount="1">Buy One</button>
        <button class="buy" data-amount="2">Buy Two</button>
        <button class="buy" data-amount="3">Buy Three</button>`;
        
        const buyButtons = listItem.getElementsByClassName("buy");
        for (const button of buyButtons) {
            button.addEventListener("click", function () {
                const amount = parseInt(button.getAttribute("data-amount"));
                candyData.quantity -= amount;
                if (candyData.quantity < 0) {
                    candyData.quantity = 0;
                }
                updateListItem();
        saveCandiesToLocalStorage();
            });
        }
    }

    updateListItem(); 
   
   
    document.getElementById("candyName").value = "";
    document.getElementById("candyDescription").value = "";
    document.getElementById("candyPrice").value = "";
    document.getElementById("candyQuantity").value = "";

    saveCandiesToLocalStorage();
   
    

}

addCandyButton.addEventListener("click", function () {
    const candyName = document.getElementById("candyName").value;
    const candyDescription = document.getElementById("candyDescription").value;
    const candyPrice = parseFloat(document.getElementById("candyPrice").value);
    const candyQuantity = parseInt(document.getElementById("candyQuantity").value);

    if (candyName && candyPrice >= 0 && candyQuantity >= 0) {
        const candyData = {
            name: candyName,
            description: candyDescription,
            price: candyPrice,
            quantity: candyQuantity,
        };

        addCandyToCrudCrud(candyData);
    }
});



