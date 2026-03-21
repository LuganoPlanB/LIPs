
```
LIP: 1
Title: Scopo e Linee Guida dei LIP
Authors: Denis Roio [jaromil@dyne.org](mailto:jaromil@dyne.org)
Status: Open
Type: Process
Assigned: 2026-03-04
```

# Che cos'è un LIP?

LIP significa Lugano Improvement Proposal. Un LIP è un documento di
progettazione strutturato rivolto alla città di Lugano e al suo
ecosistema di portatori di interesse. Propone un miglioramento dei
processi civici, dei servizi pubblici o dell'infrastruttura digitale
della città.

Un LIP dovrebbe fornire una specifica concisa del cambiamento proposto,
la sua motivazione e l'impatto previsto. L'obiettivo è rendere le
proposte comprensibili, verificabili e attuabili sia da attori tecnici
sia non tecnici.

I LIP sono pensati come meccanismo principale per:

* proporre miglioramenti e nuove iniziative con finalità civica
* raccogliere contributi strutturati dal pubblico e dai portatori di interesse su una questione
* documentare il ragionamento e le decisioni alla base dei cambiamenti adottati
* mantenere un registro pubblico di proposte, esiti e iterazioni

L'autore del LIP è responsabile di descrivere chiaramente la proposta,
coinvolgere i portatori di interesse pertinenti e documentare obiezioni
significative o punti di vista alternativi.

Poiché i LIP sono mantenuti come file di testo in un repository
versionato, la loro cronologia di revisione fa parte del registro
pubblico di come una proposta si è evoluta.

## Tipi di LIP

Esistono tre tipi di LIP:

* Un LIP Standards Track descrive un cambiamento che influisce su interoperabilità, infrastrutture cittadine condivise o coordinamento tra dipartimenti. Gli esempi includono formati di dati comuni, principi di identità e accesso, requisiti di interoperabilità negli acquisti, linee guida per API pubbliche, convenzioni di integrazione dei servizi o standard operativi condivisi.

* Un LIP Informational descrive un problema, uno spazio di progettazione o ricerca di contesto, oppure fornisce linee guida generali e buone pratiche rilevanti per l'infrastruttura digitale civica. I LIP Informational non rappresentano necessariamente un consenso o una raccomandazione e possono essere usati come materiale di riferimento.

* Un LIP Process descrive o propone cambiamenti nel modo in cui vengono prese le decisioni, valutate le proposte, condotte le consultazioni pubbliche o monitorati implementazione e accountability. I LIP Process disciplinano il funzionamento del sistema LIP stesso e dei relativi flussi di governance civica.

## Flusso di Lavoro dei LIP

Il processo LIP inizia con una nuova idea o con un problema identificato
che riguarda l'infrastruttura digitale della città o i processi civici.

Ogni potenziale LIP dovrebbe avere un champion, cioè una persona che
scrive il LIP usando lo stile e il formato descritti sotto, guida la
discussione nei forum appropriati e cerca di costruire consenso tra i
portatori di interesse. I portatori di interesse possono includere
dipartimenti comunali, operatori di servizi, imprese locali, gruppi
della società civile, comunità tecniche e residenti.

È incoraggiato un esame pubblico dell'idea prima di scrivere un LIP
completo. Questo fa risparmiare tempo, riduce la duplicazione e aiuta a
individuare presto i vincoli. Una proposta può essere utile localmente
ma inadatta come standard cittadino, oppure può richiedere allineamento
legale, operativo o di bilancio che dovrebbe emergere tempestivamente.

Quando il champion ritiene che l'idea sia abbastanza matura, invia una
bozza di LIP al canale di discussione designato e al repository. La
bozza dovrebbe essere scritta nello stile LIP, altrimenti può essere
restituita per revisione.

Gli autori sono responsabili di raccogliere feedback sia sull'idea
iniziale sia sulla bozza di LIP prima di sottoporla a revisione
editoriale. Le discussioni lunghe e senza un perimetro chiaro dovrebbero
essere evitate quando possibile. Strategie per mantenere efficiente la
revisione includono consultazioni a tempo definito, issue tracker con
domande chiare, workshop con verbali e richieste di commento
strutturate.

Si raccomanda che un singolo LIP contenga una sola proposta chiave. Se
l'ambito diventa troppo ampio, il lavoro dovrebbe essere suddiviso in
più LIP.

Gli editor dei LIP assegnano i numeri dei LIP e gestiscono i cambiamenti
di stato. Gli autori non devono autoassegnarsi numeri LIP e dovrebbero
invece usare un alias durante la fase di bozza, per esempio:

```
lip-jaromil-digital-identity
lip-jaromil-lost&found-revocation
```

