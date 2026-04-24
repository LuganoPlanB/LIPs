```
LIP: 2
Title: Alarmregister fuer Credential-Verlustereignisse (CLEAR)
Author: Jaromil, Bregy
Discussions-To: https://github.com/LuganoPlanB/lugano-lips/issues
Status: Accepted
Type: Standards Track
Created: 2026-04-24
```

# Zusammenfassung

Dieser Vorschlag definiert einen zivilgesellschaftlichen Micro-Service,
der es einem Authentifizierungs-Endpoint ermoeglicht, privacy-preserving
zu pruefen, ob eine bestimmte Person kuerzlich den Verlust oder
Diebstahl eines persoenlichen Geraets gemeldet hat, das als
Authentifizierungsfaktor genutzt wird, etwa ein Mobiltelefon. Der Dienst
nimmt zeitlich begrenzte polizeiliche Verlustmeldungen auf, wandelt sie
in kurzlebige Kompromittierungssignale um und beantwortet Anfragen nur
ueber Zero-Knowledge-Proof-Workflows, die vermeiden, den zugrunde
liegenden Polizeibericht, den vollstaendigen Identitaetsdatensatz oder
breitere Nutzerdaten des anfragenden Dienstes offenzulegen.

# Motivation

Authentifizierungssysteme stuetzen sich zunehmend auf besitzbasierte
Faktoren, die ueber persoenliche Hardwaregeraete wie Mobiltelefone,
Wallet-Geraete und SIM-gebundene Credentials umgesetzt werden. Diese
Faktoren koennen verloren gehen, gestohlen werden oder zeitweise unter
die Kontrolle einer anderen Person geraten.

Heute sind Polizeimeldungen ueber verlorene oder gestohlene Telefone
weitgehend von den Authentifizierungssystemen getrennt, die sie zur
Betrugsreduzierung nutzen koennten. Dadurch entsteht eine klare Luecke:

* ein Buerger kann den Verlust eines Geraets umgehend der Polizei
  melden, waehrend Online-Dienste diesem Geraet weiter vertrauen, als
  waere es noch in seinem Besitz
* Dienstbetreiber erfahren von einer Geraetekompromittierung oft erst,
  nachdem eine Kontouebernahme erfolgt ist
* ein Modell direkter Datenweitergabe zwischen Polizei und
  Dienstanbietern wuerde unverhaeltnismaessige Datenschutz- und
  Governance-Risiken schaffen

Lugano kann diese Luecke schliessen, indem es einen Vertrauensdienst im
oeffentlichen Interesse schafft, der nur eine eng begrenzte Aufgabe
erfuellt: ein temporaeres Risikosignal bereitzustellen, dass eine Person
kuerzlich den Verlust eines Authentifizierungsgeraets gemeldet hat. Der
Dienst soll die Sicherheit erhoehen, ohne zu einer
Ueberwachungsdatenbank zu werden.

# Spezifikation

## Dienstumfang

Der vorgeschlagene Dienst, genannt Credential Loss Event Alert Registry
(CLEAR), liefert eine Ja-oder-Nein-Risikoantwort auf eine eng definierte
Frage:

"Hat Person P innerhalb des Aufbewahrungsfensters den Verlust oder
Diebstahl von Geraet D gemeldet, wobei D als Authentifizierungsfaktor
geeignet ist?"

Der CLEAR-Dienst ist kein allgemeines Geraeteregister, kein Datenportal
fuer Strafverfolgungsbehoerden und kein Ersatz fuer Widerrufssysteme,
die von Mobilfunkanbietern, Identity Wallets oder Relying Parties
betrieben werden.

## Zulaessige Datensaetze

Der CLEAR-Dienst darf nur Meldungen aufnehmen, die alle folgenden
Bedingungen erfuellen:

* der Verlust oder Diebstahl wurde einer zustaendigen Polizeibehoerde
  angezeigt
* die Meldung identifiziert eine natuerliche Person oder ein anderes
  rechtlich anerkanntes Subjekt
* die Meldung identifiziert ein persoenliches Geraet, das in einem
  Authentifizierungsverfahren eingesetzt werden kann
* der Zeitstempel der Meldung ist bekannt
* die Meldung enthaelt genug strukturierte Daten, um einen stabilen
  Geraete-Claim fuer das Matching abzuleiten, ohne unnoetige narrative
  Details zu speichern

Beispiele fuer zulaessige Geraete-Claims sind eine Telefonnummer, eine
SIM-Kennung, eine geraetegebundene Wallet-Kennung oder eine andere von
der Governance genehmigte Authentifizierungsbindung.

## Datenminimierung

