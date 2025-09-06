import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Rosa.module.css";
import InstagramIcon from "./InstagramIcon";

const players = {
  portieri: [
    {
      name: "Emanuele Giglioli",
      number: 1,
      img: "img/img_rosa/emanuele_giglioli.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/giglioliemanuele?igsh=NnRxYjdoY3NkY242",
      description: "Dopo una vita dedicata a impartire lezioni agli avversari sul parquet, da quest'anno Giglio ha deciso cambiare terreno di gioco e sfruttare la magia delle sue mani per difendere i pali della FC Futuri Fuori Corso. Passare con tranquillità dal basket al calcio non è da tutti, ma d'altra parte strafare a lui è sempre piaciuto tantissimo: nei tanti tornei estivi che ha disputato, a parlare sono state le parate ai limiti del sovrannaturale e i trofei alzati. Ora la domanda che tutti si pongono è: riuscirà a ripetersi anche in una porta di calcio a 7? Lui non ha dubbi. Rimane in vacanza (lui dice “a studiare”) tutta estate, sparisce, non si presenta a un calcetto e non risponde a un messaggio fino al 10 settembre…ma ha anche dei difetti."
    }
  ],
  difensori: [
    {
      name: "Giuseppe Malangone",
      number: 21,
      img: "img/img_rosa/giuseppe_malangone.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/giuse.malangone_?igsh=Zmo4cjZ0anV5aGFn",
      description: "Se della squadra dovessimo indicare un'anima, un fondatore, un padre, questi avrebbe un nome e un cognome: Giuseppe Malangone. Dopo una lunga gavetta nelle giovanili dell'FC 70 e due anni di esperienza agli Avellino Banfi, tra un sold out di concerti di sax e l'altro è tra i primi a pensare e realizzare il progetto, costruendo quello che ogni ragazzo di questo gruppo sognava: la NOSTRA squadra. Classe '02, Beppe porta in dote voglia, forza, premi oscar, sgaloppate, grinta, intelligenza tattica, cuore e qualità. Innamorato perso del 21 più bello e forte della Serie A, come lui ogni tanto decide di fermarsi per problemi muscolari…ma sappiamo che è solo solidarietà. Qualcuno lo definisce a ragion veduta “il Gigante d'attacco”, ma quest'anno è pronto a prendere per mano la difesa. Come un veterano, come chi ormai sono anni che calca con successo i campi di calcio a 7 e detta legge per tutta la provincia. Gli avversari sono avvisati: o la gamba o la palla."
    },
    {
      name: "Giuseppe Di Blasi",
      number: 4,
      img: "img/img_rosa/giuseppe_di_blasi.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/giuseppedb125?igsh=bWE3Nzd5dnp5aGZx",
      description: "“Il multiverso è un concetto di cui sappiamo spaventosamente poco”. Non crediamo ci sia miglior modo per descrivere un avvenimento dalla portata a dir poco storica, uno spartiacque tra quello che c'era prima e quello che verrà poi, un punto di svolta in questo meraviglioso sport che ancora una volta regala emozioni indescrivibili: signore e signori, Dibla scenderà in campo con noi. Esterno difensivo alla prima esperienza nel calcio a 7, si è messo subito a disposizione di mister e compagni per costruire la squadra e farla rendere al meglio. Folle ma visionario, suo è l'ardire di superare il confine oltreoceano per garantire alla squadra la presenza di Pepe sulla divisa. La prima giocata da bomber vero. Scarpe e parastinchi nuovi, primo per distacco a presentare la visita medica di idoneità agonistica: anche solo questo basterebbe a descrivere sua la straripante voglia di iniziare. La differenza l'ha già fatta."
    },
    {
      name: "Gabriel Aleotti",
      number: 14,
      img: "img/img_rosa/gabriel_aleotti.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/g_aleotti_?igsh=MWViOHlkeGVyNGsybA==",
      description: "Oggetto di mistero della campagna acquisti della squadra, durante una calda e anonima sera d'estate passata al pub è entrato all'improvviso a far parte della rosa e…fin dal primo calcetto ha dimostrato di avere le carte in regola e volersi giocare fino alla fine le sue chance: presentarsi in tenuta romanista, con una stupenda maglia di Dybala, è stata una mossa decisamente vincente, notata e molto apprezzata dal mister. Centrale fisico, dotato di un buon senso della posizione, è pronto a scendere nuovamente in campo e mettere tutto se stesso per difendere la porta di Giglioli. In squadra si mormora già di una sfida tra lui e Di Michele sul numero di tibie portate a casa, ma noi a certe maldicenze non crediamo. Quel che conta è che Gabriel non vede l'ora di cominciare, ma il primo intervento da recupera-palloni l'ha già fatto: ha salvato un Fantacalcio."
    },
    {
      name: "Andrea Montepietra",
      number: 3,
      img: "img/img_rosa/andrea_montepietra.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/andreamontepietra?igsh=MTI3Y3cwZG0xcTNtMg==",
      description: "Il precampionato parla chiaro: Monte è tornato. Spensieratezza, tanta corsa, quantità, testa che sembra finalmente libera e quel fatato piede sinistro capace di sfornare cross che qualche pazzo visionario un tempo definì “telecomandati”. Chef (quasi stellato) di professione, come il compagno di reparto Malangone ha giocato per molto tempo nelle giovanili dell'FC 70, prima di dividersi tra il calcio a 11 nel Santos e il calcio a 7 negli Avellino Banfi. Da quest'anno, ha deciso di aderire totalmente (turni a lavoro permettendo) alla causa della squadra e i primi segnali sembrano essere incoraggianti. Manca ancora l'assaggio del suo famoso risotto alle fragole, ma il campionato è solo all'inizio. Rimane l'incognita più importante: durerà fino a fine anno o una ragazza lo porterà via? Ai posteri l'ardua sentenza."
    },
  ],
  centrocampisti: [
    {
      name: "Giuseppe Esposito",
      number: 5,
      img: "img/img_rosa/giuseppe_esposito.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/giuseppee.esposito?igsh=bmhjOGdnZWF5enU2",
      description: "Una presenza da “certi amori non finiscono: fanno dei giri immensi e poi ritornano”. Passati anni dalla sua ultima apparizione in territorio santilariese con la maglia dell'FC 70, Geppo torna finalmente a giocare a pochi metri dal confine del paese che lo ha portato a entrare nel cuore dei suoi (ormai ex) compagni di squadra. Capello nostalgico che ricorda un Fellaini d'altri tempi e capacità di giro palla direttamente proporzionale alla massa del bicipite, la motivazione giusta per convincerlo a presentarsi in questa competizione ufficiale è arrivata proprio grazie ai Futuri Fuori Corso, il gruppo in grado di riaccendere la fiamma dell'amatore puro, quella che albergava latente dentro di lui e che ancora non si era spenta. Porta con sé, nel suo bagaglio a mano, l'esperienza di chi riesce con invidiabile nonchalance a presentarsi in after a lavoro dopo un weekend no-stop di fuoco a Riccione, ma non fatevi trarre in inganno: quando decide di giocare a calcio, non ce n'è per nessuno."
    },
    {
      name: "Carlo Santo",
      number: 7,
      img: "img/img_rosa/carlo_santo.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/carlo.santo_?igsh=dHRrY2I3NXE3d2Iy",
      description: "Un anno e un'estate interi passati ad allenarsi. Tutto per farsi trovare pronto per il suo appuntamento col destino: “SU I MOTORI”, il ritorno di Re Charles in una competizione ufficiale è finalmente realtà. Il nostro (fiero) partenopeo, ex Sant'Ilario, è infatti pronto per tornare in campo con lo sguardo degno dei più classici “vediamo se mi ricordo ancora come si fa”. E vi rispondiamo già noi: la classe è intatta, il tocco e la visione di gioco ancora purissimi. Certo, bisognerà fare i conti con alcune difficoltà collaterali, come la stanchezza dovuta alla sveglia all'alba della domenica per non perdersi neanche mezzo secondo di Formula 1 o la sua dolce metà che cercherà di persuaderlo a non venire al pub post-partita perché starà già dormendo sugli spalti da un'ora, ma niente che mister e dirigenza non possano abilmente fronteggiare. Rimane il mistero del documento: lui continua a dichiarare un luogo di nascita, il mister è pronto a giurare con un bianchetto in mano che invece sia uno diverso… "
    },
    {
      name: "Andrea Mancin",
      number: 11,
      img: "img/img_rosa/andrea_mancin.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/andre_mancin?igsh=bnNveXRmd2wwcHoz",
      description: "Esterno mancino (nomen omen) dotato di un poderoso tiro dalla distanza, con un glorioso passato nelle giovanili dell'FC 70, Mancio ha deciso di cambiare disciplina e darsi al parkour: dopo l'annunciato ritiro dal calcio giocato a maggio 2025, è ufficialmente passato al doppio impegno al Tannetum Stadium per sostenere sia i colori dei Real Maleducati che quelli dei Futuri Fuori Corso. Una scelta dettata dal cuore, dalla passione, dalla voglia di dominare la fascia sinistra, tutte caratteristiche che lo contraddistinguono in modo netto. Almeno fino a più o meno i primi di novembre, quando arriveranno i primi freddi. Ecco, a quel punto tutte le buone intenzioni si sgretoleranno come i migliori propositi per l'anno nuovo fatti il 31 dicembre dopo il quinto Uragano alla festa di Capodanno, per lasciar spazio alla sua più letale e leggendaria arma segreta, compagna fedele di mille panchine: la copertina. Questa lo accompagnerà instancabilmente per tutto l'inverno, abbandonandolo solo verso aprile, quando tornerà a disposizione dei mister per portare a termine la stagione. “Ma con ‘sto freddo, chi me l'ha fatto fare…”."
    },
    {
      name: "Lorenzo Di Michele",
      number: 18,
      img: "img/img_rosa/lorenzo_di_michele.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/__ldm.__?igsh=MjhpbmFyZGlkZzZ5",
      description: "È laziale. E la descrizione potrebbe finire qui. L'unica caratteristica in grado di mettere in tremenda difficoltà il mister, che già solo per questo lo relegherebbe in panchina a riflettere sui suoi peccati. E invece Lollo ha già dimostrato di poter essere molto prezioso e in grado di ben interpretare il suo ruolo su entrambe le fasce, con molta voglia di fare e una concentrazione che solo un ex nuotatore di successo come lui può avere. Certo, l'outfit agli allenamenti è decisamente da rivedere, così come quella irrefrenabile voglia di portare a casa qualche souvenir ogni volta che affronta una trasferta. Tuttavia, diventa davvero impossibile non apprezzare la sincerità, la trasparenza e la bontà di questo ragazzo, che alla fine dei conti, quando si passa dalle parole ai fatti, è sempre il primo a tendere la mano ai compagni per aiutarli a rialzarsi da terra. Anche lui non vede l'ora di scendere in campo per difendere i colori degli FFC: fossimo un avversario, non ci terremmo particolarmente a ritrovarcelo di fronte."
    },
    {
      name: "Andrea Donelli",
      number: 22,
      img: "img/img_rosa/andrea_donelli.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/andredonelli?igsh=aTdmbjRkOWloMG8w",
      description: "Classe d'oro '96, vince a mani basse il titolo “guida d'esperienza” della squadra. Stimato psicologo reduce da un infortunio al ginocchio che lo ha tenuto a lungo lontano dalle attività, il Done quest'anno ha capito che il reparto geriatrico può attendere e ha deciso di ricominciare a giocare firmando per la sua prima esperienza nel mondo del calcio, dopo anni dedicati a regalare emozioni sui campi da basket. L'entusiasmo, il sacrificio e l'energia che mette dentro e fuori dal terreno di gioco sono elementi determinanti ed essenziali per lui e per tutti i suoi compagni di squadra. Si dice pronto a dare battaglia contro ogni avversario sulla fascia destra e quanto visto nel precampionato non lo smentisce. Voci di corridoio sostengono che la sua mossa segreta sia ipnotizzare i giocatori rivali chiedendo loro “cos'è che desideri veramente?”; noi ci limitiamo a dire che nessuno ha mai visto lui e Ziyech insieme nella stessa stanza."
    },
    {
      name: "Federico Boschi",
      number: 23,
      img: "img/img_rosa/federico_boschi.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/fede.boschi23?igsh=YmZzejVldGJqcWdj",
      description: "“Lo chiamavano QUALITÀ”. Non ci sarebbe altro da aggiungere, perché Fede nel precampionato ha sfornato delle prestazioni per le quali chiunque avvicinandosi al campo per 30 secondi avrebbe invocato il test antidoping…ma non noi. Sì, perché noi invece siamo perfettamente consapevoli di cosa sia capace il nostro numero 23. Sappiamo esattamente quanto respiri calcio dalla mattina alla sera e dalla sera alla mattina. E che, con lui in campo, i difensori avversari se la vedono davvero brutta. Con un passato da direttore d'orchestra alla Povigliese prima e al San Sisto poi, da quest'anno si propone come metronomo di centrocampo della Futuri Fuori Corso ed è pronto a guidare la regia di un film che già dal trailer si preannuncia a dir poco emozionante. Certo, tutto questo ammesso che non giochi la Juve. O che non debba allenare i bambini del Lentigione. O che non abbia un torneo di Tennis da affrontare. Insomma, in realtà non ci sarà mai, però ci piace l'idea di avere in squadra il Pirlo della Bronze League e ci teniamo a flexarlo con orgoglio."
    },
    {
      name: "Ludovico Contino",
      number: 27,
      img: "img/img_rosa/ludovico_contino.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/_ludoconte_?igsh=MXM5YmZlMDgxbzlkNQ==",
      description: "Talento puro e cristallino del calcio a 5, il gioiello spezzino per la stagione 2025/2026 ha deciso di legare indissolubilmente il suo nome alla nostra amata società di Taneto: dopo l'ultimo anno al San Marco, raddoppierà le sue energie combattendo per i colori sociali sia nel calcio a 5 con il Brexellum che in quello a 7 con i Futuri Fuori Corso. Mancino di piede, tocco raffinato e un sorriso di cortesia sempre pronto all'uso, Ludo aggiunge qualità a 360° sotto ogni punto di vista alla squadra, un innesto perfetto che permette di guardare con ottimismo all'inizio del campionato. Tuttavia, non ha ancora timbrato il cartellino delle presenze più importanti, quelle al pub: sotto questo aspetto dovrà rimediare con gli interessi. Anche perché da Brescello, nel vicino confine lombardo, dicono che con le gambe sotto al tavolo e una pinta in mano riesca a sfoderare le prestazioni migliori…e il mister non vede l'ora di osservarlo coi suoi occhi."
    },
    {
      name: "Tommaso Panciroli",
      number: 77,
      img: "img/img_rosa/tommaso_panciroli.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/tommaso.panciroli?igsh=MWd1aW9qOXByNGtmYw==",
      description: "Da Gavassa con furore, il talento della fascia sinistra che non ti aspetti. Sì, perché il nostro Tommi, nonostante il gravoso impegno con il Coviolo FC - le sue gesta, come i suoi gol al volo all'ultimo minuto, si narrano fin nei sobborghi di Villa Minozzo -, ha deciso con grande entusiasmo di buttarsi anche nel mondo del calcio a 7 e di farlo proprio con i Futuri Fuori Corso, in un habitat perfetto per lui. Esplosivo, dinamico, tecnico, sempre pronto a incoraggiare i compagni: è l'uomo giusto, nel posto giusto, al momento giusto. La sua più grande dote è senza ombra di dubbio la pazienza: se vi sembra di intravedere Mr. Rain in campo un'ora prima della partita mentre tutti gli altri sono ancora negli spogliatoi a cambiarsi, tranquilli, non sta per iniziare un concerto, è solo Tommi che non riesce a stare fermo più di 30 secondi nello stesso posto. Soprattutto, dopo questa descrizione, sappiamo che toglierà il saluto a qualcuno di noi. In realtà la storia di come le intricate trame del destino hanno deciso di far incrociare la sua strada con quella di questa squadra inizia parecchi anni fa, addirittura a Valencia. Ed è bellissimo così: “How I Met Your Tommi”. Se volete divertirvi, venite al Tannetum a vederlo, perché ne vale veramente la pena."
    },
  ],
  attaccanti: [
    {
      name: "Alex Righi",
      number: 9,
      img: "img/img_rosa/alex_righi.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/righialex?igsh=MXZqZnJkMnRseDRoNQ==",
      description: "Orgoglioso povigliese d'origine, è stato tra i primi ad aver creduto in questo grande sogno. Calciatore, tennista, sciatore, corridore, educatore, lavoratore, viaggiatore, esperto cuoco di carbonara: la cosa più difficile di tutte è trovarlo in casa sul divano. Approda agli FFC con un palmarès che gli permetterebbe di fare un tris a Tiki Taka Toe accanto a giocatori del calibro di Borriello, Candreva e Vieri. No, non per i gol segnati. E nemmeno per le conquiste extracalcistiche. Audax Poviglio, Gattatico, Viadana, FC 70, Povigliese, San Sisto, Virtus Campegine, Real Maleducati… quante altre magliette ha intenzione di collezionare nell'armadio? La realtà è che Alex è il giocatore che ogni allenatore desidera e il compagno di squadra che chiunque vorrebbe, anche se lui non la pensa così. Sempre pronto ad aiutare e sostenere tutti, in campo si sacrifica esattamente come nella vita: corsa, tagli, movimenti, passaggi, giro palla e tanta qualità pronta a venir fuori. Anche se non ha ancora ben chiaro in che posizione il mister abbia intenzione di schierarlo, è pronto a essere il leone (il riferimento alla chioma è voluto) della fascia destra e raggiungere gli obiettivi stagionali. Sappiate che c'è un giro di scommesse sul numero di gol che metterà a segno entro fine stagione. L'unica vera domanda è: quanto reggeranno le sue caviglie? E soprattutto: quanto manca alla Festa della birra?"
    },
    {
      name: "Martino Castellari",
      number: 10,
      img: "img/img_rosa/martino_castellari.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/marti0198?igsh=cmQzMWNlMGhwNjZz",
      description: `Dinamismo, passaggi, corsa, finalizzazione e…pali. Tanti pali. Almeno uno a partita, questo è praticamente certo. Una statistica matematica beffarda e impietosa, soprattutto per lui poi che la materia l'ha sempre amata molto. Il capitano dei Real Maleducati approda ufficialmente (in realtà è proprio uno dei Fondatori, anche se per questioni di statura non il Gigante) tra le fila degli FFC, pronto provare a scalare la classifica cannonieri del CSI sia in Bronze che in Silver League. Il problem solver più competente della provincia reggiana è un compagno di squadra puro, sincero, schietto, pronto a spendersi in tutto e per tutto ovunque ci sia bisogno: che sia in campo per giocare, sui social per memare o in dirigenza per gestire questioni organizzative, se chiami Marti puoi star certo di trovarlo pronto e disponibile. Tra una gara di insulti fantasiosi con Lollo (è in netto vantaggio, ndr) e una un po' meno piacevole di sfighe con Beppe (qui se la giocano), la sua stagione promette faville. 
       
      A Taneto, tutti i lunedì, quando c'è la partita, Marti muore. Cioè, prima di entrare in campo era già morto, perché si vede che non stava molto bene il giorno prima e allora…comunque, sempre a Taneto, no? Tutti i lunedì, quando c'è la partita, Lollo entra in campo e comincia a correre, per evitare di fare la fine di Marti che è morto il giorno prima. Poi, correndo, vede che c'è Marti morto dal giorno prima lì e visto che…dice: “cosa corro a fare? Mi fermo e gli faccio due tunnel…”. Comunque, dove voglio arrivare: non è importante che tu sei…Dibla o Giglio, l'importante è che, se me la passi, me lo dici prima…`
    },
    {
      name: "Luca Ceroni",
      number: 19,
      img: "img/img_rosa/luca_ceroni.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/lucaceroni_?igsh=MThmdnRkNTBpcDhhdA==",
      description: "Di Luca è veramente difficile dire qualcosa…soprattutto fuori posto. Chiamato dal buon Tommi per infoltire il reparto offensivo, il nostro Lucca (sì: ormai per il mister sei ribattezzato così, rassegnati) ha da subito risposto sempre “presente”, con un sorriso sulla faccia e l'impegno di chi non ha voglia di mollare mai fino all'ultimo secondo di partita. Punta fisica dotata di un ottimo tocco di palla e senso della posizione, pare perfettamente a suo agio in mezzo a questo gruppo di co…mpagni strepitosi. Se è vero che “similes cum similibus”…Luca, ci devi dire qualcosa? Il mister non è ancora riuscito a scoprire granché su di lui, se non una passione condivisa con Tommi per il collezionismo di scarpe da calcio. Questo basterà a relegarli in panchina entrambi, almeno per le prime partite."
    },
  ],
  staff: [
    {
      name: "Gioele Malvica",
      number: "A",
      img: "img/img_rosa/gioele_malvica.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/gioelemalvica?igsh=aWkzMTJhNmg1aXVx",
      description: "Il tecnico chiamato a guidare la squadra. “La teoria è quando si sa tutto e niente funziona. La pratica è quando tutto funziona e non si sa il perché. Lui mette insieme la teoria e la pratica: non c'è niente che funzioni... e non capisce il perché” (~ semicit). Il più grande errore della dirigenza degli FFC."
    },
    {
      name: "Thomas G. Aracri",
      number: "PA",
      img: "img/img_rosa/thomas_grande_aracri.jpg",
      nation: "Italia",
      insta: "https://www.instagram.com/thomasgrandearacri._?igsh=MTFnY3J2MXl5eTVtbA==",
      description: "Doveva essere una devastante arma segreta da utilizzare sulla fascia sinistra per sfondare le difese avversarie. Tra un recentissimo passato da protagonista nella prima categoria reggiana e un prossimo futuro in terza, Thom era pronto a prendere parte alla sua prima esperienza nel calcio a 7 per sganciare i suoi missili terra-aria anche in Bronze League. Uno sfortunato infortunio estivo lo ha costretto a rivedere i suoi piani. Qualcuno sostiene che il karma lo abbia punito per le troppe aquile comparse nelle sue pubblicazioni su Instagram, ma questa è un'altra storia. Mettendo a disposizione la sua esperienza da allenatore delle giovanili a Poviglio e i suoi studi in Scienze Motorie, ha accettato di aiutare mister Malvica a gestire la squadra per questa stagione. Voci di corridoio dicono che i gradoni di Zeman siano una passeggiata di salute in confronto a quello che ha in serbo per i ragazzi. AIUTO."
    },
  ],
};

