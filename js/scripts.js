
function Init(){
    $('.body__modal').hide();
    $('.body__productModal').hide();
    CartCount();
    LoadFilters();
    CheckboxSelect('all');
}
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCXZUv8ct3TB62OuN4nTJQUSu6lixkPeqU",
    authDomain: "ladiescakes-c06f0.firebaseapp.com",
    projectId: "ladiescakes-c06f0",
    storageBucket: "ladiescakes-c06f0.appspot.com",
    messagingSenderId: "1043015326795",
    appId: "1:1043015326795:web:86d474a173072478dd81ce"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


function ProductsLoad(category){
    var dbRef = firebase.database().ref("products");
    dbRef.once("value")
        .then(function(snapshot) {
    var dataBase = snapshot.val(); 
    if(dataBase ==null || dataBase == undefined){
        $(".shop__noElements").show();
    }else{
        $(".shop__noElements").hide();
        var keys = Object.keys(dataBase);
        var keysLength = keys.length; 
            if(category == "all"){
                for(var i=0; i < keysLength; i++ ){
                var id = keys[i];   
                var nombre = dataBase[id].name;
                var precio = dataBase[id].price;
                var imageURL = dataBase[id].imageURL;
                ProductConstructor(id, nombre, precio, imageURL)
                }
            }else{
                $(".shop__noElements").show();
                for(var i=0; i < keysLength; i++ ){
                    var id = keys[i]; 
                    var itemCategory = dataBase[id].category;
                    if(category == itemCategory){
                        $(".shop__noElements").hide();
                        var nombre = dataBase[id].name;
                        var precio = dataBase[id].price;
                        var imageURL = dataBase[id].imageURL;
                        ProductConstructor(id, nombre, precio, imageURL)
    }}
            }
}
    }
    
)
};

function ProductConstructor(id, nombre, precio, imageURL){
    
    var place = document.getElementById('shop__list');
    var itemList = document.createElement('li');
    var paragraphTitle = document.createElement('p');
    var image = document.createElement('img');
    var divCreator = document.createElement('div');
    var paragraphPrice = document.createElement('p');
    var paragraphCheck = document.createElement('i')
    var productFooter = document.createElement('div')
    var linkToAdd = document.createElement('button');
    var cartIcon = document.createElement('i');
    var quantitySelector = document.createElement('div');
    var quantityReduce = document.createElement('button');
    var quantityText = document.createElement('p');
    var quantityIncrease = document.createElement('button');

    itemList.classList.add('shop__listItem');
    paragraphTitle.classList.add('shop__productLabel-title');
    paragraphTitle.innerText = nombre;
    paragraphTitle.setAttribute('onclick',"ProductClick('"+id+"')" );
    image.classList.add('shop__listImg');
    image.alt = nombre;
    image.src = imageURL;
    image.setAttribute('onclick',"ProductClick('"+id+"')" );
    divCreator.classList.add('shop__productLabelContainer');
    paragraphCheck.className = "fas fa-check-circle shop__cartAdd";
    paragraphCheck.id = "check-"+id;
    paragraphPrice.classList.add('shop__productLabel-price');
    //paragraphPrice.innerText = '$' +precio;
    productFooter.classList.add('shop__footer');
    linkToAdd.setAttribute('onclick',"CartClick('"+id+"','shop')" );
    cartIcon.classList.add('fas','fa-shopping-cart','cart-icon','shop__cartAdd');
    cartIcon.id= 'icon-'+id;
    quantitySelector.classList.add('shop__quantityContainer');
    quantityReduce.classList.add('button-quantity');
    quantityReduce.innerText = '-';
    quantityReduce.href = '#product-quantity';
    quantityReduce.setAttribute('onclick','QuantityButton("-","'+id+'","shop")' );
    quantityIncrease.classList.add('button-quantity');
    quantityIncrease.innerText = '+';
    quantityIncrease.href = '#product-quantity';
    quantityIncrease.setAttribute('onclick','QuantityButton("+","'+id+'","shop")' );
    quantityText.classList.add('shop__quantity');
    quantityText.innerText= 1;
    quantityText.id ='product-quantity__'+id;

    place.appendChild(itemList);
    itemList.appendChild(image);
    itemList.appendChild(paragraphTitle);
    itemList.appendChild(divCreator);
    divCreator.appendChild(paragraphPrice);
    itemList.appendChild(productFooter);
    productFooter.appendChild(linkToAdd);
    linkToAdd.appendChild(cartIcon);
    linkToAdd.appendChild(paragraphCheck);
    productFooter.appendChild(quantitySelector);
    quantitySelector.appendChild(quantityReduce);
    quantitySelector.appendChild(quantityText);
    quantitySelector.appendChild(quantityIncrease);
    $("#check-"+id).hide();
}