Der CLEAR-Dienst darf keine vollstaendigen Polizeiberichte speichern. Er
speichert nur die minimalen Felder, die zur Unterstuetzung der Anfrage
erforderlich sind:

* eine Subjektreferenz, abgeleitet aus der rechtlichen Identitaet der
  Person
* eine Geraetereferenz, abgeleitet aus dem kompromittierten
  Authentifizierungsgeraet
* den Ereignistyp: verloren, gestohlen oder wiedergefunden
* den Meldezeitpunkt
* den Ablaufzeitpunkt
* die Kennung der meldenden Behoerde
* eine Audit-Referenz auf den Ursprungsdatensatz

Narrative Beschreibungen, Ortsangaben, Zeugenaussagen und andere
ueberfluessige Polizeidaten muessen ausserhalb des Dienstes bleiben.

Wo moeglich, sollten die gespeicherten Subjekt- und Geraetereferenzen
als Commitments dargestellt werden, die aus den Quellkennungen
abgeleitet sind, statt als direkt lesbare Kennungen.

## Aufbewahrung und Zustandsuebergaenge

Jeder Verlust- oder Diebstahldatensatz muss nach einer durch Policy
definierten begrenzten Aufbewahrungsfrist automatisch ablaufen. Die
Standardaufbewahrungsfrist sollte 30 Tage betragen, sofern nicht durch
Governance und gestuetzt auf Evidenz eine andere Frist genehmigt wird.

Der Dienst muss mindestens diese Zustandsuebergaenge unterstuetzen:

* `reported`: ein Verlust oder Diebstahl wurde gemeldet und liegt
  innerhalb der Aufbewahrungsfrist
* `recovered`: das Geraet wurde wiedergefunden oder die Kontrolle wurde
  wiederhergestellt
* `expired`: das Aufbewahrungsfenster ist abgelaufen

Anfragen muessen `recovered`- und `expired`-Datensaetze als nicht
kompromittiert behandeln, sofern nicht eine andere aktive Meldung fuer
dasselbe Subjekt und Geraet in Kraft bleibt.

## Privacy-preserving Anfragemodell

Der CLEAR-Dienst muss ein Anfrageprotokoll bereitstellen, das auf
Zero-Knowledge-Proofs ueber einer authentifizierten Menge aktiver
Datensaetze basiert, zum Beispiel einer Merkle-Tree-Darstellung aktiver
Subjekt-Geraet-Commitments, mit diesen Eigenschaften:

* der Anfragende beweist seine Berechtigung, zu einem
  Subjekt-Geraet-Paar fuer ein legitimes Authentifizierungsereignis zu
  fragen
* der Dienst lernt nur das Minimum, das zur Beantwortung der Anfrage
  noetig ist
* der Anfragende lernt nur, ob ein aktives Kompromittierungssignal
  existiert, plus optionale Policy-Metadaten wie eine Altersklasse des
  Signals
* der Anfragende kann nicht die gesamte Datenbank enumerieren
* Beobachter koennen getrennte Anfragen nicht verknuepfen, um die
  breitere Aktivitaet eines Buergers zu rekonstruieren

Ein konformes Design ist:

* Polizeibehoerden senden strukturierte Ereignisattestierungen an den
  Dienst
* der Dienst wandelt die Subjektkennung und die Geraetekennung in
  Commitments um
* aktive Commitments werden in einen Merkle Tree oder eine aehnliche
  authentifizierte Menge eingefuegt, die aktualisiert wird, wenn
  Meldungen hinzugefuegt, wiedergefunden oder abgelaufen sind
* ein Authentifizierungs-Endpoint uebermittelt eine privacy-preserving
  Anfrage und erhaelt einen Zero-Knowledge-Proof, dass das angefragte
  Paar in der aktiven Menge, die durch die aktuelle Root repraesentiert
  wird, vorhanden oder nicht vorhanden ist

Alternative Designs koennen verwendet werden, wenn sie dieselben
Garantien fuer Datenschutz, Auditierbarkeit und Anti-Enumeration
bewahren.

## Root-Notarisierung

Jede Aktualisierung der aktiven Menge sollte eine neue Merkle Root und
einen zugehoerigen signierten Checkpoint erzeugen. Der CLEAR-Betreiber
sollte diese Checkpoints regelmaessig auf einem verteilten Ledger wie
SwissLedger oder einem anderen von der Governance genehmigten Ledger im
oeffentlichen Interesse notarisieren.

Der notarisierte Checkpoint sollte nur nicht-personenbezogenes
Integritaetsmaterial enthalten:

