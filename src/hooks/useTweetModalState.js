import { useState, useEffect } from 'react';
import axios from 'axios';

const useTweetModalState = () => {
    const [modalState, updateModalState] = useState(false);

    return {
        modalState,
        updateModalState,
    };
};

export default useTweetModalState;