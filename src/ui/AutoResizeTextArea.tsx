import { css } from '@emotion/css';

import type { ChangeEventHandler } from 'react';
import classNames from 'classnames';

const ROOT_CSS = css({
  '&.auto-resize-text-area': {},

  '.auto-resize-text-area__box': {
    position: 'relative'
  },

  '.auto-resize-text-area__doppelganger': {
    color: 'transparent',
    minHeight: '1em',
    whiteSpace: 'pre-line'
  },

  '.auto-resize-text-area__highlight-text': {
    backgroundColor: 'PaleGreen',
    borderRadius: 4
  },

  '.auto-resize-text-area__text-area': {
    appearance: 'none',
    background: 'transparent',
    border: 0,
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    height: '100%',
    left: 0,
    outline: 0,
    padding: 0,
    position: 'absolute',
    resize: 'none',
    textAlign: 'inherit',
    top: 0,
    width: '100%'
  },

  '.auto-resize-text-area__text-area::-webkit-scrollbar': {
    width: 0
  }
});

type Props = {
  className?: string;
  highlightPattern?: RegExp | string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
};

function findOccurrence(pattern: RegExp | string): (value: string) => RegExpExecArray | null {
  const patternInstance: RegExp | string = typeof pattern === 'string' ? pattern : new RegExp(pattern);
  let findStringLastIndex: number = 0;
  let count = 0;

  return value => {
    if (count++ > 10) {
      return null;
    }

    if (typeof patternInstance === 'string') {
      const index = value.indexOf(patternInstance, findStringLastIndex);

      findStringLastIndex = index + patternInstance.length;

      if (~index) {
        const match: any = [patternInstance];

        match.index = index;

        return match;
      }

      return null;
    }

    return patternInstance.exec(value);
  };
}

const AutoResizeTextArea = ({ className, highlightPattern, onChange, value = '' }: Props) => {
  let parts;

  if (highlightPattern) {
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const matcher = findOccurrence(highlightPattern);

    parts = [];

    while ((match = matcher(value))) {
      const { index } = match;
      const [matched] = match;

      parts.push(value.substring(lastIndex, index));
      parts.push(matched);

      lastIndex = index + matched.length;
    }

    parts.push(value.substring(lastIndex));
  } else {
    parts = [value];
  }

  return (
    <div className={classNames('auto-resize-text-area', ROOT_CSS, className)}>
      <div className="auto-resize-text-area__box">
        <div className="auto-resize-text-area__doppelganger">
          {parts.map(
            (part, index) =>
              !!part && (
                <span className={classNames({ 'auto-resize-text-area__highlight-text': index % 2 })}>{part}</span>
              )
          )}
          {'\n'}
        </div>
        <textarea className="auto-resize-text-area__text-area" onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default AutoResizeTextArea;
