## User Story : Récupérer tous les stocks
Titre : Récupérer la liste des stocks.

Description :
En tant qu'utilisateur,
Je veux voir une liste de tous les stocks disponibles,
Afin de surveiller les niveaux d'inventaire de tous les produits.

Critères d'acceptation :
- Le système renvoie une liste de stocks depuis la base de données.
- Chaque stock affiche les détails : id, product_id, warehouse_location, quantity, last_updated.
- Si aucun stock n'existe, le système renvoie une liste vide.

## User Story : Récupérer un stock par ID
Titre : Voir les détails d'un stock spécifique.

Description :
En tant qu'utilisateur,
Je veux consulter les détails d'un stock en fournissant son ID,
Afin de vérifier ses informations précises.

Critères d'acceptation :
- Le système renvoie les détails du stock associé à l'ID fourni.
- Si l'ID du stock n'existe pas, le système renvoie une erreur 404 avec un message clair.
- Les champs retournés incluent : id, product_id, warehouse_location, quantity, last_updated.

## User Story : Créer un stock
Titre : Ajouter un nouveau stock.

Description :
En tant qu'administrateur,
Je veux ajouter un stock avec un product_id, une localisation d'entrepôt et une quantité,
Afin d'enregistrer de nouveaux niveaux de stock dans le système.

Critères d'acceptation :
- Une requête valide contient les champs : product_id, warehouse_location, quantity.
- Le système ajoute le stock dans la base de données et renvoie les détails du stock créé.
- Si des champs requis sont manquants ou invalides, le système renvoie une erreur 400.

## User Story : Mettre à jour un stock
Titre : Modifier un stock existant.

Description :
En tant qu'administrateur,
Je veux modifier les informations d'un stock existant,
Afin de corriger ou mettre à jour ses niveaux.

Critères d'acceptation :
- Le système permet la mise à jour des champs : product_id, warehouse_location, quantity.
- Si l'ID du stock n'existe pas, le système renvoie une erreur 404.
- Si les données sont invalides, le système renvoie une erreur 400.
- Le champ last_updated est automatiquement mis à jour avec la date actuelle.

## User Story : Supprimer un stock
Titre : Retirer un stock du système.

Description :
En tant qu'administrateur,
Je veux supprimer un stock en utilisant son ID,
Afin de retirer les enregistrements obsolètes.

Critères d'acceptation :
- Le stock correspondant à l'ID est supprimé de la base de données.
- Si l'ID n'existe pas, le système renvoie une erreur 404.
- Le système confirme la suppression avec un message.