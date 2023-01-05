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

    '--accent': '#1BA1E2'
  },

  '.app-chat__bubble': {
    alignSelf: 'end',
    borderColor: 'var(--accent)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    maxWidth: 320
  },

  '.app-chat__bubble--bot': {
    backgroundColor: 'var(--accent)',
    color: 'white',
    padding: 10
  },

  '.app-chat__bubble--self': {
    backgroundColor: 'white'
  },

  '.app-chat__reply': {
    alignItems: 'center',
    display: 'flex'
  },

  '.app-chat__reply-title': {
    color: '#999',
    fontSize: '80%',
    margin: '10px 10px 0'
  },

  '.app-chat__send-button': {
    appearance: 'none',
    backgroundColor: 'var(--accent)',
    borderColor: 'var(--accent)',
    borderStyle: 'solid',
    borderRadius: '100%',
    borderWidth: 2,
    flexShrink: 0,
    height: 40,
    marginRight: 10,
    opacity: 0.2,
    padding: 0,
    width: 40
  },

  '.app-chat__input': {
    borderColor: 'var(--accent)',
    color: 'var(--accent)',
    fontSize: 'inherit',
    padding: 10,
    minWidth: 240
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
  },

  '.app-chat__quick-reply:hover': {
    background: '#eee'
  }
});

// const HIGHLIGHT_PATTERN = /brown/gu;
// const HIGHLIGHT_PATTERN = 'brown';
// const INITIAL_INPUT_VALUE = 'A quick brown fox jumped over the lazy dogs.';

const HIGHLIGHT_PATTERN = 'Please build an address input dialog';
const INITIAL_INPUT_VALUE = 'Please build an address input dialog in US address format';
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
  // const [editClicked, setEditClicked] = useState(true);
  const handleEditClick = useCallback(() => setEditClicked(true), [setEditClicked]);

  useEffect(() => {
    if (editClicked) {
      const textAreaElement = document.querySelector('textarea');

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
          <div className="app-chat__bubble app-chat__bubble--bot">I have generated the address input dialog.</div>
          {!editClicked && (
            <ButtonBar className="app-chat__quick-replies">
              <button className="app-chat__quick-reply" onClick={handleEditClick} type="button">
                Change my mind
              </button>
              <button className="app-chat__quick-reply" type="button">
                It looks good
              </button>
            </ButtonBar>
          )}
          {editClicked && (
            <div className="app-chat__bubble app-chat__bubble--self">
              <div className="app-chat__reply-title">How do you want it to change?</div>
              <div className="app-chat__reply">
                <AutoResizeTextArea
                  className="app-chat__input"
                  highlightPattern={HIGHLIGHT_PATTERN}
                  onChange={handleInputChange}
                  value={inputText}
                />
                {/* <button className="app-chat__send-button" type="button" /> */}
              </div>
            </div>
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
