
```
LIP: 1
Title: Zweck und Richtlinien der LIPs
Authors: Denis Roio [jaromil@dyne.org](mailto:jaromil@dyne.org)
Status: Open
Type: Process
Assigned: 2026-03-04
```

# Was ist ein LIP?

LIP steht fuer Lugano Improvement Proposal. Ein LIP ist ein
strukturiertes Designdokument, das an die Stadt Lugano und ihr
Oekosystem von Anspruchsgruppen gerichtet ist. Es schlaegt eine
Verbesserung von zivilgesellschaftlichen Prozessen, oeffentlichen
Diensten oder der digitalen Infrastruktur der Stadt vor.

Ein LIP sollte eine knappe Spezifikation der vorgeschlagenen Aenderung,
ihre Begruendung und die erwarteten Auswirkungen liefern. Ziel ist es,
Vorschlaege fuer technische wie nicht technische Akteure verstaendlich,
pruefbar und umsetzbar zu machen.

LIPs sind als primaerer Mechanismus gedacht fuer:

* das Vorschlagen von Verbesserungen und neuen Initiativen mit zivilgesellschaftlichem Zweck
* das Sammeln strukturierter Rueckmeldungen von Oeffentlichkeit und Anspruchsgruppen zu einem Thema
* das Dokumentieren der Ueberlegungen und Entscheidungen hinter angenommenen Aenderungen
* das Führen eines oeffentlichen Verzeichnisses von Vorschlaegen, Ergebnissen und Iterationen

Der LIP-Autor ist dafuer verantwortlich, den Vorschlag klar zu
beschreiben, relevante Anspruchsgruppen einzubeziehen und wesentliche
Einwaende oder alternative Sichtweisen zu dokumentieren.

Da LIPs als Textdateien in einem versionierten Repository gepflegt
werden, ist ihre Revisionshistorie Teil des oeffentlichen Nachweises
darueber, wie sich ein Vorschlag entwickelt hat.

## LIP-Typen

Es gibt drei Arten von LIPs:

* Ein Standards-Track-LIP beschreibt eine Aenderung, die Interoperabilitaet, gemeinsam genutzte staedtische Infrastruktur oder die Koordination zwischen Abteilungen betrifft. Beispiele sind gemeinsame Datenformate, Prinzipien fuer Identitaet und Zugriff, Interoperabilitaetsanforderungen in der Beschaffung, Richtlinien fuer oeffentliche APIs, Konventionen zur Service-Integration oder gemeinsame Betriebsstandards.

* Ein Informational-LIP beschreibt ein Problem, einen Gestaltungsraum oder Hintergrundforschung oder liefert allgemeine Richtlinien und bewährte Praktiken, die fuer zivile digitale Infrastruktur relevant sind. Informational-LIPs repraesentieren nicht notwendigerweise einen Konsens oder eine Empfehlung und koennen als Referenzmaterial dienen.

* Ein Process-LIP beschreibt oder schlaegt Aenderungen daran vor, wie Entscheidungen getroffen, Vorschlaege bewertet, oeffentliche Konsultationen durchgefuehrt oder Umsetzung und Verantwortlichkeit nachverfolgt werden. Process-LIPs regeln, wie das LIP-System selbst und zugehoerige zivilgesellschaftliche Governance-Abläufe funktionieren.

## LIP-Ablauf

Der LIP-Prozess beginnt mit einer neuen Idee oder einem identifizierten
Problem, das die digitale Infrastruktur der Stadt oder
zivilgesellschaftliche Prozesse betrifft.

Jedes potenzielle LIP sollte einen Champion haben, also eine Person, die
das LIP im unten beschriebenen Stil und Format schreibt, die Diskussion
in den geeigneten Foren begleitet und versucht, unter den
Anspruchsgruppen Konsens aufzubauen. Anspruchsgruppen koennen
staedtische Aemter, Dienstleister, lokale Unternehmen, Gruppen der
Zivilgesellschaft, technische Communities und Einwohner umfassen.

Es wird empfohlen, eine Idee oeffentlich zu pruefen, bevor ein
vollstaendiges LIP geschrieben wird. Das spart Zeit, reduziert
Doppelarbeit und hilft, Einschraenkungen frueh zu erkennen. Ein
Vorschlag kann lokal nuetzlich sein, sich aber als staedtischer Standard
nicht eignen, oder eine rechtliche, operative oder budgetaere Abstimmung
benoetigen, die frueh sichtbar werden sollte.

