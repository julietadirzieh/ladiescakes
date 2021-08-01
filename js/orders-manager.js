window.addEventListener('load', function() {
    initApp();
    OrdersLoad();
    $(".orders__detailsModal").hide();

  });
 var firebaseConfig = {
  apiKey: "AIzaSyCXZUv8ct3TB62OuN4nTJQUSu6lixkPeqU",
  authDomain: "ladiescakes-c06f0.firebaseapp.com",
  projectId: "ladiescakes-c06f0",
  storageBucket: "ladiescakes-c06f0.appspot.com",
  messagingSenderId: "1043015326795",
  appId: "1:1043015326795:web:86d474a173072478dd81ce"
    // apiKey: "AIzaSyCAG6jZJoV_Uhb5L_wc4q4c7Ra3BYCq4yk",
    // authDomain: "aromarte-web.firebaseapp.com",
    // databaseURL: "https://aromarte-web.firebaseio.com",
    // projectId: "aromarte-web",
    // storageBucket: "aromarte-web.appspot.com",
    // messagingSenderId: "931826286770",
    // appId: "1:931826286770:web:8eaa68cc3f4d2a3507c9ab",
    // measurementId: "G-X84GP08LHW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

 initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $(".noLog").hide();
        $(".onLog").show();
        $(".header__logOutButton").show();
      } else {
        // User is signed out.
        $(".noLog").show();
        $(".onLog").hide();
        $(".header__logOutButton").hide();
      }
    }, function(error) {
      console.log(error);
    });
  };


function LogOut() {
    firebase.auth().signOut()
  }
function OrdersLoad(){
  OrdersListClear();
  var dbRef = firebase.database().ref("orders");
  dbRef.once("value")
      .then(function(snapshot) {
  var dataBase = snapshot.val(); 
  if (dataBase == null || dataBase == undefined){
  }else{
    var keys = Object.keys(dataBase);
    var keysLength = keys.length;
  
    for(var i=0; i < keysLength; i++ ){
      var id = keys[i];
      var name = dataBase[id].customer.name;
      var lastName = dataBase[id].customer.lastName;
      var deliverMethod = dataBase[id].deliverMethod;
      var address = dataBase[id].customer.address;
      var status = dataBase[id].orderStatus
      var total = dataBase[id].total;

      OrdersListCreate(id,name,lastName,deliverMethod,address,status,total)

  }
}
}
  )};
function OrdersListCreate(id,name,lastName,deliverMethod,address,status,total){
  var namePlace = document.getElementById("orders-names");
  var addressPlace = document.getElementById("orders-address");
  var deliverMethodPlace = document.getElementById("orders-deliverMethod");
  var statusPlace = document.getElementById("orders-status");
  var statusChange = document.getElementById("order-statusChange");
  var moreInfoPlace = document.getElementById("orders-moreInfo");
  var totalPlace = document.getElementById("orders-total");
  var nameList = document.createElement("li");
  var addressList = document.createElement("li");
  var deliverMethodList = document.createElement("li");
  var statusList = document.createElement("li");
  var statusChangeList = document.createElement("li");
  var statusChangeButton = document.createElement("button");
  var statusCancellButton = document.createElement("button");
  var moreInfoList = document.createElement("li");
  var moreInfoIcon = document.createElement("i");
  var totalList = document.createElement("li");

  nameList.innerText = lastName+", "+name;
  nameList.className = "orders__listItem";
  addressList.innerText = address;
  addressList.className = "orders__listItem";
  deliverMethodList.innerText = deliverMethod;
  deliverMethodList.className = "orders__listItem";
  statusList.innerText = status;
  statusList.className = "orders__listItem";
  statusChangeList.className = "orders__listItem";
  statusChangeButton.setAttribute('onclick','ProceedTo("'+status+'","'+id+'")');
  switch(status){
    case 'pendiente':
      statusChangeButton.innerText = "procesado";
      statusList.style.backgroundColor = 'yellow';
      break;
    case 'procesado':
      statusChangeButton.innerText = "entregado";
      statusList.style.backgroundColor = 'orange';
      break;
    case 'entregado':
      statusChangeButton.innerText = "";
      statusChangeButton.hidden =true;
      statusCancellButton.hidden = true;
      statusList.style.backgroundColor = 'green';
      statusChangeList.innerText = "-No disponible-";
      break;
    case 'cancelado':
      statusChangeList.innerText = "-No disponible-";
      statusChangeButton.hidden =true;
      statusCancellButton.hidden = true;
      statusList.style.backgroundColor = 'red';
      break;
  }
  statusCancellButton.innerText = "Cancelar";
  statusCancellButton.setAttribute('onclick','CancellOrder("'+id+'")');
  totalList.innerText = "$"+total;
  totalList.className = "orders__listItem";
  moreInfoIcon.className = "fas fa-search";
  moreInfoIcon.setAttribute('onclick',"OrderDetails('"+id+"')" );
  moreInfoList.className = "orders__listItem";

  namePlace.appendChild(nameList);
  addressPlace.appendChild(addressList);
  deliverMethodPlace.appendChild(deliverMethodList);
  statusPlace.appendChild(statusList);
  statusChange.appendChild(statusChangeList);
  statusChangeList.appendChild(statusChangeButton);
  statusChangeList.appendChild(statusCancellButton);
  moreInfoPlace.appendChild(moreInfoList);
  moreInfoList.appendChild(moreInfoIcon);
  totalPlace.appendChild(totalList);
}

