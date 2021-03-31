import React from 'react';
import '../Styles/DefaultSearchResult.css';

import Category from '../Components/Category';
import { useGlobalContext } from '../context';

function DefaultSearchResult() {
    const { categories } = useGlobalContext();
    // console.log(categories);
    return (
        <>
            <div className="DefaultSearchTitle">
                <h2 className='title'>
                    Mood & Genres
                </h2>
            </div>
            <div className="DefaultSearchResult">
                {categories?.map((item) => {
                    const { id, name, icons } = item;
                    return (
                        <Category title={name} key={id} image={icons[0].url} />
                    );
                })}
            </div>
        </>
    );
}

export default DefaultSearchResult;
