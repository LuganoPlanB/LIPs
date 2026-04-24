```
LIP: 2
Title: Registre d'Alerte des Evenements de Perte de Credentials (CLEAR)
Author: Jaromil, Bregy
Discussions-To: https://github.com/LuganoPlanB/lugano-lips/issues
Status: Accepted
Type: Standards Track
Created: 2026-04-24
```

# Resume

Cette proposition definit un micro-service civique qui permet a un
endpoint d'authentification de verifier, de maniere privacy-preserving,
si une personne specifique a recemment declare la perte ou le vol d'un
appareil personnel utilise comme facteur d'authentification, tel qu'un
telephone mobile. Le service ingere des declarations de perte a duree
limitee deposees aupres de la police, les convertit en signaux de
compromission de courte duree et ne repond aux requetes qu'au moyen de
flux de preuves zero-knowledge qui evitent de divulguer la declaration
de police sous-jacente, le dossier d'identite complet ou les donnees
plus larges de l'utilisateur detenues par le service demandeur.

# Motivation

Les systemes d'authentification reposent de plus en plus sur des
facteurs de possession implementes au moyen d'appareils personnels, tels
que des telephones mobiles, des dispositifs wallet et des credentials
lies a une SIM. Ces facteurs peuvent etre perdus, voles ou
temporairement places sous le controle d'une autre personne.

Aujourd'hui, les declarations de police concernant des telephones perdus
ou voles sont largement isolees des systemes d'authentification qui
pourraient les utiliser pour reduire la fraude. Cela laisse une lacune
claire:

* un citoyen peut declarer rapidement a la police la perte d'un appareil,
  tandis que les services en ligne continuent a faire confiance a cet
  appareil comme s'il etait encore en sa possession
* les operateurs de services apprennent souvent la compromission d'un
  appareil seulement apres une prise de controle de compte
* un modele de partage direct de donnees entre la police et les
  fournisseurs de services creerait des risques disproportionnes en
  matiere de vie privee et de gouvernance

Lugano peut combler cette lacune en creant un service de confiance
d'interet public qui accomplit une seule tache etroite: fournir un
signal de risque temporaire indiquant qu'une personne a recemment
declare la perte d'un appareil d'authentification. Le service doit
renforcer la securite sans devenir une base de donnees de surveillance.

# Specification

## Portee du service

Le service propose, appele Credential Loss Event Alert Registry (CLEAR),
fournit une reponse de risque oui-ou-non a une question etroitement
definie:

"La personne P a-t-elle declare, dans la fenetre de conservation, la
perte ou le vol de l'appareil D, lorsque D est eligible comme facteur
d'authentification?"

Le service CLEAR n'est pas un registre general des appareils, pas un
portail de donnees pour les forces de l'ordre, et pas un remplacement
des systemes de revocation exploites par les operateurs mobiles, les
identity wallets ou les relying parties.

## Enregistrements eligibles

Le service CLEAR ne peut ingerer que des declarations qui satisfont a
toutes les conditions suivantes:

* la perte ou le vol a ete denonce a une autorite de police competente
* la declaration identifie une personne physique ou un autre sujet
  juridiquement reconnu
* la declaration identifie un appareil personnel pouvant intervenir dans
  une procedure d'authentification
* l'horodatage de la declaration est connu
* la declaration contient assez de donnees structurees pour deriver une
  claim stable de l'appareil aux fins de rapprochement, sans stocker de
  details narratifs inutiles

Des exemples de claims eligibles de l'appareil incluent un numero de
telephone, un identifiant SIM, un identifiant de wallet lie a
l'appareil, ou un autre lien d'authentification approuve par la
gouvernance.

## Minimisation des donnees

Le service CLEAR ne doit pas stocker de declarations de police
completes. Il ne conserve que les champs minimaux necessaires pour
prendre en charge la requete:

* une reference au sujet derivee de l'identite legale de la personne
* une reference a l'appareil derivee de l'appareil d'authentification
  compromis
* le type d'evenement: perdu, vole ou recupere
* l'heure de declaration
* l'heure d'expiration
* l'identifiant de l'autorite declarente
* une reference d'audit vers l'enregistrement d'origine

Les descriptions narratives, details de localisation, declarations de
temoins et autres donnees de police etrangeres au besoin doivent rester
hors du service.

Lorsque c'est possible, les references stockees au sujet et a l'appareil
devraient etre representees comme des commitments derives des
identifiants sources, plutot que comme des identifiants directement
lisibles.

## Conservation et transitions d'etat

