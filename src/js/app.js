/**
 * @file app.js
 * @brief Ejemplo de utilización de Restauración de Valores Originales de un Formulario. 
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 */

/**
 * Restaurar el valor original de la Lista Materialize Esta función es referida 
 * por el método {@link jQuery.fn.restoreform.restore restore} del Plugin. 
 * @param {HTMLElement} campo
 */
function restore_lista(campo) {
    $(`#${campo.id}`).val($(`#${campo.id}`).attr("data-original-value"));
    refreshSelect(campo.id);
}

/**
 * Restaurar el valor original de la Lista Multiple Materialize. Esta función es referida 
 * por el método {@link jQuery.fn.restoreform.restore restore} del Plugin. 
 * @param {HTMLElement} campo
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
});