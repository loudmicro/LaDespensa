var producto = { 
    nombre: "", 
    cantidad: "", 
    categoria: "", 
    minimo:""
}; 





function saveProduct(){

    producto.nombre = document.getElementById('inputNombre').value.toLowerCase();
    producto.cantidad= document.getElementById('inputCantidad').value.toLowerCase();
    producto.categoria= document.getElementById('inputCategoria').value.toLowerCase();
    producto.minimo = document.getElementById('inputMinimo').value.toLowerCase();

    let temp = document.getElementById('inputNombre').value.toLowerCase();
    document.getElementById("ultimo").innerHTML = temp;

    let tempCategoria = document.getElementById('inputCategoria').value;

    let data = '['+JSON.stringify(producto)+']';
    console.log(data);

    $.ajax({
        type: "POST", 
        url: "/addproduct", 
        data: data, 
        contentType: "application/json", 
        success: function(d) {
            
            console.log("Añadido");
        }, 
        error: function(d) {
            console.log("Error");
        }
    }); 

    temp = producto.nombre;
    

    document.getElementById("myForm").reset(); 
    document.getElementById("inputNombre").focus();


    document.getElementById('inputCategoria').value = tempCategoria;

    


}


function webInicio(){
    window.open("/","_self") 
}

function webInsert(){
    window.open("/webInsert","_self") 
}

function webAll(){
    window.open("/webListAll","_self") 
}

function webAllEdit(){
    window.open("/webListAllEdit","_self") 
}

function webNeeded(){
    window.open("/webListNeeded","_self") 
}

function webTest(){
    window.open("/webTest","_self") 
}