Chaque enregistrement de perte ou de vol doit expirer automatiquement
apres une periode de conservation limitee definie par la policy. La
periode de conservation par defaut devrait etre de 30 jours, sauf si une
autre periode est approuvee par la gouvernance et etayee par des
elements probants.

Le service doit prendre en charge au moins ces transitions d'etat:

* `reported`: une perte ou un vol a ete declare et se trouve dans la
  periode de conservation
* `recovered`: l'appareil a ete recupere ou le controle a ete retabli
* `expired`: la fenetre de conservation a pris fin

Les requetes doivent traiter les enregistrements `recovered` et
`expired` comme non compromis, sauf si une autre declaration active pour
le meme sujet et le meme appareil reste en vigueur.

## Modele de requete privacy-preserving

Le service CLEAR doit exposer un protocole de requete fonde sur des
preuves zero-knowledge sur un ensemble authentifie d'enregistrements
actifs, par exemple une representation Merkle-tree des commitments
sujet-appareil actifs, avec les proprietes suivantes:

* le demandeur prouve son autorisation a interroger une paire
  sujet-appareil pour un evenement d'authentification legitime
* le service n'apprend que le minimum necessaire pour repondre a la
  requete
* le demandeur n'apprend que l'existence ou non d'un signal de
  compromission actif, avec des metadonnees de policy optionnelles comme
  une tranche d'age du signal
* le demandeur ne peut pas enumerer toute la base de donnees
* les observateurs ne peuvent pas relier des requetes separees pour
  reconstruire l'activite plus large d'un citoyen

Une conception conforme est la suivante:

* les autorites de police envoient au service des attestations
  structurees d'evenement
* le service convertit l'identifiant du sujet et l'identifiant de
  l'appareil en commitments
* les commitments actifs sont inseres dans un Merkle tree ou un ensemble
  authentifie similaire, mis a jour lorsque des declarations sont
  ajoutees, recuperees ou expirees
* un endpoint d'authentification soumet une requete privacy-preserving et
  recoit une preuve zero-knowledge indiquant que la paire interrogee est
  ou n'est pas presente dans l'ensemble actif represente par la root
  courante

Des conceptions alternatives peuvent etre utilisees si elles preservent
les memes garanties de vie privee, d'auditabilite et d'anti-enumeration.

## Notarisation de la root

Chaque mise a jour de l'ensemble actif devrait produire une nouvelle
Merkle root et un checkpoint signe associe. L'operateur CLEAR devrait
notariser periodiquement ces checkpoints sur un registre distribue, tel
que SwissLedger, ou sur un autre registre d'interet public approuve par
la gouvernance.

Le checkpoint notarise devrait contenir uniquement du materiel
d'integrite non personnel:

* la root de l'ensemble actif
* l'horodatage du checkpoint
* un numero de sequence ou identifiant d'epoque
* la signature de l'operateur ou l'identifiant de cle
* des metadonnees de policy optionnelles, telles que la fenetre de
  conservation en vigueur

Aucune declaration de police, identifiant de sujet, identifiant
d'appareil, preimage de commitment, enregistrement de requete ou
activite de relying party ne devrait etre ecrit sur le registre.

L'objectif de la notarisation est de rendre l'historique des changements
de l'ensemble actif verifiable de l'exterieur sans divulguer le contenu
de l'ensemble. Les auditeurs, relying parties et autorites de
surveillance peuvent ensuite verifier qu'une preuve a ete controlee
contre une root qui existait a un moment precis, que les roots n'ont pas
ete reecrites silencieusement apres coup, et que les lacunes ou forks
inattendus dans la sequence des checkpoints sont visibles.

## Autorisation des requetes

Seuls les endpoints d'authentification approuves peuvent interroger le
service. L'autorisation doit exiger:

* une identite d'operateur enregistree
* un cas d'usage declare lie a l'authentification ou a la recuperation de
  compte
* des requetes signees
* des limites de frequence par operateur
* une journalisation adaptee a une supervision ulterieure

Le flux d'autorisation devrait lier cryptographiquement chaque requete a
une transaction d'authentification specifique afin que les preuves ne
puissent pas etre rejouees ou reutilisees comme jetons generaux de
lookup.

Le service CLEAR doit rejeter les recherches en masse, le profilage en
arriere-plan, les usages marketing et le screening generalise de
l'identite.

## Semantique de la reponse

Le format de reponse doit etre intentionnellement minimal. Une reponse
conforme contient:

* un resultat booleen: `active_signal` true ou false
* un artefact de preuve verifiable par le demandeur contre la root de
  l'ensemble actif
