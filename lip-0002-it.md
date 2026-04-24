```
LIP: 2
Title: Registro di Allerta per Eventi di Perdita di Credenziali (CLEAR)
Author: Jaromil, Bregy
Discussions-To: https://github.com/LuganoPlanB/lugano-lips/issues
Status: Accepted
Type: Standards Track
Created: 2026-04-24
```

# Abstract

Questa proposta definisce un micro-servizio civico che consente a un
endpoint di autenticazione di verificare, in modo privacy-preserving, se
una persona specifica ha recentemente denunciato lo smarrimento o il
furto di un dispositivo personale usato come fattore di autenticazione,
come un telefono cellulare. Il servizio acquisisce denunce di
smarrimento con durata limitata presentate alla polizia, le converte in
segnali di compromissione di breve durata e risponde alle interrogazioni
solo tramite flussi di prova zero-knowledge che evitano di divulgare la
denuncia sottostante, il record completo di identita' o i dati piu' ampi
dell'utente presso il servizio interrogante.

# Motivazione

I sistemi di autenticazione si basano sempre piu' su fattori di possesso
implementati tramite dispositivi hardware personali come telefoni
cellulari, dispositivi wallet e credenziali vincolate alla SIM. Questi
fattori possono essere smarriti, rubati o temporaneamente portati sotto
il controllo di un'altra persona.

Oggi le denunce alla polizia relative a telefoni smarriti o rubati sono
in larga parte isolate dai sistemi di autenticazione che potrebbero
usarle per ridurre le frodi. Questo lascia una lacuna evidente:

* un cittadino puo' denunciare prontamente alla polizia lo smarrimento
  di un dispositivo, mentre i servizi online continuano a fidarsi di
  quel dispositivo come se fosse ancora in suo possesso
* gli operatori di servizio spesso vengono a conoscenza della
  compromissione del dispositivo solo dopo che si e' verificata una
  presa di controllo dell'account
* un modello di condivisione diretta dei dati tra polizia e fornitori di
  servizi creerebbe rischi sproporzionati per privacy e governance

Lugano puo' colmare questa lacuna creando un servizio fiduciario di
interesse pubblico che svolge un solo compito ristretto: fornire un
segnale di rischio temporaneo che una persona ha recentemente denunciato
lo smarrimento di un dispositivo di autenticazione. Il servizio dovrebbe
aumentare la sicurezza senza diventare una banca dati di sorveglianza.

# Specifica

## Ambito del servizio

Il servizio proposto, chiamato Credential Loss Event Alert Registry
(CLEAR), fornisce una risposta di rischio si-o-no a una domanda definita
in modo ristretto:

"La persona P ha denunciato, entro la finestra di conservazione, lo
smarrimento o il furto del dispositivo D, dove D e' idoneo all'uso come
fattore di autenticazione?"

Il servizio CLEAR non e' un registro generale dei dispositivi, non e' un
portale dati per le forze dell'ordine e non sostituisce i sistemi di
revoca gestiti da operatori mobili, identity wallet o relying party.

## Record ammissibili

Il servizio CLEAR puo' acquisire solo denunce che soddisfano tutte le
condizioni seguenti:

* lo smarrimento o il furto e' stato denunciato a un'autorita' di polizia
  competente
* la denuncia identifica una persona fisica o un altro soggetto
  giuridicamente riconosciuto
* la denuncia identifica un dispositivo personale che puo' agire in una
  procedura di autenticazione
* il timestamp della denuncia e' noto
* la denuncia include dati strutturati sufficienti a derivare una claim
  stabile del dispositivo per il matching senza conservare dettagli
  narrativi non necessari

Esempi di claim ammissibili del dispositivo includono un numero di
telefono, un identificativo SIM, un identificativo di wallet vincolato
al dispositivo o un altro vincolo di autenticazione approvato dalla
governance.

## Minimizzazione dei dati

Il servizio CLEAR non deve conservare denunce di polizia complete.
Conserva solo i campi minimi necessari a supportare l'interrogazione:

* un riferimento al soggetto derivato dall'identita' legale della persona
* un riferimento al dispositivo derivato dal dispositivo di
  autenticazione compromesso
* il tipo di evento: smarrito, rubato o recuperato
* l'orario della denuncia
* l'orario di scadenza
* l'identificativo dell'autorita' segnalante
* un riferimento di audit al record di origine

Descrizioni narrative, dettagli di localizzazione, dichiarazioni di
testimoni e altri dati di polizia estranei devono rimanere fuori dal
servizio.

Quando possibile, i riferimenti al soggetto e al dispositivo conservati
dovrebbero essere rappresentati come commitment derivati dagli
identificativi sorgente, invece che come identificativi direttamente
leggibili.