* die Root der aktiven Menge
* den Checkpoint-Zeitstempel
* eine Sequenznummer oder Epochenkennung
* die Signatur des Betreibers oder Schluesselkennung
* optionale Policy-Metadaten, etwa das gueltige Aufbewahrungsfenster

Kein Polizeibericht, keine Subjektkennung, keine Geraetekennung, kein
Commitment-Preimage, kein Anfrageprotokoll und keine Relying-Party-
Aktivitaet sollte auf den Ledger geschrieben werden.

Zweck der Notarisierung ist, die Geschichte der Aenderungen der aktiven
Menge extern verifizierbar zu machen, ohne den Inhalt der Menge
offenzulegen. Auditoren, Relying Parties und Aufsichtsbehoerden koennen
spaeter pruefen, dass ein Proof gegen eine Root geprueft wurde, die zu
einem bestimmten Zeitpunkt existierte, dass Roots nicht nachtraeglich
still umgeschrieben wurden und dass Luecken oder unerwartete Forks in
der Checkpoint-Sequenz sichtbar sind.

## Anfrageautorisierung

Nur genehmigte Authentifizierungs-Endpoints duerfen den Dienst abfragen.
Die Autorisierung muss verlangen:

* eine registrierte Betreiberidentitaet
* einen deklarierten Use Case, der an Authentifizierung oder
  Kontowiederherstellung gebunden ist
* signierte Anfragen
* Rate Limits pro Betreiber
* Logging, das fuer spaetere Aufsicht geeignet ist

Der Autorisierungsfluss sollte jede Anfrage kryptographisch an eine
bestimmte Authentifizierungstransaktion binden, sodass Proofs nicht
wiedergegeben oder als allgemeine Lookup-Token wiederverwendet werden
koennen.

Der CLEAR-Dienst muss Massenabfragen, Hintergrundprofiling,
Marketingnutzungen und generalisiertes Identitaetsscreening ablehnen.

## Antwortsemantik

Das Antwortformat muss bewusst minimal sein. Eine konforme Antwort
enthaelt:

* ein boolesches Ergebnis: `active_signal` true oder false
* ein Proof-Artefakt, das vom Anfragenden gegen die Root der aktiven
  Menge verifiziert werden kann
* eine optionale Freshness-Klasse wie `0-24h`, `1-7d`, `8-30d`
* einen Ablaufzeitpunkt der Antwort

Die Antwort darf den Text des Polizeiberichts, den genauen Meldeort oder
unnoetige Identitaetsattribute nicht offenlegen.

## Erforderliches Verhalten von Relying Parties

Dieser CLEAR-Dienst liefert ein Risikosignal, kein Mandat fuer eine
automatische Ablehnung. Betreiber, die den Dienst integrieren, muessen
Policy-Aktionen fuer ein positives Ergebnis definieren, zum Beispiel:

* Step-up-Verifikation mit einem separaten Faktor
* temporaerer Halt fuer Hochrisikoaktionen
* manuelle Pruefung fuer Wiederherstellungsablaeufe
* Benachrichtigung des Buergers ueber einen bereits vertrauenswuerdigen
  Kanal

Betreiber duerfen ein positives Ergebnis nicht als alleinige Grundlage
fuer eine dauerhafte Kontoschliessung oder die Ablehnung nicht
zusammenhaengender Dienste verwenden.

# Begruendung

Das Design waehlt einen eng begrenzten Kompromittierungspruefdienst
anstelle einer breiten Plattform fuer "gestohlenes Eigentum".

Dies ist vorzuziehen, weil:

* es direkt auf ein hochwertiges Betrugsmuster zielt, das digitale
  Identitaet und Kontosicherheit betrifft
* es Datensammlung und institutionellen Umfang minimiert
* es leichter zu governieren, zu auditieren und zu pilotieren ist
* es wiederverwendbare zivilgesellschaftliche Infrastruktur schafft, die
  jeder Authentifizierungs-Endpoint integrieren kann

Zero-Knowledge-Proofs sind hier gerechtfertigt, weil eine einfache
zentrale API andernfalls ein neues sensibles Register schaffen wuerde,
das Polizeiberichte, Geraetekennungen und Authentifizierungsaktivitaet
verknuepft. Commitments und Merkle-basierte Proofs erlauben dem Dienst,
die enge Kompromittierungsfrage zu beantworten und zugleich die
Offenlegung der zugrunde liegenden Datensaetze zu verringern.

