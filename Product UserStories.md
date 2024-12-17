## User Story : Récupérer tous les produits
Titre : Récupérer la liste des produits.

Description :
En tant qu'utilisateur,
Je veux voir une liste de tous les produits disponibles,
Afin de consulter facilement les informations sur chaque produit.

Critères d'acceptation :

Le système renvoie une liste de produits depuis la base de données.
Chaque produit affiche les détails essentiels : id, name, price, et quantity.
Si aucun produit n’existe, le système renvoie une liste vide.


## User Story : Récupérer un produit par ID
Titre : Voir les détails d’un produit spécifique.

Description :
En tant qu'utilisateur,
Je veux consulter les détails d’un produit en fournissant son ID,
Afin de vérifier ses informations précises.

Critères d'acceptation :

Le système renvoie les détails du produit associé à l’ID fourni.
Si l’ID du produit n’existe pas, le système renvoie une erreur 404 avec un message clair.
Les champs retournés incluent : id, name, price, quantity.


## User Story : Créer un produit
Titre : Ajouter un nouveau produit.

Description :
En tant qu'administrateur,
Je veux ajouter un produit avec un nom, un prix, et une quantité,
Afin d’enregistrer de nouveaux articles dans le système.

Critères d'acceptation :

Une requête valide contient les champs : name, price, quantity.
Le système ajoute le produit dans la base de données et renvoie les détails du produit créé.
Si des champs requis sont manquants ou invalides, le système renvoie une erreur 400.


## User Story : Mettre à jour un produit
Titre : Modifier un produit existant.

Description :
En tant qu'administrateur,
Je veux modifier les informations d’un produit existant,
Afin de corriger ou mettre à jour ses détails.

Critères d'acceptation :

Le système permet la mise à jour partielle ou complète des champs : name, price, quantity.
Si l’ID du produit n’existe pas, le système renvoie une erreur 404.
Si les données sont invalides, le système renvoie une erreur 400.


## User Story : Supprimer un produit
Titre : Retirer un produit du système.

Description :
En tant qu'administrateur,
Je veux supprimer un produit en utilisant son ID,
Afin de retirer les articles qui ne sont plus disponibles.

Critères d'acceptation :

Le produit correspondant à l’ID est supprimé de la base de données.
Si l’ID n’existe pas, le système renvoie une erreur 404.
Le système confirme la suppression avec un message.
