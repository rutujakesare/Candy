const candyList = document.getElementById("candyList");
const addCandyButton = document.getElementById("addCandy");
let candies = [];

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
      
            });
        }
    }

    updateListItem(); 
    candyList.appendChild(listItem); 
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

        axios.post("https://crudcrud.com/api/06a4627583774f2e9111cec93fd0d1f5/candy", candyData)
            .then((response) => {
                console.log(response)
                addCandyToCrudCrud(candyData);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    axios.get("https://crudcrud.com/api/06a4627583774f2e9111cec93fd0d1f5/candy")
    .then((response) =>{
        const candyData = response.data;
        
        for (const candy of candyData) {
            addCandyToCrudCrud(candy);
        }
    })
    .catch((error) => {
       console.log(error);
    });
    
})