function RefreshOrders(){
  OrdersLoad()
}
function OrdersListClear(){
  $('#orders-names li:not(:first)').remove();
  $('#orders-address li:not(:first)').remove();
  $('#orders-deliverMethod li:not(:first)').remove();
  $('#orders-status li:not(:first)').remove();
  $('#order-statusChange li:not(:first)').remove();
  $('#orders-moreInfo li:not(:first)').remove();
  $('#orders-total li:not(:first)').remove();
}
function OrderDetails(id){
  $('#order-productDescription li:not(:first)').remove();
  $('#order-productQuantity li:not(:first)').remove();
  $('#order-productPricePerUnit li:not(:first)').remove();
  var dbRef = firebase.database().ref("orders");
  dbRef.once("value")
      .then(function(snapshot) {
  var dataBase = snapshot.val(); 
  if (dataBase == null || dataBase == undefined){
  }else{
      var name = dataBase[id].customer.name;
      var lastName = dataBase[id].customer.lastName;
      var deliverMethod = dataBase[id].deliverMethod;
      var deliverCost = dataBase[id].deliverCost;
      var address = dataBase[id].customer.address;
      var phone = dataBase[id].customer.phone;
      var email = dataBase[id].customer.email;
      var state = dataBase[id].customer.state;
      var city = dataBase[id].customer.city;
      var zip = dataBase[id].customer.zipCode;
      var status = dataBase[id].orderStatus;
      var payment = dataBase[id].payment;
      var extraRate = dataBase[id].extraRate;
      var total = dataBase[id].total;
      var comments =dataBase[id].customer.observations;
      

      $("#order-client").text(lastName+", "+name);
      $("#order-address").text(address);
      $("#order-phone").text(phone);
      $("#order-email").text(email);
      $("#order-stateCity").text(city+" / "+state);
      $("#order-zipCode").text(zip);
      $("#order-deliver").text(deliverMethod+" ($"+deliverCost+")");
      $("#order-status").text(status);
      $("#order-total").text(total);
      $("#order-comments").text(comments);
      if (payment == "Mercado Pago"){
        $("#order-payment").text(payment+" (Recargo: $"+extraRate+")");
      }else{
        $("#order-payment").text(payment);
      }

      var prodRef = firebase.database().ref("orders/"+id+"/products");
          prodRef.once("value")
              .then(function(snapshot) {
      var dataBaseProduct = snapshot.val(); 
      var products = dataBaseProduct.length;
      for(var i=0; i< products; i++){
        var productDescription = dataBaseProduct[i].product;
        var productQuantity = dataBaseProduct[i].quantity;
        var productPricePerUnit = dataBaseProduct[i].price;
        var descriptionPlace = document.getElementById("order-productDescription");
        var quantityPlace = document.getElementById("order-productQuantity");
        var pricePerUnitPlace = document.getElementById("order-productPricePerUnit");
        var descriptionList = document.createElement("li");
        var quatityList = document.createElement("li");
        var priceList = document.createElement("li");
  
        descriptionList.innerText = productDescription;
        quatityList.innerText = productQuantity;
        priceList.innerText = "$"+productPricePerUnit;
        descriptionPlace.appendChild(descriptionList);
        quantityPlace.appendChild(quatityList);
        pricePerUnitPlace.appendChild(priceList);
      }
    })
      

      $(".orders__detailsModal").show();
  }
      })
}
function ModalClose(){
  $(".orders__detailsModal").fadeOut(200);
}
function ProceedTo(status,id){
  switch(status){
    case 'pendiente':
      var db = firebase.database().ref('orders/'+id);
      db.update(
        {orderStatus: 'procesado'}
      )
    break;
    case 'procesado':
      var db = firebase.database().ref('orders/'+id);
      db.update(
        {orderStatus: 'entregado'}
      )
    break;
    case 'entregado':

    break;
    case 'cancelado':

    break;

  }
  OrdersLoad();
}
function CancellOrder(id){
  var db = firebase.database().ref('orders/'+id);
  db.update(
    {orderStatus: 'cancelado'}
  )
  OrdersLoad();
}
