/**
 * @file app.js
 * @brief Ejemplo de utilización de Restauración de Valores Originales de un Formulario. 
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 */

/**
 * Restaurar el valor original de la Lista Materialize
 * @param {type} campo
 * @returns {void}
 */
function restore_lista(campo) {
    $(`#${campo.id}`).val($(`#${campo.id}`).attr("data-original-value"));
    refreshSelect(campo.id);
}

/**
 * Restaurar el valor original de la Lista Multiple Materialize
 * @param {type} campo
 * @returns {void}
 */
function restore_lista_multiple(campo) {
    $(`#${campo.id}`).val($(`#${campo.id}`).attr("data-original-value").split(','));
    refreshSelect(campo.id);
}

/**
 * Core
 */
$(document).ready(function () {

    bootSelect();

    // MAGIA I
    const formulario = $('form').restoreform({
        // 'class': '.restore', 
        // 'elements': ['#lista', '#textoarea'], 
        'onRestore': {
            "lista": restore_lista,
            "lista-multiple": restore_lista_multiple,
        },
    });

    // Elementos dentro del Formulario
    const elementos = formulario.elements().map( elemento => {
        return {
            'id': elemento.id, 
            'name': elemento.name, 
            'tag': elemento.tagName, 
            'type': elemento.type, 
            'value': elemento.value, 
            'checked': elemento.checked, 
        }
    }); 
    console.table(elementos);

    // MAGIA II
    $('#comprobar').click(function () {
        // Obtenemos los campos modificados 
        let cambios = formulario.getChanges();

        // No tenemos cambios 
        if (cambios.length == 0) {
            alert('El formulario no tiene cambios');
            return false;
        }

        // Tenemos varios cambios 
        if (cambios.length > 0) {
            if (confirm(`Hay campos que han sido modificados ... ¿desea regresar el formulario a su estado original?`)) {
                formulario.restore();
                return true;
            }
        }

        // Tenemos cambios ... vamos a ver ke hacemos con todo esto 
        $.each(cambios, function (index, campo) {
            // Consultamos que hacemos 
            let elemento = document.getElementById(campo.id); 
            if (confirm(`El valor de ${campo.text} ha cambiado ... ¿desea regresarlo al valor original?`)) {
                formulario.restore(elemento);
            }
        });
    });

    // $('#texto').change(function(){
    //     const hayCambios = formulario.hasChanges(); 
    //     if (true == hayCambios &&  confirm('El valor ha cambiado ... ¿desea regresarlo al valor original?')) {
    //         let cambios = formulario.getChanges(); 
    //         console.log( {'Cambios': cambios });             
    //         formulario.restore(this); 
    //     }else{
    //         formulario.setData(this); 
    //     }
    // }); 

    // ... 
    // $('#lista').change(function(){
    //     let cambios = formulario.getChanges();         
    //     if (cambios.length > 0 &&  confirm('El valor ha cambiado ... ¿desea regresarlo al valor original?')) {
    //         console.log( {'Cambios': cambios });    
    //         formulario.restore(this); 
    //     }else{
    //         formulario.setData(this); 
    //     }
    // }); 

    // // ... 
    // $('#textoarea').change(function(){
    //     let cambios = formulario.getChanges(); 
    //     if (cambios.length > 0 && confirm('El valor ha cambiado ... ¿desea regresarlo al valor original?')) {
    //         formulario.restore(this); 
    //     }else{
    //         formulario.setData(this); 
    //     }
    // }); 

    // // ... 
    // $('#check_alfa').click(function(){
    //     let cambios = formulario.isChanged(this); 
    //     if (cambios.length > 0 && confirm('El valor ha cambiado ... ¿desea regresarlo al valor original?')) {
    //         formulario.restore(this); 
    //     }else{
    //         formulario.setData(this); 
    //     }
    // }); 

    // // ... 
    // $('[name="radio"]').change(function(){
    //     let cambios = formulario.getChanges(); 
    //     if (cambios.length > 0 && confirm('El valor ha cambiado ... ¿desea regresarlo al valor original?')) {
    //         formulario.restore(this); 
    //     }else{
    //         formulario.setData(this); 
    //     }
    // }); 

});