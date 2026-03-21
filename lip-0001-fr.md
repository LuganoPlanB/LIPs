
```
LIP: 1
Title: Objet et Lignes Directrices des LIP
Authors: Denis Roio [jaromil@dyne.org](mailto:jaromil@dyne.org)
Status: Open
Type: Process
Assigned: 2026-03-04
```

# Qu'est-ce qu'un LIP ?

LIP signifie Lugano Improvement Proposal. Un LIP est un document de
conception structuré adressé à la ville de Lugano et à son écosystème de
parties prenantes. Il propose une amélioration des processus civiques,
des services publics ou de l'infrastructure numérique de la ville.

Un LIP doit fournir une spécification concise du changement proposé, sa
justification et l'impact attendu. L'objectif est de rendre les
propositions compréhensibles, révisables et applicables par des acteurs
techniques comme non techniques.

Les LIP sont destinés à constituer le mécanisme principal pour :

* proposer des améliorations et de nouvelles initiatives à finalité civique
* recueillir des contributions structurées du public et des parties prenantes sur une question
* documenter le raisonnement et les décisions à l'origine des changements adoptés
* conserver un registre public des propositions, des résultats et des itérations

L'auteur du LIP est responsable de décrire clairement la proposition,
d'impliquer les parties prenantes pertinentes et de documenter les
objections importantes ou les points de vue alternatifs.

Comme les LIP sont conservés sous forme de fichiers texte dans un dépôt
versionné, leur historique de révision fait partie du registre public de
l'évolution de la proposition.

## Types de LIP

Il existe trois types de LIP :

* Un LIP Standards Track décrit un changement qui affecte l'interopérabilité, une infrastructure urbaine partagée ou la coordination interservices. Les exemples incluent des formats de données communs, des principes d'identité et d'accès, des exigences d'interopérabilité dans les marchés publics, des lignes directrices pour les API publiques, des conventions d'intégration de services ou des normes opérationnelles partagées.

* Un LIP Informational décrit un problème, un espace de conception ou une recherche de contexte, ou fournit des lignes directrices générales et des bonnes pratiques pertinentes pour l'infrastructure numérique civique. Les LIP Informational ne représentent pas nécessairement un consensus ni une recommandation et peuvent servir de documentation de référence.

* Un LIP Process décrit ou propose des changements dans la manière dont les décisions sont prises, les propositions sont évaluées, les consultations publiques sont menées ou la mise en oeuvre et la responsabilité sont suivies. Les LIP Process régissent le fonctionnement du système LIP lui-même et des processus de gouvernance civique associés.

## Flux de Travail des LIP

Le processus LIP commence par une nouvelle idée ou par un problème
identifié touchant l'infrastructure numérique de la ville ou les
processus civiques.

Chaque LIP potentiel devrait avoir un champion, c'est-à-dire une
personne qui rédige le LIP selon le style et le format décrits
ci-dessous, anime la discussion dans les espaces appropriés et cherche à
construire un consensus entre les parties prenantes. Ces parties
prenantes peuvent inclure des services municipaux, des opérateurs de
services, des entreprises locales, des groupes de la société civile, des
communautés techniques et des habitants.

Il est encouragé d'examiner publiquement une idée avant de rédiger un
LIP complet. Cela permet de gagner du temps, de réduire les doublons et
d'identifier tôt les contraintes. Une proposition peut être utile
localement tout en étant inadaptée comme norme à l'échelle de la ville,
ou nécessiter un alignement juridique, opérationnel ou budgétaire qui
devrait apparaître dès le départ.

Une fois que le champion estime l'idée suffisamment mûre, il soumet un
projet de LIP au canal de discussion désigné et au dépôt. Le projet doit
être rédigé dans le style LIP, faute de quoi il peut être renvoyé pour
révision.

Les auteurs sont responsables de recueillir des retours à la fois sur
l'idée initiale et sur le projet de LIP avant de le soumettre à une
révision éditoriale. Les discussions longues et ouvertes sans cadre
devraient être évitées lorsque cela est possible. Pour garder la
révision efficace, on peut recourir à des consultations limitées dans le
temps, à des issue trackers avec des questions claires, à des ateliers
avec procès-verbaux et à des demandes de commentaires structurées.

Il est recommandé qu'un seul LIP contienne une seule proposition
centrale. Si le périmètre devient trop large, le travail devrait être
scindé en plusieurs LIP.

Les éditeurs LIP attribuent les numéros de LIP et gèrent les changements
de statut. Les auteurs ne doivent pas s'attribuer eux-mêmes un numéro de
LIP et devraient utiliser un alias pendant la rédaction, par exemple :

```
lip-jaromil-digital-identity
lip-jaromil-lost&found-revocation
```