Se un LIP viene accettato per essere preso in considerazione, gli editor
assegnano un numero, impostano il Type, gli attribuiscono lo stato
"Draft" e lo aggiungono al repository.

Tra le ragioni per negare lo stato di LIP vi sono duplicazione del
lavoro, mancanza di chiarezza, mancato rispetto delle regole di
formattazione, ambito troppo ampio, proposte tecnicamente o
operativamente deboli, assenza di motivazione, mancanza di
considerazioni sui portatori di interesse o proposte che non servono uno
scopo civico.

L'autore può aggiornare la bozza nel repository. Gli aggiornamenti
possono essere inviati come changeset o pull request, a seconda del
flusso di hosting.

I LIP Standards Track includono generalmente due parti: il documento di
progetto e un piano di implementazione. Dovrebbero essere riesaminati e
accettati in linea di principio prima che inizi una implementazione
rilevante, salvo quando un progetto pilota sia necessario per valutare
la fattibilità.

Un LIP Standards Track dovrebbe includere un approccio di
implementazione prima di poter essere considerato Final. Per
"implementazione" qui non si intende necessariamente codice software.
Può includere un piano di approvvigionamento, runbook operativi,
cambiamenti di governance, fasi di rollout e criteri di accettazione
misurabili.

Una volta che un LIP è stato adottato e la sua implementazione è stata
completata, o ha raggiunto uno stato stabile concordato, il suo stato
viene cambiato in "Final".

Un LIP può anche ricevere lo stato "Deferred" quando non si stanno
facendo progressi o quando mancano prerequisiti. Potrà essere riattivato
in seguito.

Un LIP può essere "Rejected". È comunque importante mantenerne traccia,
incluse le motivazioni.

Un LIP può anche essere sostituito da un altro LIP, rendendo obsoleto
l'originale. Questo è comune quando una proposta viene rimpiazzata da un
approccio rivisto.

Alcuni LIP Informational e Process possono avere stato "Active" se non
sono pensati per essere completati, ma per restare come guida viva o
procedura permanente.

## Cosa appartiene a un LIP ben riuscito?

Ogni LIP dovrebbe avere le seguenti parti:

* Preambolo
  Intestazioni in stile RFC 822 contenenti metadati sul LIP, inclusi numero del LIP, titolo breve, autori, stato, tipo e date.

* Abstract
  Una breve descrizione del problema affrontato e del miglioramento proposto.

* Motivation
  Perché il cambiamento è necessario in termini civici. Quale problema esiste oggi, per chi, e quali prove supportano l'affermazione. Questa sezione è critica e può includere impatto sugli utenti, frizioni operative, costi, rischi e allineamento strategico.

* Specification
  Una descrizione chiara di ciò che cambierà. Per i LIP Standards Track questa dovrebbe includere eventuali interfacce, formati dati, regole di governance o requisiti operativi necessari per interoperabilità o coordinamento. Dovrebbe essere sufficientemente dettagliata da permettere a diversi attuatori di produrre risultati compatibili dove la compatibilità conta.

* Rationale
  Perché è stata scelta questa progettazione. Quali alternative sono state considerate. Quali compromessi vengono fatti. Fare riferimento, quando rilevante, a precedenti esperienze, incluse soluzioni adottate in altre città o pubbliche amministrazioni.

* Stakeholder and Impact Analysis
  Chi è coinvolto, in che modo e quali sono benefici e rischi attesi. Includere accessibilità, inclusione, privacy, sicurezza, sostenibilità, onere di manutenzione, rischio di lock-in del fornitore e implicazioni di budget, dove applicabile.

* Consultation and Dissent
  Evidenza della consultazione e principali obiezioni sollevate, compreso come sono state affrontate o perché non sono state adottate.

* Compatibility and Transition
  Se la proposta modifica servizi esistenti, contratti, flussi di dati o procedure rivolte agli utenti, descrivere il percorso di transizione, le tempistiche e la mitigazione delle interruzioni. L'obiettivo è la continuità del servizio e una chiara accountability.

* Implementation Plan
  Passi, responsabilità, prerequisiti, dipendenze e criteri di accettazione. Questo può includere progetti pilota, approvvigionamento, approvazioni di governance, prontezza operativa, documentazione e monitoraggio.

* Governance and Accountability
  Come vengono prese le decisioni durante il rollout, chi possiede l'esito, come viene riportato l'avanzamento e cosa attiva una revisione o un rollback.

* Licensing and Reuse
  Indicare se il testo è di pubblico dominio o sotto una licenza documentale permissiva adatta al riuso da parte di altri comuni.

### Formati e Modelli dei LIP

I LIP dovrebbero essere scritti in testo semplice usando il formato
mediawiki o markdown, con preferenza per formati facili da revisionare
nel controllo di versione.

