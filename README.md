jquery.restoreform.min.js
=========================

A jQuery plugin to restore the original values of form's fields. 

## Usage
Step 1: include JQuery and translate.js in your page

    <script src="jquery.js"/>
    <script src="jquery.restore-form.min.js"></script>

Step 2: initialize the plugin

    // Basic 
    const formulario = $('form').restoreform(); 

    // Class Selector 
    const formulario = $('form').restoreform({
        'class': '.restaurar', 
    }); 

    // List of Elements 
    const formulario = $('form').restoreform({
        'elements': ['#lista', '#textoarea'], 
    }); 

    // With Custom Restore Functions 
    const formulario = $('form').restoreform({
        // 'class': '.restore', 
        // 'elements': ['#lista', '#textoarea'], 
        'onRestore': {
            "lista": restore_lista, 
        }, 
    }); 

Step 3: check for changes 

    // Return an array of elements 
    let cambios = formulario.getChanges(); 

    // Return true or false 
    let cambios = formulario.hasChanges(); 

Step 4: restore elements 

    // Restore all elements 
    formulario.restore(); 

    // Restore a single element
    let elemento = document.getElementById('lista'); 
    formulario.restore(elemento); 

## License
You may use translate.js under the terms of the MIT License. [More information](http://en.wikipedia.org/wiki/MIT_License).