Die Notarisierung von Merkle Roots auf einem verteilten Ledger staerkt
die Integritaet dieses Designs, ohne die vom Dienst geteilten Daten zu
erweitern. Der Ledger wird nicht zu einem Register von
Verlustereignissen. Er dient als unabhaengige Zeitstempel- und
Ordnungsschicht fuer oeffentliche Checkpoints. Dies unterstuetzt
spaetere Verifikation der Aenderungsgeschichte, erkennt Versuche,
Zustaende der aktiven Menge umzuschreiben oder auszulassen, und
verringert die Abhaengigkeit vom CLEAR-Betreiber als einziger
Audit-Wahrheitsquelle.

Dies ist besonders relevant fuer einen zivilgesellschaftlichen
Vertrauensdienst. Authentifizierungsentscheidungen koennen nach einer
Kontouebernahme, einer fehlgeschlagenen Wiederherstellung oder einem
Betreiberfehler bestritten werden. Eine notarisierte Root-Historie gibt
Auditoren eine stabile Grundlage, um zu pruefen, ob der zum Zeitpunkt
verwendete Dienstzustand mit der veroeffentlichten Checkpoint-Sequenz
konsistent war, waehrend die Privatsphaere von Buergern und Relying
Parties gewahrt bleibt.

Erwogene Alternativen:

* Direkte Datenweitergabe von der Polizei an Plattformen.
  Dies ist technisch einfacher, skaliert aber schlecht, erhoeht die
  rechtliche Komplexitaet und verbreitet sensible Daten breit.
* Nur Carrier-basierte Widerrufsfeeds.
  Nuetzlich, wo verfuegbar, aber unvollstaendig. Viele
  Authentifizierungsfaktoren werden nicht von Carriern kontrolliert, und
  oeffentliche Dienste brauchen eine neutrale Koordinationsschicht.
* Nur nutzerverwaltete Selbstmeldung.
  Hilfreich, aber schwaecher. Betrugspraevention profitiert von
  attestierten Meldungen und unabhaengigen Zeitstempeln.
* Lokale Audit-Logs ohne Ledger-Notarisierung.
  Notwendig, aber fuer sich allein unzureichend. Sie bleiben unter
  Kontrolle des Dienstbetreibers und sind schwaechere Evidenz, wenn die
  historische Integritaet spaeter bestritten wird.

# Stakeholder- und Wirkungsanalyse

Betroffene Stakeholder:

* Buerger, die Geraeteverlust oder -diebstahl melden
* Polizeibehoerden oder Annahmestellen
* kommunale und private Betreiber von Authentifizierungsdiensten
* Anbieter digitaler Identity Wallets
* Datenschutz-, Daten- und Buergerrechtsbehoerden
* Auditoren und Incident Responder

Erwartete Vorteile:

* fruehere Erkennung kompromittierter Authentifizierungsfaktoren
* geringeres Risiko einer Kontouebernahme nach Geraetediebstahl
* bessere Koordination zwischen oeffentlicher Meldung und digitaler
  Abwehr
* eine wiederverwendbare Risikokontrollkomponente fuer mehrere Dienste

Wesentliche Risiken:

* False Positives durch Kennungsmismatch oder verzoegerte
  Wiederherstellungsupdates
* Function Creep in generalisierte Ueberwachung oder Profiling
* uebermaessige Abhaengigkeit vom Signal durch Betreiber mit schlecht
  gestalteten Fallbacks
* kryptographische und operative Komplexitaet

Minderungen:

* kurze Aufbewahrungsfenster und explizite Wiederherstellungsereignisse
* strikte Zweckbindung und oeffentliche Governance
* minimale Antwortsemantik
* unabhaengige Sicherheitspruefung und Datenschutz-Folgenabschaetzung
* phasenweise Einfuehrung beginnend mit einem Piloten

Auswirkungen auf Budget und Nachhaltigkeit:

* moderate anfaengliche Implementierungs- und Pruefkosten
* geringe bis moderate laufende Betriebskosten, wenn der Dienst minimal
  und zentralisiert bleibt
* geringere Oekosystemkosten als bilaterale Integrationen zwischen
  vielen Polizeistellen und vielen Dienstanbietern

Vendor Lock-in sollte begrenzt werden, indem offene Spezifikationen,
portable Proofs und exportierbare Audit-Daten verlangt werden.

Auch die Ledger-Nutzung sollte Vendor Lock-in vermeiden. Das
Checkpoint-Format sollte portabel sein, sodass Roots unabhaengig von
einer einzelnen Ledger-Implementierung oder einem einzelnen
Dienstanbieter verifiziert werden koennen.

# Konsultation und Dissens

Dieser Entwurf sollte geprueft werden mit:

