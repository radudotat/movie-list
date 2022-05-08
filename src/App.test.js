import React from 'react';
import App from './App';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
	fetchMock.restore();
	cleanup()
});

test('initial dummy test', () => {
	let { getByTestId, queryByTestId } = renderApp();
	expect(getByTestId('input')).toHaveValue(null);
});
