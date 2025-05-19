import React, {useState, useEffect} from "react";
import NavBar from "../NavBar/navBar";
import {InputGroup, FormControl, Button, Badge, Spinner} from "react-bootstrap";
import "./ChatSection.css";
import OpenAI from "openai";
import SuccessExchangeModal from "../SucessExchangeModal/SuccessExchangeModal";

const openai = new OpenAI({
    baseURL: "https://api.proxyapi.ru/openai/v1",
    apiKey: "sk-HVaqACY0tjmFyvinaRoUh5BBvLnq6QXb",
    dangerouslyAllowBrowser: true
});

function ChatSection() {
    const [chats, setChats] = useState([
        {
            id: 1,
            name: "Сиркула Помощник",
            lastMessage: "Привет! Чем помочь?",
            time: "12:30",
            unread: 0,
            avatar: "http://localhost:3000/circula.png",
            online: true,
            personality: "Ты Сиркула-помощник сайта по обмену ненужными вещами. Сайт - благотворительный проект. На нем ты можешь загружать обьявления о готовности отдать вещь, забирать чужие вещи путем заключения сделки, переписываться в чате, но пока не может получать достижения,а также оценивать и быть оцененым пользователями через систему рейтинга. Сделка происходит так: пользователь находит понравившиеся ему обьявление, отсылает запрос на сделку в чат владельцу по копке в обьявлении, уточняет условия сделки в чате с владельцем и они заключают сделку."
        },
        {
            id: 2,
            name: "Мария Сидорова",
            lastMessage: "Здравствуйте, вы отдаете кукольный домик? Хотела взять для дочки, очень любит куклы.",
            time: "10:45",
            unread: 0,
            avatar: "https://i.pravatar.cc/150?img=2",
            online: true,
            personality: "Ты Мария Сидорова, хочешь получить кукольный домик для дочки.Ты отвечаешь очень естественно и человечно. "
        },
        {
            id: 3,
            name: "Алексей Иванов",
            lastMessage: "Привет, ты писала, о покупке шубы?",
            time: "Только что",
            unread: 0,
            avatar: "https://i.pravatar.cc/150?img=3",
            online: true,
            personality: "Ты Алексей Иванов, продавец шубы, расскажи что отдаешь норковую шубу жены. Ты отвечаешь очень естественно и человечно."
        }
        
    ]);

    const [activeChat, setActiveChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState({});
    const [isSending, setIsSending] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const initialMessages = {};
        chats.forEach(chat => {
            initialMessages[chat.id] = [
                {
                    id: 1,
                    text: chat.lastMessage,
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                    isUser: false,
                    sender: chat.name
                }
            ];
        });
        setMessages(initialMessages);
    }, []);

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExchange = () => {
        setTimeout(() => {
            setShowModal(true);
        }, 1000);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const getAIResponse = async (message, personality) => {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {role: "system", content: personality},
                    {role: "user", content: message}
                ],
                temperature: 0.7,
                max_tokens: 150
            });

            return completion.choices[0]?.message?.content || "Не получилось сгенерировать ответ";
        } catch (error) {
            console.error("Ошибка OpenAI API:", error);
            return "Извините, произошла ошибка";
        }
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !activeChat) return;

        const currentChat = chats.find(chat => chat.id === activeChat);
        if (!currentChat) return;

        const newUserMessage = {
            id: Date.now(),
            text: messageInput,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            isUser: true,
            sender: "Вы"
        };

        setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newUserMessage]
        }));
        setMessageInput("");
        setIsSending(true);

        const aiResponse = await getAIResponse(messageInput, currentChat.personality);

        const newAiMessage = {
            id: Date.now() + 1,
            text: aiResponse,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            isUser: false,
            sender: currentChat.name
        };

        setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newAiMessage]
        }));

        setChats(prev =>
            prev.map(chat =>
                chat.id === activeChat
                    ? {...chat, lastMessage: aiResponse, time: "Только что"}
                    : chat
            )
        );
        setIsSending(false);
    };

    return (
        <div className="chat-app">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <NavBar/>
            <SuccessExchangeModal show={showModal} onClose={closeModal}/>

            <div className="chat-container">
                <div className="chat-sidebar">
                    <div className="search-bar">
                        <InputGroup>
                            <FormControl
                                placeholder="Введите поисковый запрос"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-secondary">Поиск</Button>
                        </InputGroup>
                    </div>

                    <div className="chat-list">
                        {filteredChats.map(chat => (
                            <div
                                key={chat.id}
                                className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                                onClick={() => setActiveChat(chat.id)}
                            >
                                <div className="chat-avatar">
                                    <img src={chat.avatar} alt={chat.name}/>
                                    {chat.online && <span className="online-badge"></span>}
                                </div>
                                <div className="chat-info">
                                    <div className="chat-header">
                                        <span className="chat-name">{chat.name}</span>
                                        <span className="chat-time">{chat.time}</span>
                                    </div>
                                    <div className="chat-preview">
                                        <p>{chat.lastMessage}</p>
                                    </div>
                                </div>
                                {chat.name === "Мария Сидорова" ?
                                    <Button
                                        variant="success"
                                        onClick={handleExchange}
                                        className="action-button-swap-access exchange-button me-3"
                                    >
                                        <img className="profile-pic" src="http://localhost:3000/check.png"/>
                                    </Button> : <></>
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chat-main">
                    {activeChat ? (
                        <div className="chat-dialog">
                            <div className="chat-header">
                                <h5>{chats.find(c => c.id === activeChat)?.name}</h5>
                            </div>

                            <div className="chat-messages">
                                {messages[activeChat]?.map((message) => (
                                    <div key={message.id} className={`message ${message.isUser ? 'sent' : 'received'}`}>
                                        {!message.isUser && <div className="message-sender">{message.sender}</div>}
                                        <div className="message-content">{message.text}</div>
                                        <div className="message-time">{message.time}</div>
                                    </div>
                                ))}
                                {isSending && (
                                    <div className="message received">
                                        <div className="message-content">
                                            <Spinner animation="border" size="sm"/> Печатает...
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="chat-input">
                                <FormControl
                                    as="textarea"
                                    rows={2}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                                    placeholder="Напишите сообщение..."
                                />
                                <Button
                                    variant="primary"
                                    onClick={handleSendMessage}
                                    disabled={isSending || !messageInput.trim()}
                                >
                                    {isSending ? <Spinner animation="border" size="sm"/> : 'Отправить'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-placeholder">
                            <h4>Выберите собеседника</h4>
                            <p>Все сообщения обрабатываются ChatGPT</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatSection;