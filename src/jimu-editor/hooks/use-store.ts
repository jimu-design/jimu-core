import React from 'react';
import { storesContext } from '../store';

export const useStore = () => React.useContext(storesContext);
