import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Spin, Card, Typography, Button, Modal } from 'antd';
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
    const [containerWidth, setContainerWidth] = useState('50vw');

    useEffect(() => {
        fetchData(); 
    }, []);

    useEffect(() => {
        setContainerWidth(expandedRecipe ? '40vw' : '50vw');
    }, [expandedRecipe]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiKey = "e3eb9cfac06c41a280acf5280d90d0dc"; 
            const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=16`);
            setRecipes(response.data.recipes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch recipes. Please try again later.'); 
            setLoading(false);
        }
    };

    const handleExpand = (recipeId) => {
        setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
    };

    const handleCloseModal = () => {
        setExpandedRecipe(null);
    };

    return (
        <div className='Mainhome' style={{ width: adjustedWidth }}>
            <Flex align='center' justify='top' vertical style={{ width: "100%" }}>
                <NavigationBar />
                <Flex vertical className='Home' style={{ height: "730px", width: adjustedWidth }}>
                    <h1>GET THE BEST RECIPE HERE</h1>
                    <img loading="lazy" width="50px" src={down} alt="Down Arrow" />
                </Flex>
                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <p>Error: {error}</p> 
                ) : (
                    <Flex align='center' justify='center' wrap='wrap' gap='55px' style={{ marginTop: "100px" }}>
                        {recipes.map(recipe => (
                            <Card key={recipe.id} style={{ width: '20%' }}>
                                <img loading="lazy" src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                <div style={{ padding: '15px' }}>
                                    <div style={{ width: '100%', height: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Title level={4} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{recipe.title}</Title>
                                    </div>
                                    <Text strong>Ingredients:</Text>
                                    <ul>
                                        {recipe.extendedIngredients.slice(0, expandedRecipe === recipe.id ? recipe.extendedIngredients.length : 5).map(ingredient => (
                                            <li key={ingredient.id}>{ingredient.original}</li>
                                        ))}
                                        {expandedRecipe !== recipe.id && recipe.extendedIngredients.length > 5 && <li>...</li>}
                                    </ul>
                                    <Button style={{ marginTop: "30px" }} onClick={() => handleExpand(recipe.id)}>
                                        {expandedRecipe === recipe.id ? 'Collapse' : 'Expand'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </Flex>
                )}
                <Link style={{ marginTop: "100px", marginBottom: "100px" }} to={'/recipes'}>
                    <Button className="ant-dropdown-link headerFont" type='primary'>
                        Know More
                    </Button>
                </Link>
                <Modal
                    visible={expandedRecipe !== null}
                    onCancel={handleCloseModal}
                    footer={null}
                    width={containerWidth}
                    className='container'
                >
                    {expandedRecipe && (
                        <div>
                            <img loading="lazy" src={recipes.find(recipe => recipe.id === expandedRecipe)?.image} alt="Recipe Image" style={{ width: '98%' }} />
                            <Title level={4}>Ingredients:</Title>
                            <ul>
                                {recipes.find(recipe => recipe.id === expandedRecipe)?.extendedIngredients.map(ingredient => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal>
            </Flex>
        </div>
    );
};

export default HomePage;