* kommunalen Betreibern digitaler Identitaet
* Polizeibehoerden fuer Meldungen
* der kommunalen Datenschutzfunktion
* zivilgesellschaftlichen Organisationen mit Fokus auf Datenschutz und
  Due Process
* Betreibern hochwertiger Authentifizierungs-Endpoints wie
  E-Government, Banking und digitale Wallet-Dienste

Wahrscheinliche Einwaende sind:

* Polizeidaten sollten Login-Entscheidungen nie beeinflussen
* Zero-Knowledge-Systeme sind fuer einen kommunalen Dienst zu komplex
* der Vorschlag koennte sensible Lebensereignisse dennoch indirekt
  offenlegen

Diese Einwaende sind wesentlich und sollten im Pilotdesign geprueft
werden. Der Vorschlag beantwortet sie, indem der Dienst eng, temporaer,
auditierbar und beratend statt strafend gehalten wird.

# Kompatibilitaet und Uebergang

Der Vorschlag ist additiv. Bestehende Authentifizierungssysteme koennen
ihn als optionale Risikopruefung integrieren, ohne aktuelle Login-Flows
zu brechen.

Ein empfohlener Uebergangspfad ist:

* Pilot mit einem kommunalen Authentifizierungs-Endpoint und einer
  externen Relying Party
* zunaechst nur ein oder zwei Geraete-Claim-Typen unterstuetzen, etwa
  Telefonnummer und Wallet-Binding-Kennung
* False-Positive-Raten, Latenz, Bedienbarkeit fuer Betreiber und
  rechtliche Eignung evaluieren
* erst nach Governance-Genehmigung und Veroeffentlichung der Ergebnisse
  ausweiten

Fallback-Verhalten muss verfuegbar bleiben, wenn der Dienst offline oder
noch nicht integriert ist.

# Implementierungsplan

1. Rechtsgrundlage, Governance-Perimeter und erlaubte Use Cases
   definieren.
2. Das minimale strukturierte Schema fuer polizeiliche
   Ereignisattestierungen vereinbaren.
3. Commitment-Ableitungsmethode, Proof-System und Antwortformat
   spezifizieren.
4. Checkpoint-Format der Merkle Root und Ledger-Notarisierungskadenz
   spezifizieren.
5. Einen Pilot-Ingestion-Adapter fuer eine meldende Behoerde bauen.
6. Den Dienst fuer die aktive Menge mit automatischem Ablauf und
   Wiederherstellungsbehandlung bauen.
7. Einen Authentifizierungs-Endpoint als Relying-Party-Pilot
   integrieren.
8. Datenschutz-, Sicherheits- und Betriebsbewertungen durchfuehren.
9. Ergebnisse veroeffentlichen und entscheiden, ob standardisiert,
   ueberarbeitet oder abgelehnt wird.

Akzeptanzkriterien fuer den Piloten sollten umfassen:

* begrenzte Anfragelatenz, geeignet fuer Live-Authentifizierung
* keine Offenlegung roher Polizeiberichtsinhalte an Relying Parties
* erfolgreicher Ablauf von Datensaetzen nach der Aufbewahrungsfrist
* auditierbare Autorisierung und Rate Limiting
* veroeffentlichte Merkle-Root-Checkpoints, die unabhaengig gegen den
  ausgewaehlten Ledger verifiziert werden koennen
* Evidenz, dass das Signal Betrugskontrollen verbessert, ohne
  uebermaessige False Positives zu erzeugen

# Governance und Verantwortlichkeit

Der Dienst sollte als gemeinsam genutzte zivilgesellschaftliche
Infrastruktur mit einem klar benannten Betreiber und einer
Aufsichtsfunktion verwaltet werden, die Datenschutzpruefung
einschliesst.

Governance-Verantwortlichkeiten sollten umfassen:

* zulaessige Geraete-Claim-Typen genehmigen
* Aufbewahrungsfristen genehmigen
* autorisierte anfragende Betreiber genehmigen
* Checkpoint-Kadenz und den fuer Notarisierung verwendeten Ledger
  genehmigen
* Audit-Logs und Missbrauchsmeldungen pruefen
* Aussetzung oder Rollback ausloesen, wenn Missbrauch oder uebermaessige
  Fehlerraten erkannt werden

Jede Ausweitung ueber authentifizierungsbezogene Nutzung hinaus muss ein
neues LIP oder eine explizite Aenderung dieses LIP erfordern.

# Lizenzierung und Wiederverwendung

Dieses Dokument wird unter der GNU Free Documentation License
bereitgestellt, damit andere Gemeinden es fuer nicht-kommerzielle Zwecke
mit Namensnennung und unter gleichen Weitergabebedingungen
wiederverwenden koennen.
