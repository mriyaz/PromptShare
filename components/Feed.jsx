"use client"

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {

    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />)
            )}
        </div>
    )

}

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const searchPosts = (searchVal) => {
        searchVal = searchVal.toLowerCase();
        return searchVal ? (posts.filter((p) => p.prompt.toLowerCase().includes(searchVal) || p.tag.toLowerCase().includes(searchVal) || p.creator.username.toLowerCase().includes(searchVal))) : posts;
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        const filteredPosts = searchPosts(e.target.value);
        setFilteredPosts(filteredPosts);
    }

    const handleTagClick = (tag) => {
        setSearchText(tag);
        const filteredPosts = searchPosts(tag);
        setFilteredPosts(filteredPosts);
    }


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
            setFilteredPosts(data);
        }

        fetchPosts();
    }, [])

    //console.log('=============posts:::',posts);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={filteredPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed