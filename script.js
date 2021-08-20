let submit = document.getElementById("randomize");
submit.addEventListener("click", showActivity);

function showActivity(event) {
  let root = "https://www.boredapi.com/api/activity";
  event.preventDefault();
  // console.log(event)
  let type = getType();
  let participants = getParticipants();
  let price = getPrice();
  console.log(price)
  let params = [];
  // console.log(type)
  if (type) {
    params.push(`type=${type}`);
  }

  if (participants) {
    params.push(`participants=${participants}`);
  }

  if (price) {
    if (price == 1) {
      params.push("price=0.0&price=0.1&price=0.2");
    }
    if (price == 2) {
      params.push("price=0.3&price=0.4&price=0.5");
      console.log(params)
    }
    if (price == 3) {
      params.push("price=0.6&price=0.7&price=0.8&price=0.9");
    }
  }

  console.log(`This is the params ${params}`);

  if (params.length > 0) {
    root += "?";
    params.forEach((element) => {
      root += element + "&";
    });
    root = root.substring(0, root.length - 1);
  }

  fetch(root)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.price)

      if (data.error) {
        swal(
          "Oh No!!",
          "There are no results for the filters selected. Please try again",
          "warning"
        );
      } else {
        const newActivity = document.createElement("div");
        newActivity.className = "activity";
        const chosenActivity = document.createElement("h2");
        chosenActivity.className = "selectedActivity";
        chosenActivity.innerText = data.activity;
        const chosenType = document.createElement("p");
        chosenType.innerText = `Type: ${data.type}`;
        const chosenParticipants = document.createElement("p");
        if (data.participants === 1) {
          chosenParticipants.innerText = "An activity just for you";
        } else {
          chosenParticipants.innerText = `Ideal participants: ${data.participants}`;
        }
        const chosenPrice = document.createElement("p");
        switch(data.price){
            case 0.0:
            case 0.1:
            case 0.2:
                chosenPrice.innerText = 'Price: $';
                break;
            case 0.3:
            case 0.4:
            case 0.5:
                chosenPrice.innerText = 'Price: $$';
                break;
            case 0.6:
            case 0.7:
            case 0.8:
            case 0.9:
                chosenPrice.innerText = 'Price: $$$';
                break;
        }
        let remove = document.createElement('button');
        remove.innerText='Dislike/Remove Activity';
        remove.addEventListener('click', removeActivity)

        let completed = document.createElement('button');
        completed.innerText='Completed Activity';
        completed.addEventListener('click', (e) =>{
            e.target.parentElement.style.background = "lightgreen";
            e.target.remove();
         });


        let addNewActivity = document.getElementById("activities");
        newActivity.append(chosenActivity);
        newActivity.append(chosenType);
        newActivity.append(chosenParticipants);
        newActivity.append(chosenPrice);
        newActivity.append(remove);
        newActivity.append(completed);
        addNewActivity.prepend(newActivity);
      }
    });
}

function getType() {
  let type = document.getElementById("type");
  return type.options[type.selectedIndex].value;
}

function getParticipants() {
  let participants = document.getElementById("participants");
  return participants.options[participants.selectedIndex].value;
}

function getPrice() {
  let price = document.getElementById("price");
  return price.options[price.selectedIndex].value;
}

function removeActivity(e){
e.target.parentElement.remove();
}