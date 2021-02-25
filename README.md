# TEST TECHNIQUE
***
Ajouter des produits dans un panier et afficher un reçu 

## Installation 
***
```
$ git clone https://github.com/ZoldyckSH/storelift.git
$ cd ../path/to/the/file
$ npm install
$ npm start ou npm run dev 
```

## Utilisation
***
Pour ajouter un produit au panier, il faut instancier la classe Cart 
et appeler la methode addProduct et lui passer 4 arguments en paramètre.

panier.addProduct(ProductName, ProductDescription, ProductPrice, ProductQty);

panier.addProduct("Nom de l'objet", "Description de l'objet", Prix de l'objet en centime, Quantité);

Pour afficher le reçu :

console.log(panier.getReceipt());