function CartClick(order,place){
    var dbRef = firebase.database().ref("products");
    dbRef.once("value")
        .then(function(snapshot) {
    var dataBase = snapshot.val(); 
    var key = order;
    
    var id = key;
    var product = dataBase[key].name;
    var cost = dataBase[key].price;
    var image = dataBase[key].imageURL
    var quantify;
    if(place == "modal"){
        quantify = Number(document.getElementById('product-quantity-modal__'+order).innerText);
        $("#gridCart__button-visible").fadeOut(500);
        $("#gridCart__button-hidden").delay(500).fadeIn(500);
        $("#gridCart__button-hidden").delay(1000).fadeOut(500);
        $("#gridCart__button-visible").delay(2000).fadeIn(500);
    }
    if(place == "shop"){
        $("#icon-"+order).fadeOut(500)
        $("#check-"+order).delay(500).fadeIn(500);
        $("#check-"+order).delay(2000).fadeOut(500);
        $("#icon-"+order).delay(3000).fadeIn(300);
        quantify = Number(document.getElementById('product-quantity__'+order).innerText);
    }
    
    function CarritoDeCompras() {
        this.compra = [];
        this.agregarCompra = function(compra){
            this.compra.push(compra)
            localStorage.setItem("carrito", JSON.stringify(this.compra));
        }
            this.tomarDatosIniciales = function() {
                if(localStorage.getItem('carrito') != null){
                    this.compra = JSON.parse(localStorage.getItem('carrito'))
                } 
            }
    
        }
        function Compra(id, product, price, quantity, image){
            this.id = id;
            this.product = product;
            this.price = price;
            this.quantity = quantity;
            this.image = image;
        
        }
        var nuevaCompra = new Compra(id, product, cost, quantify, image);
    ItemsCompare()
    function ItemsCompare(){
        var end = 0;
        if (localStorage.getItem('carrito') != null){
            
                var cantidad = JSON.parse(localStorage.getItem('carrito')).length;
                for(var i=0; i < cantidad;i++){
                    var idToCompare = JSON.parse(localStorage.getItem('carrito'))[i].id;
                    var idNew = id;
                    if( idNew == idToCompare){
                        var carrito = JSON.parse(localStorage.getItem('carrito'));
                        var cant = carrito[i].quantity;
                        var newCant = quantify;
                        carrito[i].quantity = cant + newCant;

                        localStorage.setItem('carrito',JSON.stringify(carrito));
                        end = 1;
                    }
                }
            
            if (end == 0 ){
                var nuevoCarritoDeCompras = new CarritoDeCompras();
                nuevoCarritoDeCompras.tomarDatosIniciales();
                nuevoCarritoDeCompras.agregarCompra(nuevaCompra);
            }
        }else{
            var nuevoCarritoDeCompras = new CarritoDeCompras();
                nuevoCarritoDeCompras.tomarDatosIniciales();
                nuevoCarritoDeCompras.agregarCompra(nuevaCompra);
        }
    }
    CartCount()
    });

    
    
}

function CartCount(){
    if (JSON.parse(localStorage.getItem('carrito')) !== null){
        $("#goToCheckout-button").show();
        $("#buttonModal-checkout").show();
        var cantidad = JSON.parse(localStorage.getItem('carrito')).length;
        var productos = 0;
        for(var i=0; i < cantidad; i++){
            productos = productos + Number(JSON.parse(localStorage.getItem('carrito'))[i].quantity);
        }
        document.getElementById('cartCount').innerText = productos+ ' Productos';
        return productos;
    }else{
        document.getElementById('cartCount').innerText = '0 Productos';
        $("#goToCheckout-button").hide();
        $("#buttonModal-checkout").hide();
    }

}
var total=0;
function TotalCart(){
    if (JSON.parse(localStorage.getItem('carrito')) == null){
    }else{
    total = 0;
    productos = JSON.parse(localStorage.getItem('carrito')).length;
    for(var i=0 ; i < productos ; i++){
        var precio = Number(JSON.parse(localStorage.getItem('carrito'))[i].price);
        var cant = Number(JSON.parse(localStorage.getItem('carrito'))[i].quantity);
        total= total + cant*precio;
    }
}
    
    document.getElementById('cart-value').innerText="$ "+ total;
    
}


