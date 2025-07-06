document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    
    if (!/^\d+$/.test(productId)) {
        alert('El ID del producto debe contener solo números');
        return;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(productName)) {
        alert('El nombre del producto solo puede contener letras y espacios');
        return;
    }
    
    if (isNaN(productPrice) || productPrice <= 0) {
        alert('El precio debe ser un número mayor que 0');
        return;
    }
    
    if (isNaN(productQuantity) || productQuantity <= 0) {
        alert('La cantidad debe ser un número entero mayor que 0');
        return;
    }
    
    const subtotal = productPrice * productQuantity;
    
    const table = document.getElementById('productTable');
    const row = table.insertRow();
    
    row.innerHTML = `
        <td>${productId}</td>
        <td>${productName}</td>
        <td>L.${productPrice.toFixed(2)}</td>
        <td>${productQuantity}</td>
        <td>L.${subtotal.toFixed(2)}</td>
    `;
    
    updateTotals();
    document.getElementById('productForm').reset();
});

function updateTotals() {
    const rows = document.querySelectorAll('#productTable tr');
    let subtotal = 0;
    
    rows.forEach(row => {
        const rowSubtotal = parseFloat(row.cells[4].textContent.replace('L.', ''));
        subtotal += rowSubtotal;
    });
    
    const discount = subtotal * 0.10;
    const isv = subtotal * 0.15;
    const total = subtotal - discount + isv;
    
    document.getElementById('subtotal').value = `L.${subtotal.toFixed(2)}`;
    document.getElementById('discount').value = `L.${discount.toFixed(2)}`;
    document.getElementById('isv').value = `L.${isv.toFixed(2)}`;
    document.getElementById('total').value = `L.${total.toFixed(2)}`;
}
