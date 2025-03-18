# Users Stories pour les Commandes
## 1. Récupérer toutes les commandes (GET /orders)

### En tant qu'utilisateur,
Je veux voir une liste de toutes les commandes,
Afin de pouvoir consulter facilement les détails des commandes enregistrées.

Critères d'acceptation :

- Le système récupère une liste de toutes les commandes depuis la base de données.
- La réponse inclut les détails essentiels des commandes (par exemple, ID, produit, quantité, prix).
- Si aucune commande n'existe, le système renvoie une liste vide.

## 2. Récupérer une commande par ID (GET /orders/:id)

### En tant qu'utilisateur,
Je veux consulter des informations détaillées sur une commande spécifique,
Afin de pouvoir vérifier les détails précis de cette commande.

Critères d'acceptation :

- Le système récupère les détails d'une commande sur la base de l'ID fourni.
- La réponse inclut tous les détails pertinents de la commande (par exemple, produit, quantité, prix).
- Si l'ID de la commande n'existe pas, le système renvoie une erreur 404 avec un message explicatif.

## 3. Créer une commande (POST /orders)

### En tant qu'utilisateur,
Je veux créer une nouvelle commande,
Afin d'ajouter une commande au système avec les informations nécessaires.

Critères d'acceptation :

- Une requête valide contient les informations de la commande (par exemple, produit, quantité, prix).
- Le système crée une nouvelle commande et la stocke dans la base de données.
- Si des champs requis sont manquants (par exemple, produit ou quantité), le système renvoie une erreur 400 avec un message de validation.
- Après la création, le système répond avec les détails de la commande créée.

## 4. Mettre à jour une commande (PUT /orders/:id)

### En tant qu'utilisateur,
Je veux mettre à jour les informations d'une commande existante,
Afin de modifier ses détails si nécessaire.

Critères d'acceptation :

- Le système met à jour la commande sur la base de l'ID fourni et des données de la requête (par exemple, produit, quantité, prix).
- Si l'ID de la commande n'existe pas, le système renvoie une erreur 404 avec un message explicatif.
- Si des champs requis sont manquants ou invalides, le système renvoie une erreur 400 avec un message de validation.
- Les détails mis à jour de la commande sont sauvegardés dans la base de données et reflétés dans la réponse.

## 5. Supprimer une commande (DELETE /orders/:id)

### En tant qu'utilisateur,
Je veux supprimer une commande du système,
Afin de retirer les commandes qui ne sont plus nécessaires.

Critères d'acceptation :

- Le système supprime la commande associée à l'ID fourni.
- Si l'ID de la commande n'existe pas, le système renvoie une erreur 404 avec un message explicatif.
- Si la suppression est réussie, le système répond avec un statut 204 (No Content).
- La commande supprimée n'est plus récupérable depuis la base de données.