## Conservazione e transizioni di stato

Ogni record di smarrimento o furto deve scadere automaticamente dopo un
periodo di conservazione limitato definito dalla policy. Il periodo di
conservazione predefinito dovrebbe essere di 30 giorni, salvo diversa
durata approvata tramite governance e supportata da evidenze.

Il servizio deve supportare almeno queste transizioni di stato:

* `reported`: e' stato denunciato uno smarrimento o furto ed e' entro la
  conservazione
* `recovered`: il dispositivo e' stato recuperato o il controllo e'
  stato ripristinato
* `expired`: la finestra di conservazione e' terminata

Le interrogazioni devono trattare i record `recovered` e `expired` come
non compromessi, salvo che rimanga in vigore un'altra denuncia attiva
per lo stesso soggetto e dispositivo.

## Modello di interrogazione privacy-preserving

Il servizio CLEAR deve esporre un protocollo di interrogazione basato su
prove zero-knowledge sopra un insieme autenticato di record attivi, per
esempio una rappresentazione Merkle-tree dei commitment soggetto-
dispositivo attivi, con queste proprieta':

* il richiedente prova l'autorizzazione a chiedere di una coppia
  soggetto-dispositivo per un evento di autenticazione legittimo
* il servizio apprende solo il minimo necessario per rispondere
  all'interrogazione
* il richiedente apprende solo se esiste un segnale di compromissione
  attivo, piu' metadati di policy opzionali come una fascia di eta' del
  segnale
* il richiedente non puo' enumerare l'intera banca dati
* gli osservatori non possono collegare interrogazioni separate per
  ricostruire l'attivita' piu' ampia di un cittadino

Un disegno conforme e':

* le autorita' di polizia inviano al servizio attestazioni strutturate di
  evento
* il servizio converte l'identificativo del soggetto e l'identificativo
  del dispositivo in commitment
* i commitment attivi sono inseriti in un Merkle tree o in un insieme
  autenticato simile, aggiornato quando le denunce vengono aggiunte,
  recuperate o scadono
* un endpoint di autenticazione invia un'interrogazione
  privacy-preserving e riceve una prova zero-knowledge che la coppia
  interrogata e' o non e' presente nell'insieme attivo rappresentato
  dalla root corrente

Disegni alternativi possono essere usati se preservano le stesse
garanzie di privacy, auditabilita' e anti-enumerazione.

## Notarizzazione della root

Ogni aggiornamento dell'insieme attivo dovrebbe produrre una nuova
Merkle root e un checkpoint firmato associato. L'operatore CLEAR
dovrebbe notarizzare periodicamente questi checkpoint su un registro
distribuito, come SwissLedger, o su un altro registro di interesse
pubblico approvato dalla governance.

Il checkpoint notarizzato dovrebbe contenere solo materiale di
integrita' non personale:

* la root dell'insieme attivo
* il timestamp del checkpoint
* un numero di sequenza o identificativo di epoca
* la firma dell'operatore o l'identificativo della chiave
* metadati di policy opzionali, come la finestra di conservazione in
  vigore

Nessuna denuncia di polizia, identificativo del soggetto, identificativo
del dispositivo, preimage di commitment, record di interrogazione o
attivita' di relying party dovrebbe essere scritta sul registro.

Lo scopo della notarizzazione e' rendere verificabile esternamente la
storia delle modifiche dell'insieme attivo senza divulgarne il
contenuto. Auditor, relying party e autorita' di controllo possono poi
verificare che una prova sia stata controllata contro una root esistente
in un momento specifico, che le root non siano state riscritte
silenziosamente a posteriori e che lacune o fork inattesi nella sequenza
dei checkpoint siano visibili.

## Autorizzazione delle interrogazioni

Solo endpoint di autenticazione approvati possono interrogare il
servizio. L'autorizzazione deve richiedere:

* un'identita' registrata dell'operatore
* un caso d'uso dichiarato legato all'autenticazione o al recupero
  account
* richieste firmate
* limiti di frequenza per operatore
* logging idoneo a successiva supervisione

Il flusso di autorizzazione dovrebbe vincolare crittograficamente ogni
interrogazione a una specifica transazione di autenticazione, in modo
che le prove non possano essere riprodotte o riutilizzate come token
generali di lookup.

Il servizio CLEAR deve respingere lookup massivi, profilazione in
background, usi di marketing e screening generalizzato dell'identita'.

## Semantica della risposta

Il formato della risposta deve essere intenzionalmente minimale. Una
risposta conforme contiene:

* un risultato booleano: `active_signal` true o false
* un artefatto di prova verificabile dal richiedente rispetto alla root
  dell'insieme attivo
