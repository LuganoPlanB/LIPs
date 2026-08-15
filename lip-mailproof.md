# Attestazione e Verifica delle Comunicazioni Email

```
Author: Robert Bregy
Discussions-To: https://github.com/LuganoPlanB/lugano-lips/issues
Status: Draft
Type: Standards Track
Created: 2026-07-31
```

# Abstract

Questa proposta definisce un servizio per verificare l'autenticita'
delle email che provengono dalla Città di Lugano (`@lugano.ch`)
attivando un indirizzo di verifica a cui inoltrarle in modo semplice e
senza abbandonare il programma di posta (funzione `Forward`). Tale
servizio inviera' poi una email di risposta con il responso della
verifica.

Il servizio integra, ma non sostituisce, SPF, DKIM, DMARC,
Authentication-Results, ARC e i controlli di sicurezza del trasporto.
Esso attesta la corrispondenza con una comunicazione emessa dai sistemi
ufficiali; non certifica la verità sostanziale del contenuto né la
legittimità amministrativa di un atto.

Il servizio potrebbe in futuro estendersi ad altri domini
email. Inoltre la Citta' di Lugano potrebbe facilitare la verifica
dotandosi di un meccanismo di attestazione digitale di tutte le email
inviate (backend) ed il servizio mailproof potra recuperare take
attestazione dalla fonte autoritativa e confrontare gli elementi
ricevuti.

# Motivazione

I cittadini ricevono comunicazioni che possono mostrare la citta' di
Lugano come mittente (falsificando il campo `From:` visibile e tutti
gli elementi grafici) fingendo di inviare mail emesse dalla
città. Questa vulnerabilita' e' intrinseca al sistema di email, non e'
propria del metodo usato dalla nostra citta'. Vi sono tuttavia
controlli email ordinari per risolvere parti diverse del problema:

* SPF autorizza un server a usare un dominio nel percorso SMTP
* DKIM protegge i campi firmati e li associa a un dominio
* DMARC verifica l'allineamento del dominio visibile e applica una policy
* ARC conserva valutazioni di autenticazione attraverso alcuni intermediari
* TLS, MTA-STS, TLS-RPT e DANE proteggono o rendono verificabile il trasporto

I controlli piu' diffusi ed effettivi fra questi sono gia' adottati
dalla citta' di Lugano, ma non sono sempre verificati dai programmi di
ricezione. Inoltre nessuno di questi controlli dimostra da solo che
una specifica comunicazione, con determinati testo, link e allegati,
sia stata autorizzata ed emessa dalla Città. Infine un account
ufficiale compromesso può superare SPF, DKIM e DMARC, mentre un
inoltro ordinario può riscrivere header, corpo, HTML, MIME o allegati
e rendere non ripetibile la verifica originale.

Il cittadino necessita quindi di un canale semplice e indipendente
dalla comunicazione sospetta. L'esperienza proposta è "inoltra a
`verifica@lugano.ch`" e l'inoltro attiva la verifica.

# Specifica

I termini "deve", "non deve", "dovrebbe" e "può" indicano
rispettivamente un requisito obbligatorio, un divieto, una
raccomandazione e una facoltà implementativa.

## Ambito e garanzia fornita

Il servizio si applica alle email inviate da sistemi, domini, caselle e
fornitori SaaS inclusi in una policy di copertura pubblicata dalla
Città. La policy deve identificare almeno i domini coperti, le identità
di sistema autorizzate, le versioni dei profili tecnici e le finestre di
validità. Si partira' dal dominio `lugano.ch`.

Per una comunicazione coperta, il servizio deve permettere di
determinare se gli elementi ricevuti corrispondono all'attestazione
creata al momento dell'emissione. La verifica deve considerare almeno
mittente, destinatario, contenuto testuale, HTML, link, allegati e
finestra temporale, quando presenti nel messaggio originale.

Un esito positivo dimostra soltanto che la comunicazione corrisponde a
un'email ufficiale emessa dalla Città secondo la policy indicata. Non
dimostra:

* la verità delle affermazioni contenute nel messaggio
* la validità giuridica o amministrativa di un atto
* l'onestà della persona o del sistema che ha originato la comunicazione
* la sicurezza di dispositivi, caselle o azioni successive del destinatario

