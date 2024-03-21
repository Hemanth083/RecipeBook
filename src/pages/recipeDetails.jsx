import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, Card, Typography, Space, List } from 'antd';
import NavigationBar from '../Components/NavigationBar';

const { Title, Text } = Typography;

function RecipeDetails() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const { id } = window.location.pathname.split('/').pop(); // Extract recipe ID from URL
            setLoading(true);
            try {
                const apiKey = "4e62eebeba7e4a7c9763943ee54105b8";
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchRecipeDetails(); // Fetch recipe details when component mounts
    }, []);

    return (
        <div>
            <NavigationBar />
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Card title={<Title level={2}>{recipe.title}</Title>} style={{ margin: '30px auto', width: '70%' }}>
                    <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', height: 'auto' }} />
                    <Text style={{ display: 'block', marginTop: '20px' }}>{recipe.summary}</Text>
                    <Title level={3} style={{ marginTop: '30px' }}>Ingredients:</Title>
                    <List
                        bordered
                        dataSource={recipe.extendedIngredients}
                        renderItem={ingredient => (
                            <List.Item>
                                <Space>
                                    <Text>{ingredient.original}</Text>
                                </Space>
                            </List.Item>
                        )}
                        style={{ marginBottom: '30px' }}
                    />
                    <Title level={3}>Instructions:</Title>
                    <List
                        bordered
                        dataSource={recipe.analyzedInstructions.length > 0 ? recipe.analyzedInstructions[0].steps : []}
                        renderItem={(step, index) => (
                            <List.Item>
                                <Space>
                                    <Text strong>{index + 1}.</Text>
                                    <Text>{step.step}</Text>
                                </Space>
                            </List.Item>
                        )}
                    />
                </Card>
            )}
        </div>
    );
}

export default RecipeDetails;