Sobald der Champion der Ansicht ist, dass die Idee reif genug ist,
reicht er einen LIP-Entwurf ueber den vorgesehenen Diskussionskanal und
im Repository ein. Der Entwurf sollte im LIP-Stil geschrieben sein,
andernfalls kann er zur Ueberarbeitung zurueckgegeben werden.

Autoren sind dafuer verantwortlich, Rueckmeldungen sowohl zur ersten
Idee als auch zum Entwurf des LIP zu sammeln, bevor er zur
redaktionellen Pruefung eingereicht wird. Lange, offene Diskussionen
ohne klares Ziel sollten moeglichst vermieden werden. Strategien fuer
eine effiziente Pruefung sind zeitlich begrenzte Konsultationen,
Issue-Tracker mit klaren Fragen, Workshops mit Protokollen und
strukturierte Aufforderungen zur Stellungnahme.

Es wird empfohlen, dass ein einzelnes LIP einen einzelnen Kernvorschlag
enthaelt. Wenn der Umfang zu breit wird, sollte die Arbeit auf mehrere
LIPs aufgeteilt werden.

LIP-Editoren vergeben LIP-Nummern und verwalten Statusaenderungen.
Autoren duerfen sich keine LIP-Nummern selbst zuweisen und sollten
waehrend der Entwurfsphase stattdessen einen Alias verwenden, zum
Beispiel:

```
lip-jaromil-digital-identity
lip-jaromil-lost&found-revocation
```

Wenn ein LIP zur Pruefung angenommen wird, weisen die Editoren eine
Nummer zu, setzen den Type, geben ihm den Status "Draft" und fuegen es
dem Repository hinzu.

Gruende fuer die Ablehnung des LIP-Status sind unter anderem doppelte
Arbeit, mangelnde Klarheit, Missachtung von Formatierungsregeln, zu
grosser Umfang, technisch oder operativ schwache Vorschlaege, fehlende
Begruendung, fehlende Beruecksichtigung von Anspruchsgruppen oder
Vorschlaege ohne zivilgesellschaftlichen Zweck.

Der Autor kann den Draft im Repository aktualisieren. Aktualisierungen
koennen je nach Hosting-Workflow als Changesets oder Pull Requests
eingereicht werden.

Standards-Track-LIPs enthalten in der Regel zwei Teile: das
Designdokument und einen Umsetzungsplan. Sie sollten grundsaetzlich
geprueft und befürwortet sein, bevor eine groessere Umsetzung beginnt,
es sei denn, ein Pilot ist zur Bewertung der Machbarkeit erforderlich.

Ein Standards-Track-LIP sollte einen Umsetzungsansatz enthalten, bevor
es als Final betrachtet werden kann. "Umsetzung" bedeutet hier nicht
notwendigerweise Software-Code. Dazu koennen ein Beschaffungsplan,
operative Runbooks, Governance-Aenderungen, Rollout-Phasen und messbare
Akzeptanzkriterien gehoeren.

Sobald ein LIP angenommen wurde und seine Umsetzung abgeschlossen ist
oder einen vereinbarten stabilen Zustand erreicht hat, wird sein Status
in "Final" geaendert.

Ein LIP kann auch den Status "Deferred" erhalten, wenn keine
Fortschritte erzielt werden oder Voraussetzungen fehlen. Es kann spaeter
wieder aktiviert werden.

Ein LIP kann "Rejected" werden. Es bleibt dennoch wichtig, einen
Nachweis einschliesslich der Gruende zu behalten.

Ein LIP kann auch durch ein anderes LIP ersetzt werden, wodurch das
urspruengliche obsolet wird. Das ist haeufig der Fall, wenn ein
Vorschlag durch einen ueberarbeiteten Ansatz ersetzt wird.

Einige Informational- und Process-LIPs koennen den Status "Active"
haben, wenn sie nicht abgeschlossen werden sollen, sondern als lebende
Leitlinie oder dauerhafte Verfahrensanweisung bestehen bleiben.

## Was gehoert zu einem erfolgreichen LIP?

Jedes LIP sollte folgende Teile enthalten:

* Preamble
  RFC-822-artige Kopfzeilen mit Metadaten zum LIP, einschliesslich LIP-Nummer, kurzem Titel, Autoren, Status, Typ und Daten.

* Abstract
  Eine kurze Beschreibung des behandelten Problems und der vorgeschlagenen Verbesserung.