* une tranche optionnelle de fraicheur, telle que `0-24h`, `1-7d`,
  `8-30d`
* une heure d'expiration de la reponse

La reponse ne doit pas reveler le texte de la declaration de police, le
lieu exact du depot ou des attributs d'identite inutiles.

## Comportement requis des relying parties

Ce service CLEAR fournit un signal de risque, pas un mandat de refus
automatique. Les operateurs qui integrent le service doivent definir des
actions de policy pour un resultat positif, telles que:

* verification step-up au moyen d'un facteur separe
* suspension temporaire d'actions a haut risque
* revue manuelle pour les flux de recuperation
* notification au citoyen par un canal deja fiable

Les operateurs ne doivent pas utiliser un resultat positif comme seule
base pour la fermeture permanente d'un compte ou le refus d'un service
sans lien.

# Justification

La conception choisit un service etroit de verification de compromission
plutot qu'une large plateforme de "biens voles".

C'est preferable parce que:

* elle cible directement un schema de fraude a forte valeur touchant
  l'identite numerique et la securite des comptes
* elle minimise la collecte de donnees et la portee institutionnelle
* elle est plus facile a gouverner, auditer et piloter
* elle cree une infrastructure civique reutilisable que tout endpoint
  d'authentification peut integrer

Les preuves zero-knowledge sont justifiees ici car une simple API
centrale creerait autrement un nouveau registre sensible reliant
declarations de police, identifiants d'appareils et activite
d'authentification. Les commitments et les preuves fondees sur Merkle
permettent au service de repondre a la question etroite de verification
de compromission tout en reduisant la divulgation des enregistrements
sous-jacents.

La notarisation des Merkle roots sur un registre distribue renforce
l'integrite de cette conception sans elargir les donnees partagees par
le service. Le registre ne devient pas un registre d'evenements de
perte. Il agit comme couche independante d'horodatage et
d'ordonnancement pour des checkpoints publics. Cela soutient la
verification ulterieure de l'historique des changements, detecte les
tentatives de reecrire ou d'omettre des etats de l'ensemble actif, et
reduit la dependance envers l'operateur CLEAR comme seule source de
verite d'audit.

C'est particulierement pertinent pour un service de confiance civique.
Les decisions d'authentification peuvent etre contestees apres une prise
de controle de compte, une recuperation echouee ou une erreur
d'operateur. Un historique notarise des roots donne aux auditeurs une
base stable pour verifier si l'etat du service utilise a ce moment etait
coherent avec la sequence publiee des checkpoints, tout en preservant la
vie privee des citoyens et des relying parties.

Alternatives considerees:

* Partage direct de donnees entre police et plateformes.
  C'est techniquement plus simple, mais cela passe mal a l'echelle,
  augmente la complexite juridique et diffuse largement des donnees
  sensibles.
* Flux de revocation fournis uniquement par les operateurs mobiles.
  Utiles lorsqu'ils existent, mais incomplets. De nombreux facteurs
  d'authentification ne sont pas controles par les operateurs mobiles, et
  les services publics ont besoin d'une couche de coordination neutre.
* Auto-declaration geree uniquement par l'utilisateur.
  Utile mais plus faible. La prevention de la fraude beneficie de
  declarations attestees et d'horodatages independants.
* Journaux d'audit locaux sans notarisation sur registre.
  Necessaires mais insuffisants seuls. Ils restent sous le controle de
  l'operateur du service et constituent une preuve plus faible si
  l'integrite historique est ensuite contestee.

# Analyse des Parties Prenantes et de l'Impact

Parties prenantes affectees:

* citoyens qui declarent la perte ou le vol d'un appareil
* autorites de police ou bureaux de reception des declarations
* operateurs municipaux et prives de services d'authentification
* fournisseurs d'identity wallets numeriques
* autorites chargees de la vie privee, de la protection des donnees et
  des libertes civiles
* auditeurs et intervenants en cas d'incident

Benefices attendus:

* detection plus precoce de facteurs d'authentification compromis
* risque reduit de prise de controle de compte apres le vol d'un appareil
* meilleure coordination entre declaration publique et defense numerique
* composant reutilisable de controle du risque pour plusieurs services

Risques principaux:

* faux positifs dus a des discordances d'identifiants ou a des mises a
  jour tardives de recuperation
* derive fonctionnelle vers une surveillance ou un profilage generalise
* dependance excessive au signal par des operateurs ayant de mauvais
  mecanismes de repli
* complexite cryptographique et operationnelle

Mesures d'attenuation:

* fenetres de conservation courtes et evenements explicites de
  recuperation
