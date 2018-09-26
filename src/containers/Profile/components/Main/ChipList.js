import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { Transition } from 'react-spring';

import Box from 'ui/Box/Box';
import Chip from 'ui/Chip/Chip';
import Section from 'ui/Section/Section';
import Text from 'ui/Text/Text';
import { Circle, TextRow } from 'ui/Loading';

import EmptyStateButton from '../EmptyStateButton';

const ChipList = ({
  color,
  extraLoadingRow,
  firstName,
  list,
  loading,
  onEdit,
  readonly,
  title,
}) => {
  if (loading) {
    return (
      <Section>
        <Box>
          <TextRow style={{ width: 76, height: 13 }} />
        </Box>
        <Box>
          <TextRow style={{ width: 61, height: 1 }} />
        </Box>
        <Box grow margin={{ top: 1 }}>
          <Circle style={{ width: 95, height: 32, margin: { left: 15 } }} />
          <Box padding={{ left: 1 }}>
            <Circle style={{ width: 151, height: 32 }} />
          </Box>
        </Box>
        {extraLoadingRow && (
          <Box padding={{ top: 1 }}>
            <Circle style={{ width: 151, height: 32 }} />
          </Box>
        )}
      </Section>
    );
  }

  return (
    <Section title={title}>
      {list &&
        list.length > 0 && (
          <Box wrap>
            <Transition
              keys={list.map(item => item.value)}
              from={{ opacity: 0, transform: 'scale(0)' }}
              enter={{ opacity: 1, transform: 'scale(1)' }}
              leave={{ opacity: 0, transform: 'scale(0)' }}
            >
              {styles => {
                return list.map(item => (
                  <Chip key={item.value} text={item.label} color={color} styles={styles} readonly />
                ));
              }}
            </Transition>
          </Box>
        )}
      {list &&
        list.length < 1 &&
        !readonly && <EmptyStateButton onClick={onEdit} text="I could use a hand with..." />}
      {list &&
        list.length < 1 &&
        readonly && (
          <Text color="solitude" size={15 / 16} letterSpacing={0.2} lineHeight={20}>
            {firstName} hasn&#x27;t added any {title}
          </Text>
        )}
    </Section>
  );
};

export default ChipList;