* Motivation
  Warum die Aenderung aus zivilgesellschaftlicher Sicht erforderlich ist. Welches Problem heute besteht, fuer wen und welche Nachweise diese Aussage stuetzen. Dieser Abschnitt ist kritisch und kann Auswirkungen auf Nutzer, operative Reibungen, Kosten, Risiken und strategische Ausrichtung umfassen.

* Specification
  Eine klare Beschreibung dessen, was sich aendern wird. Bei Standards-Track-LIPs sollte dies alle Schnittstellen, Datenformate, Governance-Regeln oder betrieblichen Anforderungen umfassen, die fuer Interoperabilitaet oder Koordination notwendig sind. Der Detaillierungsgrad sollte ausreichen, damit verschiedene Umsetzer kompatible Ergebnisse erzielen koennen, wenn Kompatibilitaet wichtig ist.

* Rationale
  Warum dieses Design gewaehlt wurde. Welche Alternativen betrachtet wurden. Welche Abwaegungen eingegangen werden. Falls relevant, sollte auf fruehere Ansaetze verwiesen werden, einschliesslich Loesungen anderer Staedte oder oeffentlicher Verwaltungen.

* Stakeholder and Impact Analysis
  Wer betroffen ist, auf welche Weise und welche Vorteile und Risiken erwartet werden. Einschliessen sollte man Barrierefreiheit, Inklusion, Datenschutz, Sicherheit, Nachhaltigkeit, Wartungsaufwand, Anbieterbindung und Budgetauswirkungen, sofern relevant.

* Consultation and Dissent
  Nachweise der Konsultation und die wichtigsten Einwaende, einschliesslich der Art und Weise, wie darauf reagiert wurde oder warum sie nicht uebernommen wurden.

* Compatibility and Transition
  Wenn der Vorschlag bestehende Dienste, Vertraege, Datenfluesse oder nutzerorientierte Verfahren veraendert, ist der Uebergangspfad, der Zeitplan und die Minderung von Stoerungen zu beschreiben. Ziel sind Dienstkontinuitaet und klare Verantwortlichkeit.

* Implementation Plan
  Schritte, Verantwortlichkeiten, Voraussetzungen, Abhaengigkeiten und Akzeptanzkriterien. Dies kann Piloten, Beschaffung, Governance-Freigaben, operative Bereitschaft, Dokumentation und Monitoring umfassen.

* Governance and Accountability
  Wie waehrend des Rollouts Entscheidungen getroffen werden, wer das Ergebnis verantwortet, wie ueber Fortschritt berichtet wird und was eine Ueberarbeitung oder einen Rollback ausloest.

* Licensing and Reuse
  Anzugeben ist, ob der Text gemeinfrei ist oder unter einer freizuegigen Dokumentationslizenz steht, die fuer die Wiederverwendung durch andere Gemeinden geeignet ist.

### LIP-Formate und Vorlagen

LIPs sollten als Klartext in Mediawiki- oder Markdown-Format geschrieben
werden, vorzugsweise in Formaten, die sich in der Versionsverwaltung
leicht pruefen lassen.

### LIP-Kopfzeilenpraeambel

Jedes LIP muss mit einem RFC-822-artigen Kopfzeilenpraeambel beginnen.
Die Kopfzeilen muessen in der folgenden Reihenfolge erscheinen. Mit "*"
markierte Kopfzeilen sind optional. Alle anderen sind erforderlich.

```
  LIP: <LIP-Nummer>
  Title: <LIP-Titel>
  Author: <Liste der echten Namen der Autoren und optional E-Mail-Adressen>
* Discussions-To: <URL oder E-Mail-Adresse>
  Status: <Draft | Active | Accepted | Deferred | Rejected |
           Withdrawn | Final | Superseded>
  Type: <Standards Track | Informational | Process>
  Created: <Erstellungsdatum im ISO-8601-Format (yyyy-mm-dd)>
* Post-History: <Daten von Veroeffentlichungen oder Konsultationen>
* Replaces: <LIP-Nummer>
* Superseded-By: <LIP-Nummer>
* Resolution: <URL zum Entscheidungsprotokoll, Beschluss oder veroeffentlichten Ergebnis>
```

Die Kopfzeile Author listet die Namen und optional die E-Mail-Adressen
aller Autoren oder Verantwortlichen des LIP auf. Bei mehreren Autoren
sollte jeder auf einer separaten Zeile stehen.