Si un LIP est accepté pour examen, les éditeurs lui attribuent un
numéro, définissent son Type, lui donnent le statut "Draft" et
l'ajoutent au dépôt.

Les raisons de refuser le statut de LIP incluent la duplication
d'effort, le manque de clarté, le non-respect des règles de formatage,
un périmètre trop large, des propositions techniquement ou
opérationnellement faibles, l'absence de justification, l'absence de
prise en compte des parties prenantes ou des propositions qui ne servent
pas une finalité civique.

L'auteur peut mettre à jour le Draft dans le dépôt. Les mises à jour
peuvent être soumises sous forme de changesets ou de pull requests,
selon le flux d'hébergement.

Les LIP Standards Track comportent généralement deux parties : le
document de conception et un plan de mise en oeuvre. Ils devraient être
examinés et approuvés en principe avant qu'une mise en oeuvre importante
ne commence, sauf si un pilote est nécessaire pour évaluer la
faisabilité.

Un LIP Standards Track devrait inclure une approche de mise en oeuvre
avant de pouvoir être considéré comme Final. Le terme "mise en oeuvre"
ne désigne pas nécessairement du code logiciel. Il peut inclure un plan
d'approvisionnement, des runbooks opérationnels, des changements de
gouvernance, des phases de déploiement et des critères d'acceptation
mesurables.

Une fois qu'un LIP a été adopté et que sa mise en oeuvre est achevée, ou
a atteint un état stable convenu, son statut est changé en "Final".

Un LIP peut également recevoir le statut "Deferred" lorsqu'aucun progrès
n'est réalisé ou lorsque des prérequis manquent. Il peut être réactivé
ultérieurement.

Un LIP peut être "Rejected". Il reste important d'en conserver une
trace, y compris les raisons.

Un LIP peut aussi être remplacé par un autre LIP, rendant l'original
obsolète. Cela est courant lorsqu'une proposition est remplacée par une
approche révisée.

Certains LIP Informational et Process peuvent avoir le statut "Active"
s'ils ne sont pas destinés à être achevés, mais à rester comme guide
vivant ou procédure permanente.

## Que doit contenir un LIP réussi ?

Chaque LIP devrait comporter les parties suivantes :

* Preamble
  Des en-têtes de style RFC 822 contenant les métadonnées du LIP, notamment le numéro du LIP, un titre court, les auteurs, le statut, le type et les dates.

* Abstract
  Une brève description du problème traité et de l'amélioration proposée.

* Motivation
  Pourquoi le changement est nécessaire d'un point de vue civique. Quel problème existe aujourd'hui, pour qui, et quels éléments soutiennent ce constat. Cette section est critique et peut inclure l'impact utilisateur, les frictions opérationnelles, les coûts, les risques et l'alignement stratégique.

* Specification
  Une description claire de ce qui changera. Pour les LIP Standards Track, cela devrait inclure les interfaces, formats de données, règles de gouvernance ou exigences opérationnelles nécessaires à l'interopérabilité ou à la coordination. Le niveau de détail doit être suffisant pour que différents metteurs en oeuvre puissent produire des résultats compatibles lorsque la compatibilité est importante.

* Rationale
  Pourquoi cette conception a été choisie. Quelles alternatives ont été considérées. Quels compromis sont faits. Se référer, lorsque pertinent, à des antécédents, y compris des approches utilisées dans d'autres villes ou administrations publiques.

* Stakeholder and Impact Analysis
  Qui est concerné, de quelle manière, et quels sont les bénéfices et risques attendus. Inclure l'accessibilité, l'inclusion, la vie privée, la sécurité, la durabilité, la charge de maintenance, le risque d'enfermement fournisseur et les implications budgétaires, selon le cas.

* Consultation and Dissent
  Des éléments montrant la consultation et les principales objections soulevées, y compris la manière dont elles ont été traitées ou pourquoi elles n'ont pas été retenues.

* Compatibility and Transition
  Si la proposition modifie des services existants, des contrats, des flux de données ou des procédures orientées utilisateur, décrire le chemin de transition, le calendrier et les mesures d'atténuation des perturbations. L'objectif est d'assurer la continuité du service et une responsabilité claire.

* Implementation Plan
  Les étapes, responsabilités, prérequis, dépendances et critères d'acceptation. Cela peut inclure des pilotes, l'approvisionnement, des validations de gouvernance, la préparation opérationnelle, la documentation et le suivi.

* Governance and Accountability
  Comment les décisions sont prises pendant le déploiement, qui porte le résultat, comment l'avancement est rapporté et ce qui déclenche une révision ou un rollback.

* Licensing and Reuse
  Indiquer si le texte relève du domaine public ou d'une licence documentaire permissive adaptée à la réutilisation par d'autres municipalités.

### Formats et Modèles de LIP

