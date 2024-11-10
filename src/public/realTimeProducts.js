const socketClient = io();

const form = document.getElementById('productForm');
const prodName = document.getElementById('name');
const prodPrice = document.getElementById('price');
const prodStock = document.getElementById('stock');
const prodCategory = document.getElementById('category');
const prodDescription = document.getElementById('description');

const tableBody = document.getElementById('productTableBody');

// Captura todos los value de los inputs y emite un producto al servidor
form.onsubmit = (e) => {
    e.preventDefault();

    const name = prodName.value;
    const price = prodPrice.value;
    const stock = prodStock.value;
    const category = prodCategory.value;
    const description = prodDescription.value;

    socketClient.emit('newProd', { name, price, stock, category, description });
    form.reset();
};


socketClient.on('updateProducts', (products) => {

    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        // Crea las celdas de la tabla con la información del producto
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td>
                <button>Eliminar und</button>
            </td>
            <td>
                <button>Eliminar Todo</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
});

