import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';

const Root = styled.div`display: flex;`;

const App = () => <Root>This is our root</Root>;

export default compose()(App);
