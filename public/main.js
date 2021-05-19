var source = 'all';
var data ;
let grid;
var renderer;

$(document).ready(function () {





    renderer = function (value, record, $cell, $displayEl, id) {
        var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
            $updateBtn = $('<i class="fa fa-save gj-cursor-pointer" data-key="' + id + '"></i>').hide();
        $editBtn.on('click', function (e) {
            grid.edit($(this).data('key'));
            //alert("Aqui se edita");
            console.log(this);
            $editBtn.hide();
            $updateBtn.show();
        });
        $updateBtn.on('click', function (e) {
            grid.update($(this).data('key'));
            //alert("guardar?");
            $editBtn.show();
            $updateBtn.hide();
        });
        $displayEl.append($editBtn).append($updateBtn);
    };


    var caseSensitiveSort = function (direction, column) {
        return function (recordA, recordB) {
            var a = recordA[column.field] || '',
                b = recordB[column.field] || '';
            return (direction === 'asc') ? a < b : b < a;
        };
    };


    grid = $('#allProducts').grid({
        dataSource: '/all',
        uiLibrary: 'bootstrap4',
        responsive: true,
        primaryKey: 'nombre',
        inlineEditing:false,
        columns: [
            { field: 'nombre',editor: true,  },
            { field: 'cantidad', editor: true },
            { field: 'categoria',editor:false,title: 'Categoría', type: 'dropdown', editField: 'categoria' },
            { field: 'minimo', title: 'Min',priority:2, editor: false},
            { width: 45,align: 'left', renderer: renderer }            

        ],
        pager: { limit: 100000 }
    });
    grid.on('rowDataChanged', function (e, id, record) {
        // Clone the record in new object where you can format the data to format that is supported by the backend.
        var data = $.extend(true, {}, record);
        // Post the data to the server
        //alert('Record with nombre= "' + id + 'actualizado');

        $.ajax({ url: '/updateProduct', data: data, method: 'POST' })
            .fail(function () {
                alert('Failed to save.');
            },
                console.log(data.categoria)

            );


    });





});

let a = 1;

function filtrar(){
    var selector = document.getElementById("categorias");
    var valor = selector.value;
    var temp;
    
        $.ajax({
            type: "POST", 
            url: "/getCustom", 
            data: JSON.stringify({"name" : valor}), 
            contentType: "application/json", 
            success: function(d) {
                
                data =  JSON.stringify(d); 
                grid.clear();
                $('#allProducts').grid().render(JSON.parse(data));
   
            }, 
            error: function(d) {
                console.log("Error");
            }
        }); 

        console.log("RECIBIDO boton filtrar= "+ data);  
        
        //grid.reload(data); 
}


function search(){
    let selector = document.getElementById("inputBusqueda");
    let valor = selector.value;
    let temp;
    
        $.ajax({
            type: "POST", 
            url: "/getSearch", 
            data: JSON.stringify({"name" : valor}), 
            contentType: "application/json", 
            success: function(d) {
                
                data =  JSON.stringify(d); 
                grid.clear();
                $('#allProducts').grid().render(JSON.parse(data));
   
            }, 
            error: function(d) {
                console.log("Error");
            }
        }); 

        console.log("RECIBIDO boton filtrar= "+ data);  
        
        //grid.reload(data); 
};



function webInsert(){
    window.open("/webInsert","_self") 
};















