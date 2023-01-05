import { css } from '@emotion/css';
import { Fragment, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import AutoResizeTextArea from './AutoResizeTextArea';
import ButtonBar from './ButtonBar';

import type { ChangeEventHandler } from 'react';

const ROOT_CSS = css({
  '&.app-chat': {
    bottom: 20,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "Calibri, 'Helvetica Neue', Arial, sans-serif",
    gap: 20,
    position: 'fixed',
    right: 20,

    '--accent': 'red'
  },

  '.app-chat__bubble': {
    alignSelf: 'end',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    maxWidth: 320
  },

  '.app-chat__bubble--bot': {
    backgroundColor: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: 'white',
    padding: 10
  },

  '.app-chat__bubble--self': {
    backgroundColor: 'white',
    borderColor: 'var(--accent)',
    fontSize: 'inherit',
    padding: 10,
    minWidth: 240,
    textAlign: 'center'
  },

  '.app-chat__icon': {
    alignSelf: 'end',
    appearance: 'none',
    backgroundColor: 'var(--accent)',
    border: 0,
    borderRadius: '50%',
    height: 64,
    width: 64
  },

  '.app_chat__icon-image': {
    height: 32
  },

  '.app-chat__quick-replies': {
    alignSelf: 'end',
    display: 'flex',
    gap: 10,
    marginTop: -10
  },

  '.app-chat__quick-reply': {
    appearance: 'none',
    background: 'white',
    borderColor: 'var(--accent)',
    borderRadius: 'calc(1em + 10px)',
    borderStyle: 'solid',
    borderWidth: 2,
    color: 'var(--accent)',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    padding: '5px 10px'
  }
});

// const HIGHLIGHT_PATTERN = /brown/gu;
// const HIGHLIGHT_PATTERN = 'brown';
// const INITIAL_INPUT_VALUE = 'A quick brown fox jumped over the lazy dogs.';

const HIGHLIGHT_PATTERN = 'Please build an address input dialog';
const INITIAL_INPUT_VALUE = 'Please build an address input dialog';
// const INITIAL_INPUT_VALUE = 'Please build an address input dialog for US addresses';

const AppChat = () => {
  const [inputText, setInputText] = useState(INITIAL_INPUT_VALUE);
  const [shown, setShown] = useState(true);
  const handleButtonClick = useCallback(() => setShown(shown => !shown), [setShown]);
  const handleInputChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => setInputText(value),
    [setInputText]
  );

  const [editClicked, setEditClicked] = useState(false);
  const handleEditClick = useCallback(() => setEditClicked(true), [setEditClicked]);

  useEffect(() => {
    if (editClicked) {
      const textAreaElement = document.querySelector('textarea')

      if (textAreaElement) {
        textAreaElement.focus();
        textAreaElement.selectionStart = inputText.length;
      }
    }
  }, [editClicked]);

  return (
    <div className={classNames('app-chat', ROOT_CSS)}>
      {shown && (
        <Fragment>
          <div className="app-chat__bubble app-chat__bubble--bot">What can I do?</div>
          <ButtonBar className="app-chat__quick-replies">
            <button className="app-chat__quick-reply" onClick={handleEditClick} type="button">
              Edit
            </button>
            <button className="app-chat__quick-reply" type="button">
              Looks good
            </button>
          </ButtonBar>
          {editClicked && (
            <AutoResizeTextArea
              className="app-chat__bubble app-chat__bubble--self"
              highlightPattern={HIGHLIGHT_PATTERN}
              onChange={handleInputChange}
              value={inputText}
            />
          )}
        </Fragment>
      )}
      <button className="app-chat__icon" onClick={handleButtonClick} type="button">
        <img alt="Bot" className="app_chat__icon-image" src="assets/bot.png" />
      </button>
    </div>
  );
};

export default AppChat;