Les LIP devraient être rédigés en texte brut au format mediawiki ou
markdown, avec une préférence pour les formats faciles à réviser dans le
contrôle de version.

### Préambule d'En-tête LIP

Chaque LIP doit commencer par un préambule d'en-têtes de style RFC 822.
Les en-têtes doivent apparaître dans l'ordre suivant. Les en-têtes
marqués d'un "*" sont facultatifs. Tous les autres sont obligatoires.

```
  LIP: <numéro de LIP>
  Title: <titre du LIP>
  Author: <liste des noms réels des auteurs et éventuellement adresses email>
* Discussions-To: <url ou adresse email>
  Status: <Draft | Active | Accepted | Deferred | Rejected |
           Withdrawn | Final | Superseded>
  Type: <Standards Track | Informational | Process>
  Created: <date de création, au format ISO 8601 (yyyy-mm-dd)>
* Post-History: <dates des publications ou consultations>
* Replaces: <numéro de LIP>
* Superseded-By: <numéro de LIP>
* Resolution: <url du relevé de décision, de la résolution ou du résultat publié>
```

L'en-tête Author énumère les noms et, éventuellement, les adresses email
de tous les auteurs ou détenteurs du LIP. S'il y a plusieurs auteurs,
chacun devrait figurer sur une ligne séparée.

L'en-tête Discussions-To devrait indiquer où le LIP est discuté : une
page de consultation publique, un issue tracker, une mailing list ou un
canal officiel de la ville. Il peut être omis si la discussion est gérée
de manière privée dans la phase initiale de rédaction, mais une
discussion publique est attendue avant l'acceptation lorsque cela est
possible.

L'en-tête Created enregistre la date à laquelle un numéro a été attribué
au LIP. Post-History enregistre les dates des principales étapes de
publication, des consultations, des ateliers ou des jalons de revue
publique.

L'en-tête Resolution est recommandé pour les LIP Standards Track et
Process. Il devrait pointer vers un document officiel d'adoption, de
décision ou de résultat.

### Fichiers Auxiliaires

Les LIP peuvent inclure des fichiers auxiliaires tels que des
diagrammes. Les fichiers auxiliaires devraient être inclus dans un
sous-répertoire pour ce LIP, ou doivent être nommés LIP-XXXX-Y.ext, où
"XXXX" est le numéro du LIP, "Y" est un numéro de série, à partir de 1,
et "ext" est remplacé par l'extension réelle du fichier, par exemple
"png".


## Éditeurs LIP

Les éditeurs LIP sont les mainteneurs responsables de la supervision
administrative et éditoriale du dépôt et du processus LIP. Ils peuvent
être contactés via le point de contact désigné du dépôt.

### Transfert de la Responsabilité d'un LIP

Il peut devenir nécessaire de transférer la responsabilité d'un LIP à un
nouveau champion. Une bonne raison est que l'auteur original n'a plus le
temps ou l'intérêt nécessaires pour maintenir la proposition pendant la
révision et la mise en oeuvre. Une mauvaise raison est un désaccord avec
l'orientation de la proposition, auquel cas des propositions
concurrentes devraient être documentées comme des LIP distincts.

Une demande de reprise de responsabilité devrait être adressée à
l'auteur original et aux éditeurs LIP. Si l'auteur original est
injoignable, les éditeurs peuvent décider de réattribuer cette
stewardship pour faire avancer le processus, tout en préservant
l'historique d'attribution.

### Responsabilités et Flux de Travail des Éditeurs LIP

Pour chaque nouvelle soumission de LIP, les éditeurs :

* examinent le LIP pour vérifier sa préparation, sa clarté, son exhaustivité, sa pertinence civique et son adéquation au périmètre
* vérifient que le titre décrit correctement le contenu
* suggèrent des améliorations éditoriales de la langue et de la structure
* s'assurent que la proposition comprend une justification suffisante, des considérations sur l'impact pour les parties prenantes et un plan de transition lorsque pertinent

Si le LIP n'est pas prêt, les éditeurs le renvoient à l'auteur avec des
demandes de révision précises.

Une fois prêt, le LIP est soumis au dépôt via le flux de contribution
standard, par exemple une pull request, où il peut recevoir d'autres
retours publics.

Les éditeurs :

* attribuent un numéro de LIP
* fusionnent la soumission lorsqu'elle remplit les critères minimaux
* veillent à ce qu'elle figure dans l'index du dépôt
* indiquent à l'auteur l'étape suivante du processus de revue et de consultation

# Historique

Ce document est dérivé du processus des Bitcoin Improvement Proposals
[(BIPs)](https://github.com/bitcoin/bips), en particulier du BIP-0001
d'Amir Taaki, et adapté pour soutenir des propositions civiques
concernant l'infrastructure numérique de Lugano et les processus publics
associés.
