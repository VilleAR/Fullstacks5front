import React from 'react'

const CreateBlog = ({ handleSubmit, handleBlogChange, handleAuthorChange, 
    handleUrlChange,newBlog, newAuthor, newUrl}) => {
    return (
        <div>
            <h2> New blog: </h2>         
            <form onSubmit={handleSubmit}>           
            <div>
                title:
                <input
                value={newBlog}
                onChange={handleBlogChange}
                />
            </div>
            <div>
                author:             
                <input 
                value={newAuthor}
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url: 
                <input
                value={newUrl}
                onChange={handleUrlChange}
                />
            </div>
            <button type ="submit">save</button>
            </form>
        </div>
    )
}


export default CreateBlog