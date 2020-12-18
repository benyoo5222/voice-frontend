import { useState, useEffect } from 'react';
import axios from 'axios';

const useMediaFile = () => {
    const [selectedFiles, updateSelectedFiles] = useState([]);

    return {
        selectedFiles,
        updateSelectedFiles,
    };
};

export default useMediaFile;