### Preambolo dell'Intestazione LIP

Ogni LIP deve iniziare con un preambolo di intestazioni in stile RFC
822. Le intestazioni devono comparire nel seguente ordine. Le
intestazioni contrassegnate con "*" sono opzionali. Tutte le altre sono
obbligatorie.

```
  LIP: <numero LIP>
  Title: <titolo LIP>
  Author: <elenco dei nomi reali degli autori e facoltativamente indirizzi email>
* Discussions-To: <url o indirizzo email>
  Status: <Draft | Active | Accepted | Deferred | Rejected |
           Withdrawn | Final | Superseded>
  Type: <Standards Track | Informational | Process>
  Created: <data di creazione, nel formato ISO 8601 (yyyy-mm-dd)>
* Post-History: <date di pubblicazioni o consultazioni>
* Replaces: <numero LIP>
* Superseded-By: <numero LIP>
* Resolution: <url del verbale decisionale, della risoluzione o dell'esito pubblicato>
```

L'intestazione Author elenca i nomi e, facoltativamente, gli indirizzi
email di tutti gli autori o proprietari del LIP. Se ci sono più autori,
ciascuno dovrebbe comparire su una riga separata.

L'intestazione Discussions-To dovrebbe indicare dove il LIP è discusso:
una pagina di consultazione pubblica, un issue tracker, una mailing list
o un canale ufficiale della città. Può essere omessa se la discussione è
gestita in privato nelle prime fasi di bozza, ma prima dell'accettazione
è prevista, ove possibile, una discussione pubblica.

L'intestazione Created registra la data in cui al LIP è stato assegnato
un numero. Post-History registra le date dei principali passaggi di
pubblicazione, consultazioni, workshop o tappe della revisione pubblica.

L'intestazione Resolution è raccomandata per i LIP Standards Track e
Process. Dovrebbe puntare a un verbale ufficiale di adozione, decisione
o esito.

### File Ausiliari

I LIP possono includere file ausiliari come diagrammi. I file ausiliari
dovrebbero essere inclusi in una sottodirectory per quel LIP, oppure
devono essere nominati LIP-XXXX-Y.ext, dove "XXXX" è il numero del LIP,
"Y" è un numero seriale, a partire da 1, e "ext" è sostituito con
l'estensione reale del file, per esempio "png".


## Editor dei LIP

Gli editor dei LIP sono i manutentori responsabili della supervisione
amministrativa ed editoriale del repository e del processo LIP. Possono
essere contattati tramite il punto di contatto designato del repository.

### Trasferimento della Titolarità di un LIP

Può rendersi necessario trasferire la titolarità di un LIP a un nuovo
champion. Una buona ragione è che l'autore originale non abbia più tempo
o interesse per mantenere la proposta durante revisione e
implementazione. Una cattiva ragione è il disaccordo sulla direzione
della proposta, nel qual caso proposte concorrenti dovrebbero essere
documentate come LIP separati.

Una richiesta di assunzione della titolarità dovrebbe essere rivolta
all'autore originale e agli editor dei LIP. Se l'autore originale non è
reperibile, gli editor possono decidere di riassegnare la stewardship
per far avanzare il processo, preservando comunque la storia
dell'autorialità.

### Responsabilità e Flusso di Lavoro degli Editor dei LIP

Per ogni nuova sottomissione di LIP, gli editor:

* Esaminano il LIP per verificarne prontezza, chiarezza, completezza, rilevanza civica e aderenza all'ambito.
* Controllano che il titolo descriva accuratamente il contenuto.
* Suggeriscono miglioramenti editoriali al linguaggio e alla struttura.
* Verificano che la proposta includa motivazione sufficiente, considerazioni sull'impatto sui portatori di interesse e un piano di transizione dove rilevante.

Se il LIP non è pronto, gli editor lo restituiscono all'autore con
richieste di revisione specifiche.

Una volta pronto, il LIP viene inviato al repository attraverso il
normale flusso di contribuzione, per esempio una pull request, dove può
ricevere ulteriore feedback pubblico.

Gli editor tipicamente:

* Assegnano un numero LIP.
* Fanno il merge della sottomissione quando soddisfa i criteri minimi.
* Si assicurano che sia elencato nell'indice del repository.
* Indicano all'autore il passo successivo nel processo di revisione e consultazione.

# Storia

Questo documento deriva dal processo delle Bitcoin Improvement Proposals
[(BIPs)](https://github.com/bitcoin/bips), in particolare dal BIP-0001
di Amir Taaki, ed è adattato per supportare proposte civiche per
l'infrastruttura digitale di Lugano e i relativi processi pubblici.