Documenti, SMS, notifiche e altri oggetti digitali non fanno parte di
questo LIP, solo i messaggi e-mail.

## Verifica lato destinatario

L'indirizzo di verifica deve essere pubblicizzato fuori banda sui canali
ufficiali della Città.

Quando riceve un messaggio inoltrato, il servizio deve:

1. isolare la parte inoltrata e individuare gli header rilevanti
2. gestire in modo deterministico risposte o conversazioni
3. valutare evidenze standard, corrispondenze, differenze e dati mancanti
4. applicare la policy di copertura, validità e revoca
5. inviare un referto privo di link necessari, con esito, motivazione e
   istruzioni di sicurezza

Il forward inline è un'interfaccia utente, non una prova forense. Quando
non conserva dati sufficienti, il referto puo' chiedere di inoltrare il
messaggio come allegato `message/rfc822` o di trasmettere il file `.eml`
tramite un canale ufficiale approvato.

### Il servizio non deve chiedere al cittadino di usare un link o un QR presente nella comunicazione sospetta come radice di fiducia.

## Stati del referto

Il servizio non deve ridurre evidenze eterogenee a un trust score unico.
Deve restituire almeno uno dei seguenti stati:

* `VERIFICATA`: Tutti le verifiche richieste passano con successo
* `NON VERIFICABILE`: I dati inoltrati sono insufficienti, trasformati o
  fuori dalla copertura nota; non è possibile concludere la verifica
* `INVALIDA`: L'e-mail non ha passato sufficienti verifiche (elencate) e non e' ritenuta valida, l'utente e' messo in guardia sulla falsificazione

Per messaggi con dati insufficienti prevale `NON VERIFICABILE`. Un
esito `VERIFICATA` deve essere emesso solo se tutti i controlli
obbligatori della policy hanno esito positivo.

Ogni referto deve indicare in linguaggio comprensibile che cosa è stato
verificato, quali dati mancavano e quali azioni prudenti intraprendere.

### Il referto non deve richiedere di fare clic su un link per comprenderne o confermarne l'esito.

## Baseline della posta elettronica

Mailproof non sostituisce la sicurezza email ordinaria. Prima del
pilota, i domini e i sistemi coperti devono avere:

* SPF, DKIM e DMARC configurati e monitorati
* TLS correttamente configurato
* MTA-STS con TLS-RPT oppure DANE, dove sostenibile
* ARC trattato solo come evidenza ausiliaria nei flussi indiretti

S/MIME o OpenPGP possono aggiungere protezione end-to-end, ma non sono
prerequisiti per l'esperienza di verifica via inoltro.

## Sicurezza, privacy e conservazione

Il servizio di verifica deve trattare gli inoltri come contenuto non
fidato. Deve applicare limiti di dimensione e frequenza, code,
isolamento, antivirus o sandbox per gli allegati e difese contro
scraping, denial of service, malware e archivi decomprimibili malevoli.

Poiché un inoltro può contenere dati personali o sensibili, la Città
deve definire prima del pilota una policy di minimizzazione,
cifratura, conservazione e cancellazione automatica. Gli accessi
devono essere tracciati e limitati per ruolo. Contenuti e indirizzi
riconducibili a persone non devono essere ne' pubblicati ne' salvati.

# Razionale

La progettazione combina standard e componenti maturi invece di
riscrivere la sicurezza dell'email. Parser MIME/EML, verificatori
SPF/DKIM/DMARC, ARC, CMS/S/MIME o JWS/COSE, code, database
transazionali e sandbox devono essere integrati tramite librerie
mantenute e sottoposti a test vector.

Sono state considerate le seguenti alternative:

* affidarsi solo a SPF, DKIM e DMARC non rileva necessariamente un account
  ufficiale compromesso e non autorizza contenuto, link o allegati
* usare S/MIME o OpenPGP end-to-end offre forti garanzie crittografiche, ma non
  assicura adozione universale né un'esperienza semplice per il cittadino
* usare un QR o un link nel messaggio come prova consente all'attaccante di
  sostituire anche il punto di verifica
