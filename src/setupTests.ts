// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// React Router cần các API này; Jest/jsdom của CRA chưa cung cấp sẵn.
Object.assign(global, { TextDecoder, TextEncoder });
