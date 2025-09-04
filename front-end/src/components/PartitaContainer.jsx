// PartitaContainer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Risultati.module.css';

// Abbreviazioni mesi (1..12)
const MESI = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];

// Parsing robusto di "gg/mm/aaaa" (o "g/m/aa"); fallback sicuri
function parseGiornoMese(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return { giorno: '', meseAbbr: '' };
  const m = dateStr.match(/^(\d{1,2})[\/\-.](\d{1,2})/);
  if (!m) return { giorno: dateStr, meseAbbr: '' };
  const giorno = m[1].padStart(2, '0');
  const meseIdx = Math.min(11, Math.max(0, parseInt(m[2], 10) - 1));
  return { giorno, meseAbbr: MESI[meseIdx] };
}

export default function PartitaContainer({
  partita,
  nomeSquadra = 'REAL MALEDUCATI',
  placeholderLogo = '/img/placeholder-team.png',
}) {
  // Guardie: struttura minima
  const squadre = Array.isArray(partita?.squadre) ? partita.squadre : [];
  if (squadre.length < 2) return null;

  // Dati base
  const { giorno, meseAbbr } = parseGiornoMese(partita.data);
  const ora = partita.ora || '';
  const isCasa = squadre[0]?.nome === nomeSquadra; // stessa logica del tuo file
  const risultatoPulito = (partita.risultato || '').replace(/\s+/g, '');
  const foundMatch = Boolean(risultatoPulito);

  const cursor = partita.link_dettaglio ? 'pointer' : 'default';
  const homeAwayIcon = isCasa ? '/img/flaticon/home.png' : '/img/flaticon/airplane.png';
  const homeAwayAlt = isCasa ? 'In casa' : 'In trasferta';

  const openLink = () => {
    if (partita.link_dettaglio) {
      window.open(partita.link_dettaglio, '_blank', 'noopener,noreferrer');
    }
  };

  const logoOnError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = placeholderLogo;
  };

  return (
    <div className={styles.container_center}>
      <div
        className={styles.container_pointer}
        onClick={openLink}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && partita.link_dettaglio) openLink();
        }}
        role={partita.link_dettaglio ? 'link' : undefined}
        tabIndex={partita.link_dettaglio ? 0 : -1}
        style={{ cursor }}
        aria-label={partita.link_dettaglio ? 'Apri dettagli partita' : undefined}
      >
        <div className={styles.container_positional}>
          <div className={styles.data_partita}>
            <div className={styles.div_toSpace}>
              <span className={styles.data_numero}>{giorno}</span>
              <span className={styles.data_mese}>{meseAbbr}</span>
            </div>
          </div>

          <div className={styles.orario_partita}>
            <div className={styles.div_toSpace}>
              <div className={styles.div_toRight}>
                <img
                  src={homeAwayIcon}
                  className={styles.luogo_partita}
                  alt={homeAwayAlt}
                  title={homeAwayAlt}
                />
                <span className={styles.orario}>{ora}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.result_card}>
          <div className={styles.div_toAlign}>
            <div className={styles.team_info}>
              <div className={styles.logoContainer}>
                <img
                  src={squadre[0]?.logo}
                  alt={squadre[0]?.nome}
                  className={styles.team_logo}
                  onError={logoOnError}
                />
              </div>
              <span className={styles.team_name}>{squadre[0]?.nome}</span>
            </div>

            <div className={styles.score}>
              <span className={styles.score_text}>{foundMatch ? risultatoPulito : '?-?'}</span>
            </div>

            <div className={`${styles.team_info} right`}>
              <div className={styles.logoContainer}>
                <img
                  src={squadre[1]?.logo}
                  alt={squadre[1]?.nome}
                  className={styles.team_logo}
                  onError={logoOnError}
                />
              </div>
              <span className={styles.team_name}>{squadre[1]?.nome}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PartitaContainer.propTypes = {
  partita: PropTypes.shape({
    data: PropTypes.string,
    ora: PropTypes.string,
    link_dettaglio: PropTypes.string,
    risultato: PropTypes.string,
    squadre: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.string,
        logo: PropTypes.string,
      })
    ),
  }).isRequired,
  nomeSquadra: PropTypes.string,
  placeholderLogo: PropTypes.string,
};
