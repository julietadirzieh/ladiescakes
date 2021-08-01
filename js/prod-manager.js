function Init() {
  $("#body__alert").hide();
  ProductsLoad();
  CategoriesLoad();
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCXZUv8ct3TB62OuN4nTJQUSu6lixkPeqU",
  authDomain: "ladiescakes-c06f0.firebaseapp.com",
  projectId: "ladiescakes-c06f0",
  storageBucket: "ladiescakes-c06f0.appspot.com",
  messagingSenderId: "1043015326795",
  appId: "1:1043015326795:web:86d474a173072478dd81ce",
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

var storageService = firebase.storage();

function CreateProduct() {
  var name = $("#input-name").val();
  var description = $("#text-description").val();
  var price = $("#input-price").val();
  var category = $("#input-category").val();
  var imageFile = document.getElementById("input-image").files[0];
  verifyNotNull(name, description, price, category, imageFile);
  var isNull = verifyNotNull(name, description, price, category, imageFile);
  if (isNull == false) {
    SaveProduct(name, description, price, category, imageFile);
    document.getElementById("alert__message").innerText =
      "¡Producto creado con éxito!";
    document.getElementById("productsEntry-form").reset();
  }
}
function SaveProduct(name, description, price, category, imageFile) {
  var imageName = imageFile.name.replace(/ /g, "-");
  var db = firebase.database().ref("products").push();
  var imgDb = firebase.storage().ref("imagenes/" + imageName);

  imgDb.put(imageFile).then(function (snapshot) {
    imgDb.getDownloadURL().then(function (downloadURL) {
      db.set({
        name: name,
        description: description,
        price: price,
        category: category.toLowerCase(),
        imageURL: downloadURL,
        imageRef: "imagenes/" + imageName,
      }).then(function () {
        ProductsClear();
        ProductsLoad();
        $(".imagePreview").remove();
      });
    });
  });

  $("#body__alert").show();
}
function verifyNotNull(name, description, price, category, imageFile) {
  var isNull = false;
  if (name == "") {
    document.getElementById("input-name-alert").innerText =
      "¡Ingrese un nombre!";
    isNull = true;
  } else {
    document.getElementById("input-name-alert").innerText = "";
  }
  if (price == "") {
    document.getElementById("input-price-alert").innerText =
      "¡Ingrese un precio!";
    isNull = true;
  } else {
    document.getElementById("input-price-alert").innerText = "";
  }
  if (category == "") {
    document.getElementById("input-category-alert").innerText =
      "¡Ingrese una categoría!";
    isNull = true;
  } else {
    document.getElementById("input-category-alert").innerText = "";
  }
  if (imageFile == undefined) {
    document.getElementById("input-image-alert").innerText =
      "¡Ingrese una imágen!";
    isNull = true;
  } else {
    document.getElementById("input-image-alert").innerText = "";
  }
  if (description == "") {
    document.getElementById("input-description-alert").innerText =
      "¡Ingrese una descripción!";
    isNull = true;
  } else {
    document.getElementById("input-description-alert").innerText = "";
  }

  return isNull;
}
function CloseAlert() {
  $("#body__alert").hide();
}

//-----------------------------
initApp = function () {
  firebase.auth().onAuthStateChanged(
    function (user) {
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
    },
    function (error) {
      console.log(error);
    }
  );
};

window.addEventListener("load", function () {
  initApp();
});

var exist = false;
function ProductPreview() {
  if (exist == true) {
    $(".shop__listItem").remove();
  }
  var nombre = document.getElementById("input-name").value;
  var descripcion = document.getElementById("text-description").value;
  var precio = document.getElementById("input-price").value;
  let img = document.getElementById("input-image").files[0];
  let reader = new FileReader();

  if (nombre != "" && descripcion != "" && precio != "" && img != undefined) {
    reader.readAsDataURL(img);
    reader.onload = function () {
      var place = document.querySelector(".shop__list");
      var itemList = document.createElement("li");
      var paragraphTitle = document.createElement("p");
      var image = document.createElement("img");
      var divCreator = document.createElement("div");
      var paragraphPrice = document.createElement("p");
      var productFooter = document.createElement("div");
      var linkToAdd = document.createElement("button");
      var cartIcon = document.createElement("i");
      var quantitySelector = document.createElement("div");
      var quantityReduce = document.createElement("button");
      var quantityText = document.createElement("p");
      var quantityIncrease = document.createElement("button");

      itemList.classList.add("shop__listItem");
      paragraphTitle.classList.add("shop__productLabel-title");
      paragraphTitle.innerText = nombre;
      image.classList.add("shop__listImg");
      image.alt = nombre;
      image.src = reader.result;
      divCreator.classList.add("shop__productLabelContainer");
      paragraphPrice.classList.add("shop__productLabel-price");
      paragraphPrice.innerText = "$" + precio;
      productFooter.classList.add("shop__footer");
      cartIcon.classList.add(
        "fas",
        "fa-shopping-cart",
        "cart-icon",
        "shop__cartAdd"
      );
      quantitySelector.classList.add("shop__quantityContainer");
      quantityReduce.classList.add("button-quantity");
      quantityReduce.innerText = "-";
      quantityReduce.href = "#product-quantity";
      quantityIncrease.classList.add("button-quantity");
      quantityIncrease.innerText = "+";
      quantityIncrease.href = "#product-quantity";
      quantityText.classList.add("shop__quantity");
      quantityText.innerText = 1;

      place.appendChild(itemList);
      itemList.appendChild(image);
      itemList.appendChild(divCreator);
      itemList.appendChild(paragraphTitle);
      divCreator.appendChild(paragraphPrice);
      itemList.appendChild(productFooter);
      productFooter.appendChild(linkToAdd);
      linkToAdd.appendChild(cartIcon);
      productFooter.appendChild(quantitySelector);
      quantitySelector.appendChild(quantityReduce);
      quantitySelector.appendChild(quantityText);
      quantitySelector.appendChild(quantityIncrease);

      exist = true;
    };
  } else {
    document.getElementById("alert__message").innerText =
      "Para previsualizar ingrese todos los datos";
    $("#body__alert").show();
  }
}

function imagePreview() {
  let img = document.getElementById("input-image").files[0];
  let reader = new FileReader();
  reader.readAsDataURL(img);

  reader.onload = function () {
    let preview = document.getElementById("img-preview"),
      image = document.createElement("img");
    image.className = "imagePreview";

    image.src = reader.result;
    preview.innerHTML = "";
    preview.append(image);
  };
}

function LogOut() {
  firebase.auth().signOut();
}

function ProductsLoad() {
  var dbRef = firebase.database().ref("products");
  dbRef.once("value").then(function (snapshot) {
    var dataBase = snapshot.val();
    if (dataBase == null || dataBase == undefined) {
      $("#productsModify__empty").show();
    } else {
      $("#productsModify__empty").hide();
      var keys = Object.keys(dataBase);
      var keysLength = keys.length;

      for (var i = 0; i < keysLength; i++) {
        var id = keys[i];
        var nombre = dataBase[id].name;
        var imageURL = dataBase[id].imageURL;
        ProductConstructor(id, nombre, imageURL);
      }
    }
  });
}

function ProductConstructor(id, nombre, imageURL) {
  var place = document.getElementById("shop__list");
  var itemList = document.createElement("li");
  var paragraphTitle = document.createElement("p");
  var image = document.createElement("img");
  var productFooter = document.createElement("div");
  var deleteItem = document.createElement("button");
  var editItem = document.createElement("button");

  itemList.classList.add("shop__listItem-modify");
  paragraphTitle.classList.add("shop__productLabel-title");
  paragraphTitle.innerText = nombre;
  image.classList.add("shop__listImg");
  image.alt = nombre;
  image.src = imageURL;
  productFooter.classList.add("shop__footer");
  deleteItem.innerText = "Borrar";
  //editItem.innerText = "Editar";
  deleteItem.className = "items__modifiedButton";
  editItem.className = "items__modifiedButton";
  deleteItem.setAttribute("onclick", "DeleteItem('" + id + "')");
  editItem.setAttribute("onclick", "EditItem('" + id + "')");

  place.appendChild(itemList);
  itemList.appendChild(image);
  itemList.appendChild(paragraphTitle);
  itemList.appendChild(productFooter);
  productFooter.appendChild(deleteItem);
  //productFooter.appendChild(editItem);
}
function DeleteItem(id) {
  var dbRef = firebase.database().ref("products");
  dbRef.once("value").then(function (snapshot) {
    var dataBase = snapshot.val();

    var imageRef = dataBase[id].imageRef;
    var storageRef = firebase.storage().ref(imageRef);
    // Delete the file
    storageRef
      .delete()
      .then(function () {
        // File deleted successfully
        firebase
          .database()
          .ref("products/" + id)
          .remove();
        document.getElementById("alert__message").innerText =
          "Producto eliminado con éxito";
        ProductsClear();
        ProductsLoad();
        $("#body__alert").show();
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  });
}
function EditItem(id) {
  document.getElementById("alert__message").innerText =
    "Función no disponible. Borre el item y creelo de nuevo.";
  $("#body__alert").show();
}
function ProductsClear() {
  $(".shop__list-modify li:not(:first)").remove();
}
function CategoriesLoad() {
  var dbRef = firebase.database().ref("categories");
  dbRef.once("value").then(function (snapshot) {
    var dataBase = snapshot.val();
    if (dataBase == null || dataBase == undefined) {
      $("#categories__empty").show();
    } else {
      $("#categories__empty").hide();
      var keys = Object.keys(dataBase);
      var keysLength = keys.length;

      for (var i = 0; i < keysLength; i++) {
        var id = keys[i];
        var category = dataBase[id];
        var place = document.querySelector(".category__list");
        var placeForm = document.getElementById("input-category");
        var option = document.createElement("option");
        var listItem = document.createElement("li");
        var textItem = document.createElement("p");
        var deleteIcon = document.createElement("i");

        option.value = category;
        option.innerText = category;
        listItem.className = "category__listItem";
        textItem.innerText = category;
        textItem.className = "category__textItem";
        deleteIcon.className = "far fa-trash-alt del-icon";
        deleteIcon.classList.add("del-button");
        deleteIcon.setAttribute("onclick", 'DeleteCategory("' + id + '")');

        placeForm.appendChild(option);
        place.appendChild(listItem);
        listItem.appendChild(textItem);
        listItem.appendChild(deleteIcon);
      }
    }
  });
}

function CategoryAdd() {
  var category = document
    .getElementById("input__newCategory")
    .value.toLowerCase();
  if (category != "") {
    var db = firebase.database().ref("categories").push();
    db.set(category).then(function () {
      document.getElementById("categoryAdd__form").reset();
      document.getElementById("alert__message").innerText =
        "Categoría agregada con éxito";
      $(".category__list li:not(:first)").remove();
      $("#input-category option").remove();
      CategoriesLoad();
      $("#body__alert").show();
    });
  } else {
    document.getElementById("alert__message").innerText =
      "Ingrese una categoría";
    $("#body__alert").show();
  }
}
function DeleteCategory(id) {
  firebase
    .database()
    .ref("categories/" + id)
    .remove();
  $(".category__list li:not(:first)").remove();
  CategoriesLoad();
}