* una fascia opzionale di freschezza, come `0-24h`, `1-7d`, `8-30d`
* un orario di scadenza della risposta

La risposta non deve rivelare il testo della denuncia di polizia, il
luogo esatto di presentazione o attributi di identita' non necessari.

## Comportamento richiesto ai relying party

Questo servizio CLEAR fornisce un segnale di rischio, non un mandato di
diniego automatico. Gli operatori che integrano il servizio devono
definire azioni di policy per un risultato positivo, come:

* verifica step-up usando un fattore separato
* sospensione temporanea di azioni ad alto rischio
* revisione manuale per i flussi di recupero
* notifica al cittadino tramite un canale gia' fidato

Gli operatori non devono usare un risultato positivo come unica base per
la chiusura permanente dell'account o per il diniego di servizi non
correlati.

# Razionale

Il disegno sceglie un servizio ristretto di controllo della
compromissione invece di una piattaforma ampia di "beni rubati".

Questo e' preferibile perche':

* mira direttamente a un modello di frode ad alto valore che incide su
  identita' digitale e sicurezza degli account
* minimizza raccolta dati e ambito istituzionale
* e' piu' facile da governare, auditare e sperimentare
* crea infrastruttura civica riutilizzabile che qualsiasi endpoint di
  autenticazione puo' integrare

Le prove zero-knowledge sono giustificate qui perche' una semplice API
centrale creerebbe altrimenti un nuovo registro sensibile che collega
denunce di polizia, identificativi dei dispositivi e attivita' di
autenticazione. Commitment e prove basate su Merkle consentono al
servizio di rispondere alla domanda ristretta di controllo della
compromissione riducendo la divulgazione dei record sottostanti.

La notarizzazione delle Merkle root su un registro distribuito rafforza
l'integrita' di questo disegno senza espandere i dati condivisi dal
servizio. Il registro non diventa un registro di eventi di smarrimento.
Agisce come livello indipendente di timestamping e ordinamento per
checkpoint pubblici. Questo supporta la successiva verifica della storia
delle modifiche, rileva tentativi di riscrivere o omettere stati
dell'insieme attivo e riduce la dipendenza dall'operatore CLEAR come
unica fonte di verita' per l'audit.

Questo e' particolarmente rilevante per un servizio fiduciario civico.
Le decisioni di autenticazione possono essere contestate dopo una presa
di controllo dell'account, un recupero fallito o un errore
dell'operatore. Una storia notarizzata delle root offre agli auditor una
base stabile per verificare se lo stato del servizio usato al momento
fosse coerente con la sequenza di checkpoint pubblicata, preservando
comunque la privacy di cittadini e relying party.

Alternative considerate:

* Condivisione diretta dei dati tra polizia e piattaforme.
  E' tecnicamente piu' semplice, ma scala male, aumenta la complessita'
  legale e diffonde ampiamente dati sensibili.
* Feed di revoca solo degli operatori mobili.
  Utili dove disponibili, ma incompleti. Molti fattori di
  autenticazione non sono controllati dagli operatori mobili, e i servizi
  pubblici necessitano di un livello neutrale di coordinamento.
* Solo auto-segnalazione gestita dall'utente.
  Utile ma piu' debole. La prevenzione delle frodi beneficia di denunce
  attestate e timestamp indipendenti.
* Log di audit locali senza notarizzazione su registro.
  Necessari ma insufficienti da soli. Restano sotto il controllo
  dell'operatore del servizio e costituiscono evidenza piu' debole se
  l'integrita' storica viene poi contestata.

# Analisi degli Stakeholder e dell'Impatto

Stakeholder interessati:

* cittadini che denunciano smarrimento o furto di dispositivi
* autorita' di polizia o uffici di raccolta denunce
* operatori municipali e privati di servizi di autenticazione
* fornitori di identity wallet digitali
* autorita' per privacy, protezione dei dati e liberta' civili
* auditor e responder agli incidenti

Benefici attesi:

* rilevazione piu' precoce di fattori di autenticazione compromessi
* minore rischio di presa di controllo dell'account dopo il furto del
  dispositivo
* migliore coordinamento tra segnalazione pubblica e difesa digitale
* componente riutilizzabile di controllo del rischio per piu' servizi

Rischi principali:

* falsi positivi causati da mismatch di identificativi o aggiornamenti di
  recupero ritardati
* function creep verso sorveglianza o profilazione generalizzata
* eccessiva dipendenza dal segnale da parte di operatori con fallback
  progettati male
* complessita' crittografica e operativa

Mitigazioni:

* finestre di conservazione brevi ed eventi espliciti di recupero
* stretta limitazione dello scopo e governance pubblica
* semantica minimale della risposta
* revisione indipendente di sicurezza e valutazione d'impatto sulla
  privacy