* confrontare soltanto l'hash raw produce falsi negativi quando il forward
  introduce trasformazioni non sostanziali
* restituire un esito binario o un punteggio nasconde la differenza tra prova
  contraria e insufficienza di dati

# Analisi degli Stakeholder e dell'Impatto

I cittadini ottengono un canale uniforme per controllare comunicazioni
sospette senza installare software o comprendere i protocolli email. Il
principale rischio per loro è un referto errato o imitato; per questo il
servizio deve usare stati spiegabili, un indirizzo pubblicizzato fuori
banda e risposte protette da una configurazione DKIM/DMARC forte.

I collaboratori e gli uffici della Città non dovrebbero compiere azioni
aggiuntive per ogni invio. Potranno però essere soggetti a policy più
restrittive su identità di sistema, template, link e allegati.

Gli amministratori della posta e della sicurezza dovranno integrare il
Trust Publisher, gestire chiavi e revoche, mantenere la baseline email e
rispondere agli incidenti. Il carico operativo comprende monitoraggio,
aggiornamento dei profili di canonicalizzazione e gestione dei client
non compatibili.

Il responsabile della protezione dei dati e gli auditor dovranno
verificare minimizzazione, conservazione, cancellazione, accessi e
assenza di dati personali on-chain. I fornitori dovranno supportare
formati aperti, esportazione dei log, test vector pubblici e portabilità
delle prove per limitare il lock-in.

Il servizio richiede un investimento iniziale per integrazione,
sicurezza, test e valutazione d'impatto. I costi ricorrenti dipendono da
volume degli inoltri, conservazione, supporto e monitoraggio e devono
essere misurati nel pilota prima di una copertura estesa.

# Consultazione e Dissenso

La proposta deriva dal documento di ricerca e architettura "State of the
Art - Attestazione e verifica delle comunicazioni email", versione 1.0,
agosto 2026, redatto per il Trust Evaluation Framework della Città di
Lugano. Il documento ha esaminato RFC, indicazioni NIST, studi sul
forwarding, servizi di verifica successiva e famiglie brevettuali come
fonti di pattern tecnici.

La ricerca non costituisce una revisione accademica sistematica né un
parere legale. Brevetti e prodotti non sono assunti come prova di
correttezza o superiorità. Prima dell'accettazione devono essere
documentati nel canale di discussione almeno i pareri di gestione posta,
sicurezza, protezione dei dati, servizi al cittadino e un revisore
indipendente.

Non risultano ancora registrati esiti di consultazione pubblica per
questa bozza. Le principali questioni aperte sono la policy di
copertura, la durata di conservazione, il comportamento in caso di
indisponibilità del Trust Publisher e i client o flussi dichiarati
compatibili. Dissensi e decisioni devono essere aggiunti a questa
sezione durante la revisione.

# Compatibilità e Transizione

Il rollout deve essere additivo. Le email continuano a usare SMTP,
Internet Message Format e MIME e mantengono i normali controlli SPF,
DKIM e DMARC. Il Trust-ID aggiunto non deve rendere il messaggio
illeggibile per client che non conoscono TEF.

Durante il pilota, la policy di copertura deve identificare chiaramente
un insieme ristretto di unità, caselle e sistemi. Le comunicazioni
legacy e i sistemi fuori copertura devono ricevere `NON VERIFICABILE`,
non `NON EMESSA`. L'estensione a caselle condivise, SaaS e sistemi
legacy deve avvenire solo dopo test specifici.

In caso di indisponibilità dell'ancoraggio, invio e verifica devono
continuare usando la fonte autoritativa e registrare il lavoro in coda.
Prima del pilota deve essere approvata e collaudata una policy esplicita
fail-open o fail-closed per l'indisponibilità del Trust Publisher.

# Piano di Implementazione

L'implementazione deve procedere per fasi con questi output indicativi:

1. **Laboratorio forwarding, 2 settimane.** Creare un corpus `.eml`, una
   matrice delle trasformazioni dei client e i test vector, senza UI,
   blockchain o rollout.
2. **PoC locale, 3-4 settimane.** Realizzare Trust Publisher, original store,
   parser degli inoltri e referto per un solo canale di invio con chiavi locali
   protette.
