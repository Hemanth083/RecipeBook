import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Spin, Card, Typography, Button } from 'antd';
import NavigationBar from '../Components/NavigationBar';
import './home.css';
import UseWindowResize from "./use-window-resize/index";
import down from '../expand_more_FILL0_wght400_GRAD0_opsz24.svg';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const HomePage = () => {
    const windowSize = UseWindowResize();
    const { width } = windowSize;
    const adjustedWidth = width - 16.5;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRecipe, setExpandedRecipe] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch recipes when component mounts
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiKey = "4e62eebeba7e4a7c9763943ee54105b8"; // Replace with your Spoonacular API key
            const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=16`);
            setRecipes(response.data.recipes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch recipes. Please try again later.'); // Update error message
            setLoading(false);
        }
    };

    const handleExpand = (recipe) => {
        setExpandedRecipe(recipe.id === expandedRecipe ? null : recipe.id);
    };

    return (
        <div className='Mainhome' style={{ width: adjustedWidth }}>
            <Flex align='center' justify='top' vertical style={{ width: "100%", Height: "800px" }}>
                <NavigationBar />
                <Flex vertical className='Home' style={{ height: "100vh", width: adjustedWidth }}>
                    <h1 >Get the Best Recipes here</h1>
                    <img width="50px" src={down}></img>
                </Flex>
                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <p>Error: {error}</p> // Changed error message
                ) : (
                    <Flex align='center' justify='center' wrap='wrap' gap='55px'>
                        {recipes.map(recipe => (
                            <Card key={recipe.id} style={{ width: '20%' }}>
                                <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                <div style={{ padding: '15px' }}>
                                    <Title level={4}>{recipe.title}</Title>
                                    <Text strong>Ingredients:</Text>
                                    {expandedRecipe === recipe.id ? (
                                        <ul>
                                            {recipe.extendedIngredients.map(ingredient => (
                                                <li key={ingredient.id}>{ingredient.original}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul>
                                            {recipe.extendedIngredients.slice(0, 3).map(ingredient => (
                                                <li key={ingredient.id}>{ingredient.original}</li>
                                            ))}
                                            {recipe.extendedIngredients.length > 3 && <li>...</li>}
                                        </ul>
                                    )}
                                    <Button onClick={() => handleExpand(recipe)}>
                                        {expandedRecipe === recipe.id ? 'Collapse' : 'Expand'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </Flex>
                )}
                <Link style={{ marginTop: "100px", marginBottom: "100px" }} to={'/recipes'}> <Button className="ant-dropdown-link headerFont" type='primary'>
                    Know More
                </Button></Link>
            </Flex>
        </div>
    );
};

export default HomePage;
