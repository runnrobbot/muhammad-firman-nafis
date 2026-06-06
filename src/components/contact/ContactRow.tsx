import { useState, useRef } from 'react';
import { Copy, Check, AlertCircle, MessageCircle, Send } from 'lucide-react';
import type { ContactMethod } from '../../types';
import styles from './Contact.module.scss';
import anime from 'animejs';

interface ContactRowProps {
  method: ContactMethod;
}

/** Render either a Lucide component or an <img> from an SVG asset URL */
function ContactIcon({ icon }: { icon: ContactMethod['icon']; label: string }) {
  if (typeof icon === 'string') {
    return (
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        style={{ display: 'block', filter: 'var(--icon-filter, none)' }}
      />
    );
  }
  const Icon = icon;
  return <Icon aria-hidden="true" />;
}

/** Get a direct action button for specific contact types */
function DirectActionBtn({ method }: { method: ContactMethod }) {
  if (method.id === 'whatsapp') {
    return (
      <a
        href={method.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionBtn} ${styles.actionBtnWa}`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle aria-hidden="true" />
        Chat
      </a>
    );
  }
  if (method.id === 'email') {
    return (
      <a
        href={method.href}
        className={`${styles.actionBtn} ${styles.actionBtnEmail}`}
        aria-label="Send email"
      >
        <Send aria-hidden="true" />
        Email
      </a>
    );
  }
  return null;
}

export function ContactRow({ method }: ContactRowProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const iconWrapRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLLIElement>(null);

  const handleCopy = async () => {
    if (copied || error) return;
    try {
      await navigator.clipboard.writeText(method.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleMouseEnter = () => {
    if (!iconWrapRef.current) return;
    anime({ targets: iconWrapRef.current, translateX: 4, duration: 200, easing: 'easeOutExpo' });
  };

  const handleMouseLeave = () => {
    if (!iconWrapRef.current) return;
    anime({ targets: iconWrapRef.current, translateX: 0, duration: 300, easing: 'easeOutElastic(1, 0.5)' });
  };

  return (
    <li
      ref={rowRef}
      className={styles.row}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={method.href}
        className={styles.rowLink}
        target={method.id === 'email' ? undefined : '_blank'}
        rel={method.id === 'email' ? undefined : 'noopener noreferrer'}
        aria-label={`${method.label}: ${method.value}${method.id !== 'email' ? ' (opens in new tab)' : ''}`}
      >
        <span ref={iconWrapRef} className={styles.iconWrap} aria-hidden="true">
          <ContactIcon icon={method.icon} label={method.label} />
        </span>
        <span className={styles.rowInfo}>
          <span className={styles.rowLabel}>{method.label}</span>
          <span className={styles.rowValue}>{method.value}</span>
        </span>
      </a>

      <div className={styles.rowBtns}>
        {/* Direct action for WhatsApp / Email */}
        <DirectActionBtn method={method} />

        {/* Copy button */}
        <button
          type="button"
          className={`${styles.copyBtn}${copied ? ` ${styles.copyBtnSuccess}` : ''}${error ? ` ${styles.copyBtnError}` : ''}`}
          onClick={handleCopy}
          aria-label={`Copy ${method.label} to clipboard`}
          aria-live="polite"
        >
          {copied ? <Check aria-hidden="true" /> : error ? <AlertCircle aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span className={styles.copyStatus}>
            {copied ? 'Copied!' : error ? 'Failed' : 'Copy'}
          </span>
        </button>
      </div>
    </li>
  );
}
