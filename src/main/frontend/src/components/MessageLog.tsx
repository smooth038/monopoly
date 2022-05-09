import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

export interface MessageLogProps {
  value: string;
}

export const MessageLog: React.FC<MessageLogProps> = (
  props: MessageLogProps
) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textarea.current) {
      textarea.current.scrollTop = textarea.current.scrollHeight;
    }
  }, [props.value]);

  return <StyledMessageLog value={props.value} ref={textarea} readOnly />;
};

const StyledMessageLog = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin: 12px 0px;
  padding: 0;
  border: 0px;
`;
