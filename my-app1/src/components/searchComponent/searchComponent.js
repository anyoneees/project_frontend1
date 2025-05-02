import React, { useState } from 'react';
import { InputGroup, Input, Button, InputGroupText } from 'reactstrap';

const SearchComponent = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-field">
            <InputGroup>
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите поисковый запрос..."
                />
                <Button color="success" onClick={handleSearch}>
                    Поиск
                </Button>
            </InputGroup>
        </div>
    );
};

export default SearchComponent;