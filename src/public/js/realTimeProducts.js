const socket = io();

const productForm = document.getElementById('add-product-form');
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        thumbnails: document.getElementById('category').value
    };
    socket.emit('newProduct', product);
    productForm.reset();
});

const deleteForm = document.getElementById('delete-product-form');
deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('delete-id').value;
    socket.emit('deleteProduct', id);
    deleteForm.reset();
});

function createCell(text) {
const cell = document.createElement('td');
cell.textContent = text;
return cell;
}

socket.on('updateProducts', (products) => {
const productList = document.getElementById('product-list');
productList.innerHTML = '';
products.forEach(product => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', product.id);

    row.appendChild(createCell(product.id));
    row.appendChild(createCell(product.title));
    row.appendChild(createCell(product.description));
    row.appendChild(createCell(product.code));
    row.appendChild(createCell(product.price));
    row.appendChild(createCell(product.stock));
    row.appendChild(createCell(product.category));
    row.appendChild(createCell(product.thumbnails));

    productList.appendChild(row);
});
});