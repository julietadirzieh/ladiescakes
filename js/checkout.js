function Init() {
  CartLoad();
  TotalCart();
  $("#body__alert").hide();
}
var firebaseConfig = {
  apiKey: "AIzaSyCXZUv8ct3TB62OuN4nTJQUSu6lixkPeqU",
  authDomain: "ladiescakes-c06f0.firebaseapp.com",
  projectId: "ladiescakes-c06f0",
  storageBucket: "ladiescakes-c06f0.appspot.com",
  messagingSenderId: "1043015326795",
  appId: "1:1043015326795:web:86d474a173072478dd81ce",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function CartLoad() {
  if (JSON.parse(localStorage.getItem("carrito")) !== null) {
    var cantidad = JSON.parse(localStorage.getItem("carrito")).length;
    var productos = 0;
    for (var i = 0; i < cantidad; i++) {
      productos =
        productos +
        Number(JSON.parse(localStorage.getItem("carrito"))[i].quantity);
    }
  }

  for (var i = 0; i < cantidad; i++) {
    var description = JSON.parse(localStorage.getItem("carrito"))[i].product;
    var price = JSON.parse(localStorage.getItem("carrito"))[i].price;
    var quantity = JSON.parse(localStorage.getItem("carrito"))[i].quantity;
    var image = JSON.parse(localStorage.getItem("carrito"))[i].image;

    var descriptionList = document.getElementById("checkout__listDescription");
    var imageList = document.getElementById("checkout__listImage");
    var priceList = document.getElementById("checkout__listPrice");
    var quantityList = document.getElementById("checkout__listQuantity");
    var totalList = document.getElementById("checkout__listTotal");
    var itemDescripcion = document.createElement("li");
    var itemPrecio = document.createElement("li");
    var itemCantidad = document.createElement("li");
    var itemImageList = document.createElement("li");
    var itemImage = document.createElement("img");
    var itemTotal = document.createElement("li");

    itemDescripcion.textContent = description;
    itemPrecio.textContent = "";//"$ " + price;
    itemCantidad.textContent = quantity;
    itemImageList.className = "checkout__listItem-img";
    itemImageList.id = 'imageProduct("' + i + '")';
    itemImage.src = image;
    itemImage.className = "CheckoutImageProduct";
    itemDescripcion.className = "checkout__listItem";
    itemDescripcion.id = 'descriptionProduct("' + i + '")';
    itemPrecio.className = "checkout__listItem";
    itemPrecio.id = 'priceProduct("' + i + '")';
    itemCantidad.className = "checkout__listItem";
    itemCantidad.id = 'cantProduct("' + i + '")';
    itemTotal.className = "checkout__listItem";
    itemTotal.id = 'TotalProduct("' + i + '")';
    itemTotal.textContent = ""; //"$ " + price * quantity;

    imageList.appendChild(itemImageList);
    itemImageList.appendChild(itemImage);
    descriptionList.appendChild(itemDescripcion);
    priceList.appendChild(itemPrecio);
    quantityList.appendChild(itemCantidad);
    totalList.appendChild(itemTotal);
  }
  $("#checkout__mpRate").hide();
}
var total = 0;
function TotalCart() {
  if (JSON.parse(localStorage.getItem("carrito")) == null) {
    $("#checkout__buyButton").hide();
  } else {
    total = 0;
    productos = JSON.parse(localStorage.getItem("carrito")).length;
    for (var i = 0; i < productos; i++) {
      var precio = Number(JSON.parse(localStorage.getItem("carrito"))[i].price);
      var cant = Number(
        JSON.parse(localStorage.getItem("carrito"))[i].quantity
      );
      total = total + cant * precio;
    }
    total = total + mercadoPagoExtraRate + deliveryCost;
  }
  document.getElementById("cart-value").innerText = "$ " + total;
  return total;
}
var deliveryCost = 0;
function DeliverSelect(selection) {
  deliveryCost = 0;
  switch (selection) {
    case "takeAway":
      $("#deliverRate-text").text("$ 0");
      break;
    case "delivery":
      $("#deliverRate-text").text("$ 200");
      deliveryCost = 200;
      break;
    case "freeDelivery":
      $("#deliverRate-text").text("Bonificado");
      break;
  }
  if (document.getElementById("payment-mp").checked == true) {
    PaymentSelect("mercadopago");
  }
  TotalCart();
  return deliveryCost;
}
var mercadoPagoExtraRate = 0;
function PaymentSelect(selection) {
  mercadoPagoExtraRate = 0;
  switch (selection) {
    case "mercadopago":
      mercadoPagoExtraRate = Number((Number(TotalCart()) * 0.07).toFixed(2));
      $("#checkout__mpRate").show();
      $("#mpRate-text").text("$ " + mercadoPagoExtraRate);
      deliverCost = 0;
      break;
    case "cash":
      $("#checkout__mpRate").hide();
      break;
  }
  TotalCart();
  return mercadoPagoExtraRate;
}

function BuyClick() {
  var name = document.getElementById("customer__name").value;
  var lastName = document.getElementById("customer__lastName").value;
  var email = document.getElementById("customer__email").value;
  var phone = document.getElementById("customer__phone").value;
  var address = "Direccion" //document.getElementById("customer__address").value;
  var zipCode = "CP"//document.getElementById("customer__addressZip").value;
  var city = "Ciudad" //document.getElementById("customer__addressCity").value;
  var state = "Pais"//document.getElementById("customer__addressState").value;
  var observations = document.getElementById("customer__observations").value;
  var payment;
  if (document.getElementById("payment-cash").checked == true) {
    payment = "Efectivo";
  }
  if (document.getElementById("payment-mp").checked == true) {
    payment = "Mercado Pago";
  }
  if (document.getElementById("deliver-takeAway").checked == true) {
    var deliverMethod = "Retiro por local";
  }
  if (document.getElementById("deliver-freeDelivery").checked == true) {
    var deliverMethod = "Cadete";
  }
  if (document.getElementById("deliver-delivery").checked == true) {
    var deliverMethod = "Cadete";
  }
  if (
    DataFillCheck(
      name,
      lastName,
      email,
      phone,
      address,
      zipCode,
      city,
      state
    ) == false
  ) {
    if (deliverMethod == null || deliverMethod == undefined) {
      $("#deliver-alert").text("Ingrese un método de envío");
      return;
    } else {
      if (payment == null || payment == undefined) {
        $("#payment-alert").text("Ingrese un método de pago");
        return;
      } else {
        if (JSON.parse(localStorage.getItem("carrito")) !== null) {
          var db = firebase.database().ref("orders").push();
          db.set({
            customer: {
              name: name,
              lastName: lastName,
              email: email,
              phone: phone,
              address: address,
              zipCode: zipCode,
              city: city,
              state: state,
              observations: observations,
            },
            products: JSON.parse(localStorage.getItem("carrito")),
            orderStatus: "pendiente",
            payment: "cash",
            extraRate: mercadoPagoExtraRate,
            deliverMethod: deliverMethod,
            deliverCost: deliveryCost,
            total: TotalCart(),
          });
        }
      }
    }

    whatsapp();
  }
  $("#body__alert").show();
}

function whatsapp() {
  var productos = JSON.parse(localStorage.getItem("carrito"));

    var map = productos.map(function (producto) {
    return `${producto.quantity} ${producto.product}
`;
  });

var str = `Me contacto para pedir cotización sobre las siguientes delicias:
${map}
`;

  console.log(str);

  var number = "+51992407941";

  var url =
    "whatsapp://send?text=" +
    encodeURIComponent(str) +
    "&phone=" +
    encodeURIComponent(number);

  window.open(url);
}

function DataFillCheck(
  name,
  lastName,
  email,
  phone,
  address,
  zip,
  city,
  state
) {
  var isNull = false;
  if (name == "") {
    document.getElementById("customer-name-alert").innerText =
      "¡Ingrese un nombre!";
    isNull = true;
  } else {
    document.getElementById("customer-name-alert").innerText = "";
  }
  if (lastName == "") {
    document.getElementById("customer-lastName-alert").innerText =
      "¡Ingrese un apellido!";
    isNull = true;
  } else {
    document.getElementById("customer-lastName-alert").innerText = "";
  }
  if (email == "") {
    document.getElementById("customer-email-alert").innerText =
      "¡Ingrese un correo electrónico!";
    isNull = true;
  } else {
    document.getElementById("customer-email-alert").innerText = "";
  }
  if (phone == "") {
    document.getElementById("customer-phone-alert").innerText =
      "¡Ingrese un teléfono!";
    isNull = true;
  } else {
    document.getElementById("customer-phone-alert").innerText = "";
  }
  if (address == "") {
    document.getElementById("customer-address-alert").innerText =
      "¡Ingrese un domicilio!";
    isNull = true;
  } else {
    document.getElementById("customer-address-alert").innerText = "";
  }
  if (zip == "") {
    document.getElementById("customer-zip-alert").innerText =
      "¡Ingrese el código postal!";
    isNull = true;
  } else {
    document.getElementById("customer-zip-alert").innerText = "";
  }
  if (city == "") {
    document.getElementById("customer-city-alert").innerText =
      "¡Ingrese su ciudad!";
    isNull = true;
  } else {
    document.getElementById("customer-city-alert").innerText = "";
  }
  if (state == "") {
    document.getElementById("customer-state-alert").innerText =
      "¡Ingrese su provincia!";
    isNull = true;
  } else {
    document.getElementById("customer-state-alert").innerText = "";
  }

  return isNull;
}
function GoHome() {
  localStorage.removeItem("carrito");
  window.location.href = "../index.html";
}