const function_hover = (event, setHovered) => {
  if (event.type === "mouseenter") {
    setHovered(true);  // attiva l'effetto hover
  } else if (event.type === "mouseleave") {
    setHovered(false); // disattiva l'effetto hover
  }
};

const OverlayCard = ({ player, onClose }) => {
  const descRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // funzione robusta per verificare l'overflow
  const checkOverflow = () => {
    const el = descRef.current;
    if (!el) return;
    // usa una tolleranza di 1px per problemi di rounding
    const hasOverflow = el.scrollHeight > el.clientHeight + 1;
    setIsOverflowing(hasOverflow);
  };

  // misura dopo il layout e registra osservatori per cambiamenti
  useLayoutEffect(() => {
    if (!player) {
      setIsOverflowing(false);
      return;
    }

    // prima misura subito dopo il layout (requestAnimationFrame aiuta ad essere sicuri)
    let raf = requestAnimationFrame(() => {
      checkOverflow();
      // controlla di nuovo dopo che i font sono pronti (se supportato)
      if (document?.fonts?.ready) {
        document.fonts.ready.then(() => checkOverflow()).catch(() => {});
      }
    });

    // ResizeObserver per cambiare dinamicamente se il contenuto/box cambia
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        checkOverflow();
      });
      if (descRef.current) ro.observe(descRef.current);
    } else {
      // fallback semplice
      window.addEventListener("resize", checkOverflow);
    }

    // MutationObserver per cambi di testo/nodi (es. description diversa)
    let mo;
    if (typeof MutationObserver !== "undefined" && descRef.current) {
      mo = new MutationObserver(() => {
        checkOverflow();
      });
      mo.observe(descRef.current, { childList: true, subtree: true, characterData: true });
    }

    const el = descRef.current;

    return () => {
      cancelAnimationFrame(raf);
      if (ro && el) ro.unobserve(el);
      if (!("ResizeObserver" in window)) window.removeEventListener("resize", checkOverflow);
      if (mo) mo.disconnect();
    };
  }, [player]);

  useEffect(() => {
    if (player) {
      // blocca lo scroll del body quando overlay aperto
      document.body.style.overflow = "hidden";
    }
    return () => {
      // ripristina scroll
      document.body.style.overflow = "";
    };
  }, [player]);

  if (!player) return null;

  return (
    <div className={styles.overlayCard}>
      <div className={styles.overlayContent}>
        <div className={styles.overlayContainerImg}>
          <img
            src={player.img}
            alt={player.name}
            className={styles.overlayImg}
          />
        </div>
        <div className={styles.columnDiv}>
          <div className={styles.upperRight}>
            <div className={styles.overlayContainerHeader}>
              <h2 className={styles.overlayName}>
                {player.name === "Thomas G. Aracri"
                  ? "THOMAS GRANDE ARACRI"
                  : player.name.toUpperCase()}
              </h2>

              <p className={styles.overlayRuolo}>
                {player &&
                  (players.portieri.some((p) => p.name === player.name)
                    ? "PORTIERE"
                    : players.difensori.some((p) => p.name === player.name)
                    ? player.name === "Giuseppe Malangone" ? "DIFENSORE (CAPITANO)" : "DIFENSORE"
                    : players.centrocampisti.some((p) => p.name === player.name)
                    ? "CENTROCAMPISTA"
                    : players.attaccanti.some((p) => p.name === player.name)
                    ? player.name === "Alex Righi" ? "ATTACCANTE (VICE CAPITANO)" : "ATTACCANTE"
                    : players.staff.some((p) => p.name === player.name)
                    ? player.number === "A"
                      ? "ALLENATORE"
                      : "PREPARATORE ATLETICO"
                    : "")}
              </p>
            </div>
            <div className={styles.overlayContainerSymbol}>
              <div className={styles.numberPlayer}>
                <p className={styles.numero}>
                  {player.number !== "A" && player.number !== "PA"
                    ? player.number
                    : ""}
                </p>
              </div>
              <img
                className={styles.overlayNation}
                src={`img/nations_icon/${player.nation.toLowerCase()}.png`}
                alt={player.nation}
                title={player.nation}
              />
            </div>
          </div>
          <div className={styles.containerInsta}>
            <InstagramIcon
              href={player.insta}
              size={24}
              color={"#6c757d"}
              hoverColor={"rgb(241 189 7)"}
            />
          </div>
          <div
            ref={descRef}
            className={`${styles.containerDescription} ${
              isOverflowing ? styles.containerDescriptionOverflow : ""
            }`}
          >
            <p className={styles.description} style={{ whiteSpace: "pre-line" }}>{player.description}</p>
          </div>
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

const PlayerCard = ({ player, onPlayerClick  }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = player.img === "" ? "img/unknown.png" : player.img;

  return (
    <div className={`card ${styles.playerCard}`} onMouseEnter={(e) => function_hover(e, setIsHovered)} onMouseLeave={(e) => function_hover(e, setIsHovered)} onClick={() => onPlayerClick(player)}>
      <img src={imgSrc} className={`card-img ${styles.cardImg} ${isHovered ? styles.hover_img : styles.no_hover_img}`} alt={player.name}/>
      <div className={`card-img-overlay d-flex ${styles.text_img}`}>
        <h5 className={styles.playerName}>{player.name.toUpperCase()}</h5>
        <span className={`${styles.playerNumber} ${isHovered ? styles.hover_number : styles.no_hover_number}`}> {player.number} </span>
      </div>
    </div>
  );
};

const Section = ({ title, players, onPlayerClick }) => (
  <div className={styles.section}>
    <h3 className="text-white">{title}</h3>
    <div className="d-flex flex-wrap gap-3">
      {players.map((p, idx) => (
        <PlayerCard key={idx} player={p} onPlayerClick={onPlayerClick} />
      ))}
    </div>
  </div>
);

const Rosa = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div className={`toBlur`}>
      <div className={styles.appContainer}>
        <h1 className={`${styles.title_rosa} text-white mb-4`}>I NOSTRI FUTURI FUORI CORSO</h1>
        <div className={styles.overlay}>
          
          <div className={`${styles.container}`}>
            
            <Section title="PORTIERI" players={players.portieri} onPlayerClick={setSelectedPlayer} />
            <Section title="DIFENSORI" players={players.difensori} onPlayerClick={setSelectedPlayer} />
            <Section title="CENTROCAMPISTI" players={players.centrocampisti} onPlayerClick={setSelectedPlayer} />
            <Section title="ATTACCANTI" players={players.attaccanti} onPlayerClick={setSelectedPlayer} />
            <Section title="STAFF" players={players.staff} onPlayerClick={setSelectedPlayer} />
          </div>
        </div>
      </div>
      
      <OverlayCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
    </div>
  );
};

export default Rosa;
