# Decouverte de L'API Intersection Observer

Cet API Intersection Observer va vous permettre de detecter lorsque un element rentre en intersection avec un element parent comme par exemple la vue, un exemple simple d'utilisation c'est sur un site `One Page` c'est que lorsque l'on scroll on a envie que les elements qui apparaissent dans la vue se mettent à apparaitre avec une animation ou avec un effet de transition.
Cet objet nous permet d'optimiser les performance pour eviter de faire des traitement au scroll ou au resize.

## Utilisation

 Donc le principe de l'Intersection Observer est que il va falloir l'initialiser et il prend different parametres, avec ça vous avez deux Objets:

- Le `Intersection Observer` et
- Le `IntersectionObserverEntry` qui represente l'element qui va recevoir une Observation

Sur cet `IntersectionObserver` lorsque l'on veut l'initialiser il prend deux parametres

1. Un callback donc La fonction qui sera executer lorsque l'element que l'on observe sera visible ou se masquera de la zone et cette fonction prend en parametre les `entries` càd les elements sur lesquels on va ecouter les intersection et
2. Un second parametre qui est une option sous forme d'objets et ces options on en a 3:

- **`root`**: Qui permet de preciser par rapport à quel element on va verifier les intersections et par defaut ça va etre la fenetre du navigateur mais on peux choisir une `div` ou un tout autre element HTML
- **`rootMargin`**: Qui permet d'elargir la zone visible de l'element, il permet de dire `"Pour que cet element soit afficher il faut qu'il ait depasser cette marge pour etre visible"`
- **`threshold`**: Qui permet de dire `"Quel pourcentage de l'element doivent etre en intersection pour que cet evenement soit declencher"` et on va en preciser plusieurs, 0.5 si c'est plus de la moitier de l'element qui est visible alors delenche l'evenement, 1 si tout l'element est visible,0.25 si c'est seulement 25% de l'element qui est visible,...
Le threshold est un tableau, donc vous pouvez preciser plusieurs parametres donc si on a deux threshold ça veut dire qu'il va declencher le systeme d'observer à deux moments, une fois lorsque l'element va apparaitre dans `root` pour notre cas c'est la fenetre et une autre fois lorsque l'element va disparaitre de `root`, par exemple: threshold: `[0.5,0]` càd lorsque la motier de l'element observer sera visible càd 50% de l'element et 0 pour dire lorsque la totalité de l'element observer aura disparus de `root`

```{JS}
 let observer = new IntersectionObserver(function (entries) {
     console.log(entries);
 }, {
     threshold: [0.5,0]
 })
```

Une fois que l'on a notre objet `Observer` qui est déjà initialiser il va falloir indiquer `qu'est-ce que l'on souhaite Observer` et donc il va falloir recuperer un element et l'Observer

Sacher que dès que l'on observe un element à chaque fois que cet element va se mettre en intersection avec `root` on aura une nouvelle instance de l'`IntersectionObserverEntry` et cet object aussi a des parametres particulier qui sont:

- **boundingClientRect**: Qui est un object qui nous donne des informations sur l'element observer lors de l'intersection comme sa position par rapport au haut (`top`), au bas(`bottom`), à gauche `left`, à droite `right`, sa largeur `width`, sa hauteur `heigh`
- **intersectionRatio**: C'est le pourcentage de l'element qui est visible à l'ecran, c'est aussi quelque chose que l'on peut utiliser pour detecter si un element est visible ou non, si un element se masque cet element repasse à zero càd que cet element n'est plus visible
- **target**: Qui permet d'avoir l'element courant sur lequel est appliquer le truc càd l'element qui est observer

Cet Object nous simplifie vraiment la vie, on peut utiliser l'intersectionObserver de plusieurs manieres comme par exemple:

- L'Utiliser pour un `lazy loading` par exemple on scroll une page et lorsque l'image devient visible à l'écran c'est à ce moment là que on va la faire apparaitre par exemple avec un data-src ou autre
- Avec un `infinite Scroll`, donc par exemple vous pouvez mettre une div qui vous servira d'espions et lorsque cette div devient visible vous declencher le chargement des elements suivants en AJAX

## Section

L'idée ça va etre de faire en sorte que les sections appairaissent au fil et à mesure du defilement de notre page, par exemple quand on a 30% d'une section qui apparait

## Lazy loading

L'idée ça va etre de faire en sorte que les images appairaissent au fil et à mesure du defilement de notre page, par exemple dès que une partie de l'image ou de son contenaire est visible on affiche l'image, ici il est preferable d'utiliser l'attribut `isIntersecting` de l'Object `IntersectionObserverEntry`

## Système de scrollSpy

Le principe est un systeme qui permet de détecter sur quelle section on se trouve sur le site et qui en fonction va selectionner l'element dans le menu qui correspond et on aura aussi la possibilité en cliquant dans le menu de scroller vers la section qui nous interesse et pour faire cela de maniere plus simple on va utiliser l'API `IntersectionObserver` et pour espicifier nos element que je souhaite espionner on va leurs rajouter un attribut `data-spy`, cela peut nous permettre d'avoir un selecteur simple dans le cas où on a beaucoup d'element
