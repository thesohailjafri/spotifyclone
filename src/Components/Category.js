import React from 'react';
import '../Styles/Category.css';
function Category({ id, image, title }) {
    // const bgcolors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff',];
    // const bgcolors = ['#6f1d1b', '#432818', '#99582a',];

    // let color = bgcolors[Math.floor(Math.random() * bgcolors.length)];
    return (
        <>
            <div className="category"
            // style={{ backgroundColor: color }}
            >
                <h2 className='title category__title'>
                    {title}
                </h2>
                <img className='category__banner' src={image} alt={title} />

            </div>
        </>);
}

export default Category;
