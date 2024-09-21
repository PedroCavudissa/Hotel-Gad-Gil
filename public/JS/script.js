// Gerenciar Posts
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let title = document.getElementById('postTitle').value;
    let content = document.getElementById('postContent').value;
    if (title && content) {
        let postList = document.getElementById('postList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        postList.appendChild(li);
    }
});

// Gerenciar Produtos
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('productName').value;
    let price = document.getElementById('productPrice').value;
    if (name && price) {
        let productList = document.getElementById('productList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${name}</h3><p>capacidade: R$${price}</p>`;
        productList.appendChild(li);
    }
});

// Gerenciar Ginásios
document.getElementById('ginasioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nome = document.getElementById('ginasionome').value;
    let capacidade = document.getElementById('ginasiocapacidade').value;
    if (nome && capacidade) {
        let productList = document.getElementById('ginasioList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${nome}</h3><p>capacidade: R$${capacidade}</p>`;
        productList.appendChild(li);
    }
});

// Gerenciar Lazer
document.getElementById('lazerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nome = document.getElementById('lazernome').value;
    let capacidade = document.getElementById('lazercapacidade').value;
    if (nome && capacidade) {
        let productList = document.getElementById('lazerList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${nome}</h3><p>capacidade: R$${capacidade}</p>`;
        productList.appendChild(li);
    }
});

// Gerenciar Quatos
document.getElementById('QuartosForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nome = document.getElementById('Quartosnome').value;
    let capacidade = document.getElementById('Quartoscapacidade').value;
    if (nome && capacidade) {
        let productList = document.getElementById('QuartosList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${nome}</h3><p>capacidade: R$${capacidade}</p>`;
        productList.appendChild(li);
    }
});


// Gerenciar restaurante
document.getElementById('restauranteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nome = document.getElementById('restaurantenome').value;
    let capacidade = document.getElementById('restaurantecapacidade').value;
    if (nome && capacidade) {
        let productList = document.getElementById('restauranteList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${nome}</h3><p>capacidade: R$${capacidade}</p>`;
        productList.appendChild(li);
    }
});

// Gerenciar Sala de Conferencias
document.getElementById('ConferenciasForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nome = document.getElementById('Conferenciasnome').value;
    let capacidade = document.getElementById('Conferenciascapacidade').value;
    if (nome && capacidade) {
        let productList = document.getElementById('ConferenciasList');
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<h3>${nome}</h3><p>capacidade: R$${capacidade}</p>`;
        productList.appendChild(li);
    }
});