function OpenCart(){
    
    TotalCart();
    CartClear();
    CartProductsCreator()
    $('.body__productModal').hide();    
    $('.body__modal').fadeToggle(300);
}
function CartProductsCreator(){
    if (localStorage.getItem('carrito') !== null){
        document.querySelector('.carritoVacio-text').style.display='none';
        document.getElementById('encabezadoCarrito').style.display='flex';
        

        for(var i=0 ; i < productos ; i++){
            var description = JSON.parse(localStorage.getItem('carrito'))[i].product;
            var price = JSON.parse(localStorage.getItem('carrito'))[i].price;
            var quantity = JSON.parse(localStorage.getItem('carrito'))[i].quantity;
            var image = JSON.parse(localStorage.getItem('carrito'))[i].image;
            
            var imageList = document.querySelector('.modal__imageColumn');
            var descriptionList = document.querySelector('.modal__descriptionColumn');
            var priceList = document.querySelector('.modal__priceColumn');
            var quantityList = document.querySelector('.modal__quantityColumn');
            var deleteList = document.querySelector('.modal__deleteColumn');
            var itemImageList = document.createElement('li');
            var itemImage = document.createElement('img');
            var itemDescripcion = document.createElement('li');
            var itemPrecio = document.createElement('li');
            var itemCantidad = document.createElement('li');
            var itemDelete = document.createElement('li');
            var deleteIcon = document.createElement('i');
            

            itemDescripcion.textContent = description; 
            itemPrecio.textContent = '$ '+price*quantity;
            itemCantidad.textContent = quantity;

            itemImage.className = 'imgProduct';
            itemImageList.id = 'imageProduct('+i+')';
            itemImage.setAttribute('src',image)
            itemDescripcion.className = 'listProduct';
            itemDescripcion.id = 'descriptionProduct('+i+')';
            itemPrecio.className = 'listProduct';
            itemPrecio.id = 'priceProduct('+i+')';
            itemCantidad.className = 'listProduct';
            itemCantidad.id = 'cantProduct('+i+')';
            itemDelete.className = 'listProduct';
            itemDelete.id = 'deleteProduct('+i+')';
            itemDelete.classList.add('cart-del');
            deleteIcon.className = "far fa-trash-alt";
            deleteIcon.classList.add('del-button');
            deleteIcon.setAttribute('onclick','DeleteCartItem('+i+')');


            itemDelete.appendChild(deleteIcon);
            imageList.appendChild(itemImageList);
            itemImageList.appendChild(itemImage);
            descriptionList.appendChild(itemDescripcion);
            priceList.appendChild(itemPrecio);
            quantityList.appendChild(itemCantidad);
            deleteList.appendChild(itemDelete);

           
            
        }
    }else{
        document.querySelector('.carritoVacio-text').style.display='block';
        document.getElementById('encabezadoCarrito').style.display='none';
    }
    
}
function CartClear(){
    $('.modal__imageColumn li:not(:first)').remove(); 
    $('.modal__descriptionColumn li:not(:first)').remove(); 
    $('.modal__priceColumn li:not(:first)').remove(); 
    $('.modal__quantityColumn li:not(:first)').remove(); 
    $('.modal__deleteColumn li:not(:first)').remove(); 
}