* dispiegamento graduale a partire da un pilota

Impatto su budget e sostenibilita':

* costo iniziale moderato di implementazione e revisione
* costo operativo continuativo basso-moderato se il servizio resta
  minimale e centralizzato
* costo ecosistemico inferiore rispetto a integrazioni bilaterali tra
  molti uffici di polizia e molti fornitori di servizi

Il lock-in dei fornitori dovrebbe essere limitato richiedendo specifiche
aperte, prove portabili e dati di audit esportabili.

Anche l'uso del registro dovrebbe evitare lock-in. Il formato del
checkpoint dovrebbe essere portabile, cosi' che le root possano essere
verificate indipendentemente da una singola implementazione o da un
singolo fornitore del registro.

# Consultazione e Dissenso

Questa bozza dovrebbe essere esaminata con:

* operatori municipali di identita' digitale
* autorita' di polizia competenti per le denunce
* la funzione municipale di protezione dei dati
* organizzazioni della societa' civile focalizzate su privacy e giusto
  processo
* operatori di endpoint di autenticazione ad alto valore, come
  e-government, banking e servizi di wallet digitale

Obiezioni probabili includono:

* i dati di polizia non dovrebbero mai influenzare le decisioni di login
* i sistemi zero-knowledge sono troppo complessi per un servizio
  municipale
* la proposta potrebbe comunque rivelare indirettamente eventi di vita
  sensibili

Queste obiezioni sono sostanziali e dovrebbero essere verificate nella
progettazione del pilota. La proposta risponde mantenendo il servizio
ristretto, temporaneo, auditabile e consultivo invece che punitivo.

# Compatibilita' e Transizione

La proposta e' additiva. I sistemi di autenticazione esistenti possono
integrarla come controllo di rischio opzionale senza interrompere i
flussi di login attuali.

Un percorso di transizione raccomandato e':

* pilota con un endpoint di autenticazione municipale e un relying party
  esterno
* supporto iniziale solo per uno o due tipi di claim del dispositivo,
  come numero di telefono e identificativo di binding del wallet
* valutazione di tassi di falso positivo, latenza, usabilita' per gli
  operatori e idoneita' legale
* espansione solo dopo approvazione della governance e pubblicazione dei
  risultati

Il comportamento di fallback deve restare disponibile quando il servizio
e' offline o non ancora integrato.

# Piano di Implementazione

1. Definire base legale, perimetro di governance e casi d'uso ammessi.
2. Concordare lo schema strutturato minimo per attestazioni di evento di
   origine polizia.
3. Specificare il metodo di derivazione dei commitment, il sistema di
   prova e il formato della risposta.
4. Specificare il formato del checkpoint della Merkle root e la cadenza
   di notarizzazione sul registro.
5. Costruire un adattatore pilota di acquisizione per una autorita'
   segnalante.
6. Costruire il servizio dell'insieme attivo con scadenza automatica e
   gestione del recupero.
7. Integrare un endpoint di autenticazione come relying-party pilota.
8. Eseguire valutazioni di privacy, sicurezza e operativita'.
9. Pubblicare i risultati e decidere se standardizzare, rivedere o
   respingere.

I criteri di accettazione per il pilota dovrebbero includere:

* latenza di interrogazione limitata e adatta all'autenticazione live
* nessuna divulgazione del contenuto grezzo delle denunce di polizia ai
  relying party
* scadenza riuscita dei record dopo il periodo di conservazione
* autorizzazione e rate limiting auditabili
* checkpoint delle Merkle root pubblicati e verificabili
  indipendentemente rispetto al registro selezionato
* evidenza che il segnale migliori i controlli antifrode senza falsi
  positivi eccessivi

# Governance e Accountability

Il servizio dovrebbe essere governato come infrastruttura civica
condivisa, con un operatore chiaramente designato e una funzione di
supervisione che includa revisione privacy.

Le responsabilita' di governance dovrebbero includere:

* approvare i tipi di claim del dispositivo ammissibili
* approvare i periodi di conservazione
* approvare gli operatori autorizzati a interrogare
* approvare la cadenza dei checkpoint e il registro usato per la
  notarizzazione
* rivedere log di audit e segnalazioni di abuso
* attivare sospensione o rollback se vengono rilevati usi impropri o
  tassi di errore eccessivi

Qualsiasi espansione oltre l'uso relativo all'autenticazione deve
richiedere un nuovo LIP o un emendamento esplicito a questo.

# Licenza e Riuso

Questo documento e' reso disponibile sotto la GNU Free Documentation
License, affinche' altri comuni possano riusarlo per scopi non
commerciali con attribuzione e alle stesse condizioni di condivisione.
