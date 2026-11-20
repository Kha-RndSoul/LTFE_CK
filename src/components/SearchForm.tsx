import React, { useEffect, useId, useState } from 'react';
import './SearchForm.css';

type Props = { onSearch: (keyword: string) => void; initialKeyword?: string };

function SearchForm({ onSearch, initialKeyword = '' }: Props) {
    const [keyword, setKeyword] = useState(initialKeyword);
    const inputId = useId();
    useEffect(() => setKeyword(initialKeyword), [initialKeyword]);
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSearch(keyword.trim());
    }
    return (
        <form className="football-search-form" role="search" onSubmit={handleSubmit}>
            <label htmlFor={inputId}>Từ khóa tìm kiếm</label>
            <div className="football-search-form__row">
                <input id={inputId} name="q" type="search" placeholder="Tìm tin bóng đá..."
                       value={keyword} maxLength={120} onChange={(event) => setKeyword(event.target.value)} />
                <button type="submit">Tìm kiếm</button>
            </div>
        </form>
    );
}

export default SearchForm;