3. **Pilota ristretto, 4-6 settimane.** Integrare Exchange o Microsoft 365,
   controlli privacy, monitoraggio e metriche per unità e casi selezionati.
4. **Audit SwissLedger, 2-3 settimane.** Pubblicare batch, Merkle root, prove e
   resolver senza contenuti on-chain.
5. **Copertura estesa, 6-10 settimane.** Includere SaaS, caselle condivise e
   sistemi legacy solo dopo test e policy dedicate.
6. **Apertura TEF.** Pubblicare specifica, SDK, test vector e implementazione
   di riferimento solo dopo avere raccolto evidenza operativa sufficiente.

La matrice minima deve includere Outlook/Microsoft 365, Gmail, Apple
Mail, Proton Mail, Thunderbird e altri servizi diffusi, su desktop, web
e mobile dove applicabile. Deve coprire forward inline, allegato
`message/rfc822` ed esportazione `.eml`.

Il passaggio dal PoC al pilota richiede almeno questi criteri go/no:

* riconoscimento del Trust-ID almeno nel 99,5% dei casi sui client testati
* verifica completa da forward inline almeno nel 90% dei flussi supportati
* fallback tramite allegato `.eml` almeno nel 99% dei casi
* zero falsi positivi `VERIFICATA` nei test avversariali
* tempo di risposta P95 inferiore a 30 secondi nel PoC
* cancellazione automatica dei dati verificata
* nessuna azione aggiuntiva e nessuna latenza percepibile per il mittente
* invio email indipendente dalla disponibilità di SwissLedger

I test avversariali devono includere almeno Trust-ID copiato, corpo
modificato, link o allegato sostituito, più Trust-ID in una
conversazione, DKIM rotto dal forward, attestazione scaduta o revocata,
indisponibilità dei componenti, malware, zip bomb e dati personali
sensibili.

# Governance e Accountability

La Città di Lugano è proprietaria dell'esito del servizio e deve
nominare un responsabile del servizio. Prima del pilota devono essere
assegnate e pubblicate almeno le responsabilità per:

* policy di copertura e autorizzazione dei sistemi di emissione
* esercizio del Trust Publisher, original store e servizio di verifica
* custodia, rotazione e revoca delle chiavi
* protezione dei dati, conservazione e risposta alle richieste degli interessati
* monitoraggio, incident response, audit e comunicazione al pubblico
* approvazione dei profili di canonicalizzazione e dei test vector

Le modifiche a stati, semantica dei referti, campi obbligatori
dell'attestazione o algoritmo di canonicalizzazione devono essere
versionate, sottoposte a revisione di sicurezza e compatibilità e
accompagnate da nuovi test vector.

Il responsabile del servizio deve pubblicare durante il pilota almeno
copertura, disponibilità, latenza P95, distribuzione degli stati, tasso
di fallback, falsi positivi e negativi confermati, incidenti,
cancellazioni e risultati degli audit, in forma aggregata e compatibile
con la privacy.

Un falso positivo `VERIFICATA`, una compromissione delle chiavi, una
perdita di dati o il mancato rispetto della cancellazione deve attivare
una revisione immediata. La governance deve poter sospendere nuove
attestazioni, revocare chiavi e attestazioni, limitare la copertura o
eseguire un rollback senza impedire l'accesso alle evidenze di audit.

# Licenza e Riuso

Il testo di questo LIP deve essere pubblicato con una licenza
documentale permissiva che consenta il riuso, l'adattamento e
l'implementazione da parte di altri comuni. Specifica tecnica, profili
di canonicalizzazione, test vector e implementazione di riferimento
dovrebbero essere pubblicati con licenze aperte compatibili con tale
obiettivo.

# Riferimenti

Il riferimento progettuale principale è il documento della Città di
Lugano "State of the Art - Attestazione e verifica delle comunicazioni
email", versione 1.0, agosto 2026. Le implementazioni devono inoltre
usare le versioni correnti e applicabili degli standard citati nel
documento, incluse le RFC per SMTP, Internet Message Format, MIME, SPF,
DKIM, DMARC, Authentication-Results, ARC, S/MIME, TLS, MTA-STS, TLS-RPT
e DANE.
