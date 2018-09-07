import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { action } from '@storybook/addon-actions';
import Button from 'ui/Button/Button';

storiesOf('Button', module)
  .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .add('default', () => <Button onClick={action('clicked')}>Default Button</Button>)
  .add('bordered', () => (
    <Button onClick={action('clicked')} bordered>
      Bordered Button
    </Button>
  ))
  .add('outlined', () => (
    <Button onClick={action('clicked')} outlined>
      Outlined Button
    </Button>
  ))
  .add('uppercase', () => (
    <Button onClick={action('clicked')} uppercase>
      Uppercase Button
    </Button>
  ))
  .add('disabled', () => (
    <Button onClick={action('clicked')} disabled>
      Disabled Button
    </Button>
  ));