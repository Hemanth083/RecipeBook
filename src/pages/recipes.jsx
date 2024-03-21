import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, List, Card, Space, Typography, Row, Col, Select, Input, Flex, Modal } from 'antd';
import NavigationBar from '../Components/NavigationBar';
import axios from 'axios';
import './recipes.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

function RecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch recipes when component mounts
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiKey = "49cb99e25b254216b632d76a5dc98a02"; // Replace with your Spoonacular API key
            const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=15`);
            setRecipes(response.data.recipes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSearch = async (value) => {
        setLoading(true);
        try {
            const apiKey = "49cb99e25b254216b632d76a5dc98a02";
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${value}&number=20`);
            setRecipes(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleCategoryChange = async (value) => {
        setLoading(true);
        try {
            const apiKey = "49cb99e25b254216b632d76a5dc98a02";
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${value}&number=10`);
            setRecipes(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <Flex vertical align='center' justify='top' style={{ width: '100%' }}>
            <NavigationBar />
            <Row align='center' justify="center" style={{ marginTop: '8%', marginBottom: "4%", width: '50%' }}>
                <Col span={12}>
                    <Row justify="space-between">
                        <Col span={6}>
                            <Select defaultValue="all" style={{ width: 120 }} onChange={handleCategoryChange}>
                                <Option value="all">All</Option>
                                <Option value="breakfast">Breakfast</Option>
                                <Option value="lunch">Lunch</Option>
                                <Option value="dinner">Dinner</Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Search placeholder="Search recipes" style={{ width: 200 }} onSearch={handleSearch} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <List
                    style={{ width: '70%' }}
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={recipes}
                    renderItem={recipe => (
                        <List.Item>
                            <Space size={3}>
                                <Card style={{ width: '250px' }}
                                    hoverable
                                    cover={<img alt={recipe.title} src={recipe.image} style={{ Height: 'auto', width: "250px" }} />}
                                    onClick={() => handleRecipeClick(recipe)} // Show recipe details modal on click
                                >
                                    <Card.Meta
                                        title={<Title className='title' level={4}>{recipe.title}</Title>}
                                        description={<Text>{recipe.description}</Text>}
                                    />
                                </Card>
                            </Space>
                        </List.Item>
                    )}
                />
            )}
            {selectedRecipe && (
                <Modal
                    title={selectedRecipe.title}
                    visible={modalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width="50vw" // Set modal width
                >
                    <div>
                        <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{ width: '100%' }} />
                        <Title level={4}>Ingredients:</Title>

                        {selectedRecipe.extendedIngredients.map(ingredient => (
                            <p key={ingredient.id}>{ingredient.original}</p>
                        ))}

                        <Text>{selectedRecipe.instructions}</Text>
                    </div>
                </Modal>
            )}
        </Flex>
    );
}

export default RecipePage;