function DeleteCartItem(position){
    var carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(position, 1);
    localStorage.setItem('carrito',JSON.stringify(carrito));
    var descriptionList = document.querySelector('.modal__descriptionColumn');
    var descriptionToDelete = document.getElementById('descriptionProduct('+position+')');
    var priceList = document.querySelector('.modal__priceColumn');
    var priceToDelete = document.getElementById('priceProduct('+position+')');
    var quantityList = document.querySelector('.modal__quantityColumn');
    var quantityToDelete = document.getElementById('cantProduct('+position+')');
    var deleteList = document.querySelector('.modal__deleteColumn');
    var deleteIconToDelete = document.getElementById('deleteProduct('+position+')');

    descriptionList.removeChild(descriptionToDelete);
    priceList.removeChild(priceToDelete);
    quantityList.removeChild(quantityToDelete);
    deleteList.removeChild(deleteIconToDelete);
    CartCount();
    TotalCart();
    CartClear();
    CartProductsCreator();
}
function CartClean(){
    localStorage.removeItem('carrito');
    CartClear();
    CartCount();
    TotalCart();
    document.getElementById('cart-value').innerText="$ "+ 0;
}

function QuantityButton(input,id,place){
    if(place=="shop"){
        var valor = Number(document.getElementById('product-quantity__'+id).innerText);
        if (input == "+"){
            document.getElementById('product-quantity__'+id).innerText = valor+1;
        }else{
            if (valor == 1){

            }else{
                document.getElementById('product-quantity__'+id).innerText = valor-1;
            }

        }
    }
    if(place=="modal"){
    var valor = Number(document.getElementById('product-quantity-modal__'+id).innerText);
    if (input == "+"){
        document.getElementById('product-quantity-modal__'+id).innerText = valor+1;
    }else{
        if (valor == 1){

        }else{
            document.getElementById('product-quantity-modal__'+id).innerText = valor-1;
        }

    }
}
}

function ModalClose(select){
    if (select=='cart'){
        $('.body__modal').fadeOut(200);
    }
    if (select=='prod'){
        $('.body__productModal').fadeOut(200);
    }
};
function ProductClick(id){
    $('.body__modal').hide();
    $("#gridCart__button-hidden").hide();
    $('.body__productModal').show();

    var dbRef = firebase.database().ref("products");
    dbRef.once("value")
        .then(function(snapshot) {
    var dataBase = snapshot.val(); 

    var nombre = dataBase[id].name;
    var descripcion = dataBase[id].description;
    var precio = dataBase[id].price;
    var imageURL = dataBase[id].imageURL;
    
    $(".productModal__title").text(nombre);
    $(".gridImg__img").attr("src", imageURL);
    $(".gridCart__quantity-text").attr("id",'product-quantity-modal__'+id);
    $("#buttonCheck").attr('onclick',"CartClick('"+id+"','modal')" );
    $("#Product-buttonUp").attr("onclick", 'QuantityButton("+","'+id+'","modal")');
    $("#Product-buttonDown").attr("onclick", 'QuantityButton("-","'+id+'","modal")');
    document.querySelector(".gridDescription__text").innerText = descripcion ; //jquery no me respeta los br
    $(".gridPrice__price").text("$ "+precio);
        
    
        })
};
function LoadFilters(){
    var dbRef = firebase.database().ref("categories");
    dbRef.once("value")
        .then(function(snapshot) {
      var dataBase = snapshot.val(); 
      if (dataBase == null || dataBase == undefined){
      }else{
      var keys = Object.keys(dataBase);
      var keysLength = keys.length;
      
      for(var i=0; i < keysLength; i++ ){
          
        var id = keys[i];
        var category = dataBase[id];
        var place = document.querySelector(".shop__filter");
        var container = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");

        container.className ="filter__item";
        input.type = "checkbox";
        input.value = category;
        input.id = "filter-"+category;
        input.className = "input__filter"
        input.setAttribute('onchange','CheckboxSelect("'+category+'")');
        label.innerText = " "+category;
        label.for = "filter-"+category;

        place.appendChild(container);
        container.appendChild(input);
        container.appendChild(label);
      }
    }
        })
};

function CheckboxSelect(id){
        var count = document.getElementsByClassName("input__filter").length;
        for (var i=0; i < count; i++){
            if (document.getElementsByClassName("input__filter")[i].checked == true){
                document.getElementsByClassName("input__filter")[i].checked = false;
            }
        }
        
        document.getElementById("filter-"+id).checked = true;
        $('#shop__list li').remove();  
        ProductsLoad(id);
    };