Die Kopfzeile Discussions-To sollte angeben, wo das LIP diskutiert wird:
eine Seite fuer oeffentliche Konsultation, ein Issue-Tracker, eine
Mailingliste oder ein offizieller Kanal der Stadt. Sie kann entfallen,
wenn die Diskussion in einer fruehen Entwurfsphase privat gefuehrt wird,
doch vor einer Annahme wird nach Moeglichkeit eine oeffentliche
Diskussion erwartet.

Die Kopfzeile Created dokumentiert das Datum, an dem dem LIP eine Nummer
zugewiesen wurde. Post-History dokumentiert die Daten wichtiger
Veroeffentlichungsschritte, Konsultationen, Workshops oder Meilensteine
der oeffentlichen Pruefung.

Die Kopfzeile Resolution wird fuer Standards-Track- und Process-LIPs
empfohlen. Sie sollte auf einen offiziellen Nachweis der Annahme,
Entscheidung oder des Ergebnisses verweisen.

### Zusaetzliche Dateien

LIPs koennen zusaetzliche Dateien wie Diagramme enthalten. Diese sollten
in einem Unterverzeichnis fuer das jeweilige LIP abgelegt werden oder
muessen LIP-XXXX-Y.ext genannt werden, wobei "XXXX" die LIP-Nummer, "Y"
eine laufende Nummer ab 1 und "ext" die tatsaechliche Dateiendung ist,
zum Beispiel "png".


## LIP-Editoren

Die LIP-Editoren sind die Maintainer, die fuer die administrative und
redaktionelle Aufsicht ueber das LIP-Repository und den Prozess
verantwortlich sind. Sie koennen ueber die im Repository benannte
Kontaktstelle erreicht werden.

### Uebertragung der Verantwortung fuer ein LIP

Es kann notwendig werden, die Verantwortung fuer ein LIP auf einen neuen
Champion zu uebertragen. Ein guter Grund ist, dass der urspruengliche
Autor keine Zeit oder kein Interesse mehr hat, den Vorschlag durch
Pruefung und Umsetzung zu begleiten. Ein schlechter Grund ist
Uneinigkeit ueber die Richtung des Vorschlags; in diesem Fall sollten
konkurrierende Vorschlaege als separate LIPs dokumentiert werden.

Ein Antrag auf Uebernahme der Verantwortung sollte an den
urspruenglichen Autor und die LIP-Editoren gerichtet werden. Wenn der
urspruengliche Autor nicht erreichbar ist, koennen die Editoren
entscheiden, die Stewardship neu zuzuweisen, um den Prozess
voranzubringen und gleichzeitig die Autorschaftshistorie zu bewahren.

### Aufgaben und Ablauf der LIP-Editoren

Bei jeder neuen LIP-Einreichung pruefen die Editoren:

* die Bereitschaft des LIP hinsichtlich Klarheit, Vollstaendigkeit, zivilgesellschaftlicher Relevanz und Passung zum Umfang
* ob der Titel den Inhalt zutreffend beschreibt
* moegliche redaktionelle Verbesserungen an Sprache und Struktur
* ob der Vorschlag eine ausreichende Begruendung, Betrachtungen zu Stakeholder-Auswirkungen und gegebenenfalls einen Uebergangsplan enthaelt

Wenn das LIP nicht bereit ist, geben die Editoren es mit konkreten
Ueberarbeitungswuenschen an den Autor zurueck.

Sobald es bereit ist, wird das LIP ueber den ueblichen Beitragsworkflow,
zum Beispiel einen Pull Request, in das Repository eingebracht, wo es
weiteres oeffentliches Feedback erhalten kann.

Die Editoren:

* vergeben eine LIP-Nummer
* mergen die Einreichung, wenn sie die Mindestkriterien erfuellt
* stellen sicher, dass sie im Repository-Index aufgefuehrt ist
* weisen den Autor auf den naechsten Schritt im Pruefungs- und Konsultationsprozess hin

# Historie

Dieses Dokument ist vom Prozess der Bitcoin Improvement Proposals
[(BIPs)](https://github.com/bitcoin/bips) abgeleitet, insbesondere von
BIP-0001 von Amir Taaki, und wurde angepasst, um zivilgesellschaftliche
Vorschlaege fuer Luganos digitale Infrastruktur und damit verbundene
oeffentliche Prozesse zu unterstuetzen.
