// InstagramIcon.jsx
import React from "react";

/**
 * InstagramIcon(props)
 * props:
 *   size (number|string) default 24
 *   color, hoverColor (string) optional
 *   href (string) optional - se fornito renderizza <a>, altrimenti <button> (o span)
 */
export default function InstagramIcon({
  size = 24,
  color = "#E1306C",
  hoverColor = "#405DE6",
  href,
  className = "",
  ariaLabel = "Instagram"
}) {
  const style = {
    '--ig-color': color,
    '--ig-hover-color': hoverColor,
    '--ig-size': typeof size === 'number' ? `${size}px` : size
  };

  const inner = (
    <svg className="ig-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style={{width: '100%', height: '100%'}}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" ry="5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3.2" fill="currentColor"/>
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor"/>
    </svg>
  );

  // wrapper comune (link o span/button)
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`ig-link ${className}`}
        style={style}
      >
        {inner}
        <style>{`
          .ig-link{
            display:inline-block;
            width:var(--ig-size);
            height:var(--ig-size);
            color:var(--ig-color);
            transition: color 220ms ease-in-out, transform 160ms ease;
            text-decoration:none;
            line-height:0;
          }
          .ig-link:hover,
          .ig-link:focus{
            color:var(--ig-hover-color);
            outline: none;
          }
          .ig-link:focus-visible{
            box-shadow: 0 0 0 3px rgba(64,93,230,0.18);
            border-radius: 6px;
          }
          @media (max-width: 1150px) {
            .ig-link {
              width: calc(var(--ig-size) * 0.9);
              height: calc(var(--ig-size) * 0.9);
            }
          }
          @media (max-width: 875px) {
            .ig-link {
              width: calc(var(--ig-size) * 0.8);
              height: calc(var(--ig-size) * 0.8);
            }
          }
          @media (max-width: 540px) {
            .ig-link {
              width: calc(var(--ig-size) * 0.7);
              height: calc(var(--ig-size) * 0.7);
            }
          }
        `}</style>
      </a>
    );
  }

  // se non fornisci href restituisce un button (puoi personalizzare)
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`ig-link ${className}`}
      style={style}
      onClick={() => {}}
    >
      {inner}
      <style>{`
        .ig-link{
          display:inline-block;
          width:var(--ig-size);
          height:var(--ig-size);
          color:var(--ig-color);
          transition: color 220ms ease-in-out, transform 160ms ease;
          text-decoration:none;
          line-height:0;
          border:0;
          background:transparent;
          padding:0;
          margin:0;
        }
        .ig-link:hover,
        .ig-link:focus{
          color:var(--ig-hover-color);
          outline: none;
        }
        .ig-link:focus-visible{
          box-shadow: 0 0 0 3px rgba(64,93,230,0.18);
          border-radius: 6px;
        }
      `}</style>
    </button>
  );
}