* limitation stricte de la finalite et gouvernance publique
* semantique minimale de la reponse
* revue de securite independante et analyse d'impact sur la vie privee
* deploiement progressif commencant par un pilote

Impact budgetaire et de durabilite:

* cout initial modere d'implementation et de revue
* cout operationnel continu faible a modere si le service reste minimal
  et centralise
* cout ecosystemique inferieur a celui d'integrations bilaterales entre
  de nombreux bureaux de police et de nombreux fournisseurs de services

Le verrouillage fournisseur devrait etre limite en exigeant des
specifications ouvertes, des preuves portables et des donnees d'audit
exportables.

L'utilisation du registre devrait egalement eviter le verrouillage
fournisseur. Le format du checkpoint devrait etre portable afin que les
roots puissent etre verifiees independamment de toute implementation de
registre ou de tout fournisseur de service unique.

# Consultation et Dissidence

Cette ebauche devrait etre examinee avec:

* operateurs municipaux d'identite numerique
* autorites de police chargees des declarations
* la fonction municipale de protection des donnees
* organisations de la societe civile axees sur la vie privee et les
  garanties procedurales
* operateurs d'endpoints d'authentification a forte valeur, tels que
  e-government, banque et services de wallet numerique

Les objections probables incluent:

* les donnees de police ne devraient jamais influencer les decisions de
  login
* les systemes zero-knowledge sont trop complexes pour un service
  municipal
* la proposition pourrait tout de meme reveler indirectement des
  evenements de vie sensibles

Ces objections sont substantielles et devraient etre testees dans la
conception du pilote. La proposition y repond en gardant le service
etroit, temporaire, auditable et consultatif plutot que punitif.

# Compatibilite et Transition

La proposition est additive. Les systemes d'authentification existants
peuvent l'integrer comme controle de risque optionnel sans casser les
flux de login actuels.

Une trajectoire de transition recommandee est:

* pilote avec un endpoint d'authentification municipal et une relying
  party externe
* prise en charge initiale d'un ou deux types de claims d'appareil
  seulement, tels qu'un numero de telephone et un identifiant de binding
  de wallet
* evaluation des taux de faux positifs, de la latence, de l'utilisabilite
  par les operateurs et de l'adequation juridique
* extension seulement apres approbation de la gouvernance et publication
  des resultats

Un comportement de repli doit rester disponible lorsque le service est
hors ligne ou pas encore integre.

# Plan d'Implementation

1. Definir la base legale, le perimetre de gouvernance et les cas d'usage
   permis.
2. Convenir du schema structure minimal pour les attestations
   d'evenement provenant de la police.
3. Specifier la methode de derivation des commitments, le systeme de
   preuve et le format de reponse.
4. Specifier le format du checkpoint de Merkle root et la cadence de
   notarisation sur registre.
5. Construire un adaptateur pilote d'ingestion pour une autorite
   declarente.
6. Construire le service d'ensemble actif avec expiration automatique et
   gestion de la recuperation.
7. Integrer un endpoint d'authentification comme relying-party pilote.
8. Mener des evaluations de vie privee, de securite et operationnelles.
9. Publier les resultats et decider de standardiser, reviser ou rejeter.

Les criteres d'acceptation du pilote devraient inclure:

* latence de requete bornee et adaptee a l'authentification en direct
* aucune divulgation du contenu brut des declarations de police aux
  relying parties
* expiration reussie des enregistrements apres la periode de conservation
* autorisation et limitation de debit auditables
* checkpoints de Merkle roots publies et verifiables independamment
  contre le registre choisi
* preuve que le signal ameliore les controles antifraude sans faux
  positifs excessifs

# Gouvernance et Accountability

Le service devrait etre gouverne comme une infrastructure civique
partagee, avec un operateur clairement designe et une fonction de
supervision incluant une revue de vie privee.

Les responsabilites de gouvernance devraient inclure:

* approuver les types de claims d'appareil eligibles
* approuver les periodes de conservation
* approuver les operateurs autorises a interroger
* approuver la cadence des checkpoints et le registre utilise pour la
  notarisation
* examiner les journaux d'audit et les signalements d'abus
* declencher une suspension ou un rollback si une mauvaise utilisation ou
  des taux d'erreur excessifs sont detectes

Toute extension au-dela des usages lies a l'authentification doit exiger
un nouveau LIP ou un amendement explicite a celui-ci.

# Licence et Reutilisation

Ce document est mis a disposition sous la GNU Free Documentation License
afin que d'autres municipalites puissent le reutiliser a des fins non
commerciales avec attribution et aux memes conditions de partage.
